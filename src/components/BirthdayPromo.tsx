"use client";

import { useState } from "react";

export default function BirthdayPromo() {
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [phone, setPhone] = useState("");
  const [hint, setHint] = useState<{ ok: boolean; text: string } | null>(null);

  function generate() {
    if (!name.trim() || !month.trim() || !phone.trim()) {
      setHint({ ok: false, text: "Falta nombre, mes o WhatsApp — sin eso no hay cómo avisarte." });
      return;
    }
    setHint({
      ok: true,
      text: `¡Listo, ${name.trim()}! Cuando llegue ${month.trim()} te escribimos por WhatsApp al ${phone.trim()} para que vengas por tu sorpresa.`,
    });
  }

  return (
    <div className="venue-card" data-tag="DEMO">
      <h3 style={{ fontSize: 19 }}>Cumpleaños en La Plaza Artesanal 🎂</h3>
      <div className="form-col">
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
        <label>Mes de cumpleaños</label>
        <input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Ej. Julio" />
        <label>WhatsApp</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9XX XXX XXX" />
        <div className="hero-cta" style={{ justifyContent: "flex-start", marginTop: 20 }}>
          <button className="btn btn-primary" onClick={generate}>Guardar mi cumpleaños</button>
        </div>
        {hint && <p className={`hint ${hint.ok ? "ok" : "err"}`}>{hint.text}</p>}
      </div>
    </div>
  );
}
