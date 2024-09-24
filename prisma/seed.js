const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const findAccount = await prisma.userAccount.findFirst({
    where: { userName: "root" },
  });

  if (!findAccount) {
    await prisma.userAccount.create({
      data: {
        userName: "root",
        password: "@Abc123",
        hashPassword: "@Abc123",
      },
    });
  }
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
