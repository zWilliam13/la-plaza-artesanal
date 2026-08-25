import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const LOCATIONS = [
  {
    id: "los-olivos",
    name: "Los Olivos",
    zones: [
      { zone: "Barra", count: 6, capacity: 2 },
      { zone: "Terraza Nivel 1", count: 10, capacity: 4 },
      { zone: "Terraza Nivel 2", count: 8, capacity: 4 },
    ],
  },
  {
    id: "miraflores",
    name: "Miraflores",
    zones: [
      { zone: "Barra", count: 4, capacity: 2 },
      { zone: "Salón Principal", count: 12, capacity: 4 },
    ],
  },
];

async function main() {
  for (const loc of LOCATIONS) {
    await prisma.location.upsert({
      where: { id: loc.id },
      update: { name: loc.name },
      create: { id: loc.id, name: loc.name },
    });

    for (const z of loc.zones) {
      for (let n = 1; n <= z.count; n++) {
        await prisma.table.upsert({
          where: { locationId_zone_number: { locationId: loc.id, zone: z.zone, number: n } },
          update: { capacity: z.capacity },
          create: { locationId: loc.id, zone: z.zone, number: n, capacity: z.capacity },
        });
      }
    }
  }
  console.log("Seed listo: 2 sedes, zonas y mesas creadas.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
