import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const post = await prisma.user.updateMany({
    // where: { id: 1 },
    data: { password: bcrypt.hashSync("123456a", 10) },
  });
  console.log(post);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
