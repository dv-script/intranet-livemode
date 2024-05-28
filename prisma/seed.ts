const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient()

// import { db } from "@/app/_lib/prisma";

// async function createCategories() {
//   const categories = [{ name: "Encoder" }, { name: "Decoder" }];

//   try {
//     for (const category of categories) {
//       await db.category.create({
//         data: {
//           name: category.name,
//         },
//       });
//     }
//   } catch (error) {
//     throw error;
//   }
// }

async function createIntranets() {
  const intranets = [
    {
      name: "Makito Encoder",
      link: "http://a.mke.livemode.link",
      categoryId: "8b08bf53-3728-4248-aeee-6a98f452decc",
    },
    {
      name: "Makito Decoder",
      link: "http://a.mkd.livemode.link",
      categoryId: "ee69fab6-80cd-433c-b24c-c45288ccb901",
    },
  ];

  try {
    for (const intranet of intranets) {
      await db.intranet.create({
        data: {
          name: intranet.name,
          link: intranet.link,
          categoryId: intranet.categoryId,
        },
      });
    }
  } catch (error) {
    throw error;
  }
}

async function main() {
  // await createCategories();
  await createIntranets();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await db.$disconnect();
  });
