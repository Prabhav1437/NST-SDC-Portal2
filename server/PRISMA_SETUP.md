# Prisma Setup Guide

This guide will help you set up and use Prisma in the NST-SDC Portal project.

## Prerequisites

- PostgreSQL database (local or cloud)
- Node.js installed
- All dependencies installed (`npm install`)

## Database Setup Options

### Option 1: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   ```bash
   createdb nstsdc_portal
   ```
3. Update your `.env` file with your local connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nstsdc_portal?schema=public"
   ```

### Option 2: Prisma Postgres (Cloud)

1. Use the Prisma CLI to create a cloud database:
   ```bash
   npx prisma dev
   ```
2. Follow the prompts to create a new database
3. The DATABASE_URL will be automatically configured

### Option 3: Other Cloud Providers

You can use any PostgreSQL provider like:
- **Supabase**: https://supabase.com/
- **Neon**: https://neon.tech/
- **Railway**: https://railway.app/
- **Render**: https://render.com/

## Prisma Commands

### Generate Prisma Client
Generates the Prisma Client based on your schema:
```bash
npm run prisma:generate
# or
npx prisma generate
```

### Create and Apply Migrations
Creates a new migration and applies it to the database:
```bash
npm run prisma:migrate
# or
npx prisma migrate dev --name your_migration_name
```

### Push Schema to Database (Development)
Pushes schema changes without creating migration files:
```bash
npm run prisma:push
# or
npx prisma db push
```

### Open Prisma Studio
Visual database browser:
```bash
npm run prisma:studio
# or
npx prisma studio
```

### Reset Database
⚠️ **WARNING**: This will delete all data!
```bash
npx prisma migrate reset
```

## Schema Models

The current schema includes:

- **User** - Club members with GitHub profiles
- **Repository** - GitHub repositories tracked by the club
- **Commit** - Individual commits by users
- **PullRequest** - Pull requests created by users
- **Issue** - Issues created by users
- **Achievement** - Available achievements
- **UserAchievement** - Achievements unlocked by users
- **ActivityLog** - Daily activity tracking

## Using Prisma in Your Code

### Import Prisma Client
```javascript
const prisma = require('./lib/prisma');
```

### Example Queries

#### Create a User
```javascript
const user = await prisma.user.create({
  data: {
    githubId: '12345',
    username: 'johndoe',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'MEMBER'
  }
});
```

#### Find Users
```javascript
// Find all users
const users = await prisma.user.findMany();

// Find one user
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// Find with relations
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    commits: true,
    pullRequests: true,
    achievements: true
  }
});
```

#### Update a User
```javascript
const updatedUser = await prisma.user.update({
  where: { id: userId },
  data: { name: 'New Name' }
});
```

#### Delete a User
```javascript
await prisma.user.delete({
  where: { id: userId }
});
```

## Seeding the Database

Create a `prisma/seed.js` file to populate your database with initial data:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create achievements
  await prisma.achievement.createMany({
    data: [
      {
        name: 'First Commit',
        description: 'Made your first commit',
        category: 'COMMITS',
        points: 10
      },
      // Add more achievements...
    ]
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run the seed:
```bash
node prisma/seed.js
```

## Common Issues

### "Environment variable not found"
Make sure your `.env` file exists and contains `DATABASE_URL`

### "Can't reach database server"
- Check if PostgreSQL is running
- Verify your connection string is correct
- Check firewall settings

### Migration conflicts
If you have conflicts, you can reset:
```bash
npx prisma migrate reset
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
