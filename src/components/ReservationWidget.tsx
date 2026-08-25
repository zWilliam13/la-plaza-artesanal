"use client";

import { useEffect, useMemo, useState } from "react";

type TableRow = {
  id: string;
  zone: string;
  number: number;
  capacity: number;
  reserved: boolean;
};

type Location = { id: string; name: string };

const LOCATIONS: Location[] = [
  { id: "los-olivos", name: "Los Olivos" },
  { id: "miraflores", name: "Miraflores" },
];

const SLOTS = ["13:00", "15:30", "18:00", "20:30"];

function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function ReservationWidget() {
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(SLOTS[2]);
  const [tables, setTables] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TableRow | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [party, setParty] = useState(2);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "error"; message: string }
    | { kind: "success"; id: string }
  >({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);

  async function loadAvailability() {
    setLoading(true);
    const res = await fetch(
      `/api/availability?locationId=${locationId}&date=${date}&time=${time}`
    );
    const data = await res.json();
    setTables(data.tables ?? []);
    setLoading(false);
  }

  useEffect(() => {
    setSelected(null);
    setStatus({ kind: "idle" });
    loadAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId, date, time]);

  const zones = useMemo(() => {
    const byZone = new Map<string, TableRow[]>();
    for (const t of tables) {
      if (!byZone.has(t.zone)) byZone.set(t.zone, []);
      byZone.get(t.zone)!.push(t);
    }
    return Array.from(byZone.entries());
  }, [tables]);

  async function confirmReservation() {
    if (!selected) return;
    if (!name.trim() || !phone.trim()) {
      setStatus({ kind: "error", message: "Falta nombre o celular." });
      return;
    }
    setSubmitting(true);
    setStatus({ kind: "idle" });
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableId: selected.id,
        date,
        time,
        partySize: party,
        customerName: name.trim(),
        customerPhone: phone.trim(),
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setStatus({ kind: "error", message: data.error ?? "No se pudo reservar." });
      await loadAvailability();
      setSelected(null);
      return;
    }
    setStatus({ kind: "success", id: data.reservation.id });
    await loadAvailability();
  }

  return (
    <div className="booking-shell">
      <div className="booking-controls">
        <div>
          <span className="grp-label">Sede</span>
          <div className="pill-row">
            {LOCATIONS.map((l) => (
              <button
                key={l.id}
                className="pill"
                aria-pressed={l.id === locationId}
                onClick={() => setLocationId(l.id)}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="grp-label">Fecha</span>
          <input
            type="date"
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <span className="grp-label">Turno</span>
          <div className="pill-row">
            {SLOTS.map((s) => (
              <button
                key={s}
                className="pill"
                aria-pressed={s === time}
                onClick={() => setTime(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="front-counter">🔥 Horno a leña · Barra abierta</div>

      {loading ? (
        <p style={{ color: "var(--paper-dim)" }}>Cargando disponibilidad…</p>
      ) : (
        zones.map(([zone, rows]) => {
          const free = rows.filter((r) => !r.reserved).length;
          return (
            <div className="zone" key={zone}>
              <div className="zone-label">
                <span>{zone}</span>
                <span>{free}/{rows.length} libres</span>
              </div>
              <div className="table-grid">
                {rows.map((t) => {
                  const isSel = selected?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      className="table-btn"
                      data-state={isSel ? "selected" : t.reserved ? "reserved" : "free"}
                      disabled={t.reserved}
                      onClick={() => {
                        setSelected(t);
                        setStatus({ kind: "idle" });
                      }}
                      aria-label={`${zone}, mesa ${t.number}, ${t.reserved ? "ocupada" : "libre"}`}
                    >
                      {t.number}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      <div className="legend">
        <span><i className="i-free" /> Libre</span>
        <span><i className="i-res" /> Ocupada</span>
        <span><i className="i-sel" /> Tu mesa</span>
      </div>

      <div className="ticket">
        <div className="ticket-stub">
          <div className="stub-title">La Plaza Artesanal · Ticket</div>
          <div className="stub-code">{selected ? `M${selected.number} · ${selected.zone}` : "— · —"}</div>
          <dl>
            <dt>Sede</dt><dd>{LOCATIONS.find((l) => l.id === locationId)?.name}</dd>
            <dt>Fecha</dt><dd>{date}</dd>
            <dt>Turno</dt><dd>{time}</dd>
            <dt>Personas</dt><dd>{party}</dd>
          </dl>
        </div>

        {status.kind === "success" ? (
          <div>
            <span className="eyebrow">Reserva confirmada</span>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--marquee)", fontSize: 20, marginTop: 10 }}>
              #{status.id.slice(-8)}
            </p>
            <p style={{ color: "var(--paper-dim)", marginTop: 8, fontSize: 14 }}>
              Guardada en base de datos — esta mesa ya aparece ocupada para cualquiera
              que consulte este turno, aunque llegue al mismo tiempo.
            </p>
          </div>
        ) : (
          <div className="form-col">
            <label>Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="¿A nombre de quién?" />
            <label>Celular</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9XX XXX XXX" />
            <label>Personas</label>
            <div className="party-stepper">
              <button type="button" onClick={() => setParty((p) => Math.max(1, p - 1))}>−</button>
              <output>{party}</output>
              <button type="button" onClick={() => setParty((p) => Math.min(8, p + 1))}>+</button>
            </div>
            <div className="hero-cta" style={{ justifyContent: "flex-start", marginTop: 20 }}>
              <button className="btn btn-ember" disabled={submitting} onClick={confirmReservation}>
                {submitting ? "Reservando…" : "Confirmar reserva"}
              </button>
            </div>
            {status.kind === "error" && <p className="hint err">{status.message}</p>}
            {!selected && status.kind === "idle" && <p className="hint">Elige una mesa libre arriba.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
