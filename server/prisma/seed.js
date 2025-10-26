require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create sample achievements
  console.log('Creating achievements...');
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        name: 'First Commit',
        description: 'Made your first commit to a club repository',
        category: 'COMMITS',
        points: 10,
        criteria: JSON.stringify({ commits: { min: 1 } })
      },
      {
        name: 'Commit Enthusiast',
        description: 'Made 50 commits',
        category: 'COMMITS',
        points: 50,
        criteria: JSON.stringify({ commits: { min: 50 } })
      },
      {
        name: 'Commit Legend',
        description: 'Made 100 commits',
        category: 'COMMITS',
        points: 100,
        criteria: JSON.stringify({ commits: { min: 100 } })
      },
      {
        name: 'First PR',
        description: 'Created your first pull request',
        category: 'PULL_REQUESTS',
        points: 15,
        criteria: JSON.stringify({ pullRequests: { min: 1 } })
      },
      {
        name: 'PR Master',
        description: 'Created 20 pull requests',
        category: 'PULL_REQUESTS',
        points: 75,
        criteria: JSON.stringify({ pullRequests: { min: 20 } })
      },
      {
        name: 'Issue Reporter',
        description: 'Created your first issue',
        category: 'ISSUES',
        points: 10,
        criteria: JSON.stringify({ issues: { min: 1 } })
      },
      {
        name: 'Bug Hunter',
        description: 'Created 10 issues',
        category: 'ISSUES',
        points: 50,
        criteria: JSON.stringify({ issues: { min: 10 } })
      },
      {
        name: 'Team Player',
        description: 'Collaborated on 5 different repositories',
        category: 'COLLABORATION',
        points: 40,
        criteria: JSON.stringify({ repositories: { min: 5 } })
      },
      {
        name: 'Week Warrior',
        description: 'Committed every day for a week',
        category: 'STREAK',
        points: 30,
        criteria: JSON.stringify({ streak: { days: 7 } })
      },
      {
        name: 'Month Master',
        description: 'Committed every day for a month',
        category: 'STREAK',
        points: 100,
        criteria: JSON.stringify({ streak: { days: 30 } })
      },
      {
        name: 'Welcome Aboard',
        description: 'Joined the NST-SDC club',
        category: 'MILESTONE',
        points: 5,
        criteria: JSON.stringify({ joined: true })
      },
      {
        name: 'One Year Strong',
        description: 'Been a club member for one year',
        category: 'MILESTONE',
        points: 100,
        criteria: JSON.stringify({ membershipDays: { min: 365 } })
      }
    ],
    skipDuplicates: true
  });

  console.log(`Created ${achievements.count} achievements`);

  // You can add sample users, repositories, etc. here
  // For now, we'll just create the achievements

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
