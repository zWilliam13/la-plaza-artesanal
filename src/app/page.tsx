import ReservationWidget from "@/components/ReservationWidget";
import MenuCartelera from "@/components/MenuCartelera";
import BirthdayPromo from "@/components/BirthdayPromo";

export default function Page() {
  return (
    <>
      <div className="bulbs" />

      <header className="hero">
        <div className="brand-wordmark">La Plaza Artesanal</div>
        <span className="eyebrow">Los Olivos · Miraflores</span>
        <h1>
          DOS SEDES.
          <br />
          UNA <span>FUNCIÓN</span>.
        </h1>
        <p className="sub">
          Hoy para separar mesa llamas a ciegas — no sabes si hay sitio hasta que
          alguien contesta. Esto te deja ver la disponibilidad real antes de marcar.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#reservas">Ver el mapa de mesas</a>
          <a className="btn btn-ghost" href="#cartelera">Ver la carta</a>
        </div>
        <div className="proof-strip">
          <div><b>19.2M</b>reproducciones TikTok</div>
          <div><b>4.8★</b>Los Olivos · 2,656 reseñas</div>
          <div><b>4.7★</b>Miraflores · 1,221 reseñas</div>
        </div>
      </header>

      <section id="sedes">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">La marca hoy</span>
            <h2>Un concepto. Dos escalas.</h2>
            <p>
              Misma barra libre artesanal en ambas sedes — Google ya las trata
              como negocios distintos por precio y ambiente.
            </p>
          </div>
          <div className="venues">
            <div className="venue-card" data-tag="BARRA LIBRE">
              <h3>Los Olivos</h3>
              <div className="rating">★★★★★ <b>4.8</b> · 2,656 reseñas · Pizzería</div>
              <p className="desc">
                Terraza de dos niveles, barra libre desde S/34.90, el foco viral
                de su TikTok. Familias, grupos de amigos, cumpleaños.
              </p>
              <div className="venue-meta">
                <span><b>Dirección</b> Av. Antúnez de Mayolo 1437, Los Olivos</span>
                <span><b>Ticket promedio</b> S/40–120 por persona</span>
                <span><b>Horario</b> Abre 1:00 p.m. · pico: sábado noche</span>
              </div>
              <blockquote className="quote">
                &quot;Es como una terraza y tiene dos niveles… la Pizza Hawaiana con
                salsa de Saúco estuvo deliciosa.&quot;
                <cite>— Anggie C., Google Maps</cite>
              </blockquote>
            </div>
            <div className="venue-card" data-tag="BARRA LIBRE PREMIUM">
              <h3>Miraflores</h3>
              <div className="rating">★★★★★ <b>4.7</b> · 1,221 reseñas · Barra libre premium</div>
              <p className="desc">
                Mismo concepto de barra libre, versión de alto nivel desde S/54.90
                — ingredientes de primera, ambiente más cuidado, servicio de mesa
                nombrado (Luis, Pedro).
              </p>
              <div className="venue-meta">
                <span><b>Dirección</b> Calle Gral. Borgoño 245, Miraflores</span>
                <span><b>Ticket promedio</b> S/60–80 por persona</span>
                <span><b>Sin web ni horario</b> cargados en Google, hoy</span>
              </div>
              <blockquote className="quote">
                &quot;La atención de Luis fue 10/10. Super amable y atento a nuestra
                orden.&quot;
                <cite>— Judi A., Google Maps</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="cartelera">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">La cartelera · sede Los Olivos</span>
            <h2>El menú, con precios reales</h2>
            <p>Sacado directo de su carta de delivery — nada de &quot;consulta precios por WhatsApp&quot;.</p>
          </div>
          <MenuCartelera />
        </div>
      </section>

      <section id="critica">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">En cartelera dicen</span>
            <h2>Lo que ya opinan, sin que nadie lo cure</h2>
            <p>3,877 reseñas repartidas entre Google, Tripadvisor y Facebook — hoy nadie las reúne en un solo lugar.</p>
          </div>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>&quot;Las pizzas artesanales son exquisitas… el ambiente es acogedor y el servicio excelente.&quot;</p>
              <footer>Jefferson T. — Los Olivos, Google Maps</footer>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>&quot;Muy buen lugar… las promociones están buenas y las raciones son generosas.&quot;</p>
              <footer>Teresa C. — Los Olivos, Google Maps</footer>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>&quot;Prueben la burger pizza 4 quesos y la pizza carnaval, son unas delicias.&quot;</p>
              <footer>Jose U. — Tripadvisor</footer>
            </div>
          </div>
        </div>
      </section>

      <section id="reservas">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">La propuesta central · reserva real</span>
            <h2>Elige tu mesa, como en el cine</h2>
            <p>
              Verde = libre, rojo = ocupada, ámbar = tu selección. Cada clic aquí
              escribe en una base de datos de verdad: dos personas no se pueden
              quedar con la misma mesa en el mismo turno.
            </p>
          </div>
          <ReservationWidget />
        </div>
      </section>

      <section id="cumple">
        <div className="wrap">
          <div className="promo-shell">
            <div>
              <span className="eyebrow">Ya funciona, solo que a mano</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(26px,3.6vw,36px)" }}>
                La sorpresa de cumpleaños
              </h2>
              <p style={{ color: "var(--paper-dim)", marginTop: 14 }}>
                En Los Olivos ya lo hacen a mano: cantan el cumpleaños y regalan una
                mini pizza. Solo falta que quede anotado en un formulario simple, no
                en la memoria de quien conteste el teléfono ese día.
              </p>
              <blockquote className="quote">
                &quot;Le comentamos que era su cumpleaños y le dieron algo de beber de
                cortesía… le cantaron happy birthday, una grata sorpresa.&quot;
                <cite>— reseña Google Maps, Miraflores</cite>
              </blockquote>
            </div>
            <BirthdayPromo />
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div><b>998 356 900</b>Reservas y delivery</div>
            <div><b>laplazaartesanal@gmail.com</b>Contacto</div>
            <div><b>Los Olivos</b>Av. Antúnez de Mayolo 1437</div>
            <div><b>Miraflores</b>Calle Gral. Borgoño 245</div>
          </div>
          <span className="disclaimer">
            Diseño con datos reales de sus redes y directorios públicos · reservas guardadas en base de datos real
          </span>
        </div>
      </footer>
    </>
  );
}
