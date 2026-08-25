import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locationId = searchParams.get("locationId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  if (!locationId || !date || !time) {
    return NextResponse.json(
      { error: "locationId, date y time son requeridos" },
      { status: 400 }
    );
  }

  const tables = await prisma.table.findMany({
    where: { locationId },
    orderBy: [{ zone: "asc" }, { number: "asc" }],
    include: {
      reservations: {
        where: { date, time },
      },
    },
  });

  const result = tables.map((t) => ({
    id: t.id,
    zone: t.zone,
    number: t.number,
    capacity: t.capacity,
    reserved: t.reservations.length > 0,
    reservedFor: t.reservations[0]
      ? { partySize: t.reservations[0].partySize }
      : null,
  }));

  return NextResponse.json({ tables: result });
}
