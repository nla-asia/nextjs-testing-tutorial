// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";


// initialize Prisma Client
const prismaobj = new PrismaClient();

async function main() {

  // create a dummy user
  const hash = bcrypt.hashSync("123456#secret", 10);
  const author1 = await prismaobj.user.upsert({
    where: { email: 'naylin@example.com' },
    update: {},
    create: {
      name: 'Nay Lin',
      email: 'naylin@example.com',
      password: hash,
    },
  });

  // create two dummy articles
  const post1 = await prismaobj.article.upsert({
    where: { slug: 'prisma-adds-support-for-mongodb' },
    update: {},
    create: {
      slug: 'prisma-adds-support-for-mongodb',
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      summary:"We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      authorId: author1.id,
    },
  });

  const post2 = await prismaobj.article.upsert({
    where: { slug: "whats-new-in-prisma-q122" },
    update: {},
    create: {
      slug: 'whats-new-in-prisma-q122',
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      summary:'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      authorId: author1.id,
    },
  });

  console.log({ author1, post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prismaobj.$disconnect();
});
