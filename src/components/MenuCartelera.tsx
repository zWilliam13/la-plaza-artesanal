"use client";

import { useState } from "react";

const MENU: Record<string, { n: string; d: string; p: number }[]> = {
  "Pizzas La Plaza": [
    { n: "Pizza Lomo Saltado", d: "Salsa de tomate, mozzarella, lomo saltado, papas nativas.", p: 34 },
    { n: "Pizza Peruviana Brava", d: "Huancaína, mozzarella, aceitunas negras, papitas nativas, tocino.", p: 31 },
    { n: "Pizza Mar & Tierra", d: "Langostinos flambeados, queso azul, champiñones.", p: 33 },
    { n: "Pizza La Plaza Mix", d: "Jamón, tocino, pepperoni, salame, frankfurter, champiñones.", p: 35 },
  ],
  "Pizzas Italianas": [
    { n: "Pizza Carnaval Italiano", d: "Tomates confitados, prosciutto, stracciatella, parmesano laminado.", p: 34 },
    { n: "Pizza Cuatro Quesos", d: "Stracciatella, mozzarella, queso azul, parmesano.", p: 31 },
    { n: "Pizza Estrella", d: "Esquinas rellenas de mozzarella, jamón artesanal, balsámico.", p: 34 },
    { n: "Pizza Reina Margarita", d: "Salsa de tomate, mozzarella fior di latte, albahaca fresca.", p: 29 },
  ],
  "Pastas Artesanales": [
    { n: "Fetuccinis al Alfredo", d: "Salsa blanca cremosa, trocitos de jamón.", p: 33 },
    { n: "Fetuccinis Huancaína c/ Lomo", d: "Salsa huancaína cremosa con lomo fino argentino.", p: 54 },
    { n: "Spaghettis a la Carbonara", d: "Cremosa, con tocino crocante.", p: 36 },
    { n: "Gnochis Salsa 4 Quesos", d: "Servidos en plato comestible.", p: 39 },
  ],
  Risottos: [
    { n: "Risotto Mariscos c/ Langostinos", d: "Salsa de mariscos, langostinos.", p: 42 },
    { n: "Lomo Saltado Fusión", d: "Lomo fino argentino, papas nativas, arroz arbóreo al ají.", p: 58 },
    { n: "Risotto 4 Quesos c/ Pollo", d: "Salsa 4 quesos, pechuga en tiras.", p: 41 },
  ],
  Burgers: [
    { n: "Burgerpizza Signature", d: "Hamburguesa envuelta en masa de pizza, doble cheddar, tocino.", p: 38 },
    { n: "La Plaza Prime", d: "Doble cheddar, aros de cebolla, cebolla caramelizada, bbq.", p: 40 },
    { n: "La Gringa Power", d: "Carne argentina, doble cheddar, pickles, tocino.", p: 33 },
    { n: "Cheese Clásica", d: "Carne argentina, doble queso cheddar, pan brioche.", p: 28 },
  ],
};

const CATS = Object.keys(MENU);

export default function MenuCartelera() {
  const [active, setActive] = useState(CATS[0]);

  return (
    <>
      <div className="menu-cats">
        {CATS.map((c) => (
          <button
            key={c}
            className="menu-cat-btn"
            aria-pressed={c === active}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {MENU[active].map((item) => (
          <div className="menu-item" key={item.n}>
            <div className="row">
              <h4>{item.n}</h4>
              <span className="price">S/ {item.p.toFixed(2)}</span>
            </div>
            <p>{item.d}</p>
          </div>
        ))}
      </div>
    </>
  );
}
