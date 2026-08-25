// Fires N simultaneous reservation requests at the exact same table + date + time.
// Expected result if the anti-double-booking constraint works: exactly 1 succeeds (201),
// the rest are rejected with 409 — even though all requests hit the server at once.
const BASE = "http://localhost:3000";

async function main() {
  const avail = await fetch(
    `${BASE}/api/availability?locationId=los-olivos&date=2026-08-01&time=18:00`
  ).then((r) => r.json());

  const target = avail.tables.find((t) => !t.reserved);
  if (!target) throw new Error("No hay mesa libre para probar.");

  console.log(`Atacando mesa ${target.zone} #${target.number} (${target.id}) con 15 requests simultáneos...`);

  const N = 15;
  const attempts = Array.from({ length: N }, (_, i) =>
    fetch(`${BASE}/api/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableId: target.id,
        date: "2026-08-01",
        time: "18:00",
        partySize: 2,
        customerName: `Cliente ${i + 1}`,
        customerPhone: "999999999",
      }),
    }).then((r) => r.json().then((body) => ({ status: r.status, body })))
  );

  const results = await Promise.all(attempts);
  const ok = results.filter((r) => r.status === 201);
  const conflict = results.filter((r) => r.status === 409);
  const other = results.filter((r) => r.status !== 201 && r.status !== 409);

  console.log(`\n201 Created:  ${ok.length}`);
  console.log(`409 Conflict: ${conflict.length}`);
  console.log(`Otro:         ${other.length}`);

  if (ok.length === 1 && conflict.length === N - 1) {
    console.log("\n✔ Anti-doble-booking funcionando: solo 1 de 15 requests simultáneos se quedó con la mesa.");
  } else {
    console.log("\n✘ Algo falló: se esperaba exactamente 1 reserva exitosa.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
