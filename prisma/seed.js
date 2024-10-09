const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const findUser = await prisma.user.findFirst({
    where: { email: "root@dnroot.com" },
  });

  if (!findUser) {
    const createUser = await prisma.user.create({
      data: {
        email: "root@dnroot.com",
        name: "Root",
      },
    });
    const findAccount = await prisma.userAccount.findFirst({
      where: { userName: "root@dnroot.com" },
    });

    if (!findAccount) {
      await prisma.userAccount.create({
        data: {
          userName: "root@dnroot.com",
          password: "@Abc123",
          hashPassword: "@Abc123",
          role: "ROOT",
          userId: createUser.id,
        },
      });
    }
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
