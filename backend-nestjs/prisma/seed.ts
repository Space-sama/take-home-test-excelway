import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create multiple projects
  const projects = [
    {
      title: 'Project Alpha',
      description: 'Description of Project Alpha',
      order: 0,
    },
    {
      title: 'Project Beta',
      description: 'Description of Project Beta',
      order: 1,
    },
    {
      title: 'Project Gamma',
      description: 'Description of Project Gamma',
      order: 2,
    },
    {
      title: 'Project Delta',
      description: 'Description of Project Delta',
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }
}
main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
