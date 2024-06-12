const prisma = require("./index");
const bcrypt = require("bcryptjs");

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

async function main() {
  console.log(`Strat seeding ...`);

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hash("admin"),
      address: "Jl. Admin",
      nip: "1234567890",
      phone: "081234567890",
      gender: "Laki-Laki",
      status: 1,
      role: "admin",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      name: "User",
      email: "user@gmail.com",
      password: hash("user"),
      address: "Jl. User",
      nip: "1234567892",
      phone: "081234567890",
      gender: "Laki-Laki",
      status: 1,
      role: "user",
    },
  });

  const beds = [
    { room: "A", bed: "1", status: 0 },
    { room: "A", bed: "2", status: 0 },
    { room: "A", bed: "3", status: 0 },
    { room: "B", bed: "1", status: 0 },
    { room: "B", bed: "2", status: 0 },
    { room: "B", bed: "3", status: 0 },
    { room: "B", bed: "4", status: 0 },
    { room: "C", bed: "1", status: 0 },
    { room: "C", bed: "2", status: 0 },
    { room: "D", bed: "1", status: 0 },
    { room: "D", bed: "2", status: 0 },
    { room: "D", bed: "3", status: 0 },
  ];

  for (let bed of beds) {
    await prisma.bed.upsert({
      where: { room_bed: { room: bed.room, bed: bed.bed } },
      update: {},
      create: {
        room: bed.room,
        bed: bed.bed,
        status: bed.status,
      },
    });
  }

  console.log(`created admin with id ${admin.id}`);
  console.log(`created user with id ${user.id}`);
  console.log(`Seeding finished`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
