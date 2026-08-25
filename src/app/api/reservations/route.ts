import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tableId, date, time, partySize, customerName, customerPhone } = body;

  if (!tableId || !date || !time || !partySize || !customerName || !customerPhone) {
    return NextResponse.json(
      { error: "Faltan campos: tableId, date, time, partySize, customerName, customerPhone" },
      { status: 400 }
    );
  }

  try {
    const reservation = await prisma.reservation.create({
      data: { tableId, date, time, partySize, customerName, customerPhone },
    });
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (err) {
    // P2002: the (tableId, date, time) unique constraint fired — someone already
    // holds this table for this slot. This is the actual anti-double-booking
    // guarantee: it holds even if two requests hit the DB at the same instant,
    // which a check-then-insert in application code would not.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Esa mesa ya fue reservada para ese turno." },
        { status: 409 }
      );
    }
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
