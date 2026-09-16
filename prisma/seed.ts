import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not configured');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function seed(): Promise<void> {
  const existingProfile = await prisma.profile.findFirst({
    select: { id: true },
  });

  if (existingProfile) {
    console.info('Database seed skipped: profile already exists');
    return;
  }

  await prisma.profile.create({
    data: {
      name: 'Дмитрий',
      description:
        'Backend-разработчик, имею опыт разработки и поддержки доменного регистратора. Разрабатывал сервисы на TS и NestJS ' +
        'управления жизненным циклом домена, биллинга, платежей, административных API, уведомления, интеграции с внешними сервисами, ' +
        'также работал с хостингом и настраивал взаимодействие размещённых приложений с основным backend. ' +
        'Работал с Kafka, BullMQ, Redis',
      professionalLinks: {
        create: [
          {
            label: 'GitHub',
            url: 'https://github.com/rauck1s',
          },
        ],
      },
      skills: {
        create: [
          { name: 'Backend' },
          { name: 'TypeScript' },
          { name: 'NestJS' },
          { name: 'Kafka' },
          { name: 'BullMQ' },
          { name: 'Redis' },
          { name: 'GraphQL' },
          { name: 'Testing' },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Purrweb',
            position: 'Backend Developer',
            achievement:
              'Реализовал административные API, развивал доменные и платёжные процессы, ' +
              'улучшал систему уведомлений и обработку ошибок внешних сервисов. ' +
              'Предлагал решения, которые сократили часы разработки',
            startedAt: new Date('2025-11-23T00:00:00.000Z'),
            endedAt: null,
          },
          {
            company: 'Titan',
            position: 'Backend Developer',
            achievement:
              'Разработал сервис для повышения квалификации и тестирования сотрудников на NestJS и Prisma',
            startedAt: new Date('2024-10-01T00:00:00.000Z'),
            endedAt: new Date('2025-05-30T00:00:00.000Z'),
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Clone Trello',
            description: 'Клон Trello, тестовое задание',
            url: 'https://github.com/rauck1s/trello',
          },
          {
            name: 'Auth service',
            description:
              'Сервис аутентификации на NestJS и PostgreSQL с REST API и GraphQL API, JWT-токенами, ролями и разграничением прав доступа.',
            url: 'https://github.com/rauck1s/auth-service',
          },
        ],
      },
    },
  });

  console.info('Database seed completed');
}

seed()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
