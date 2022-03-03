const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  
  const newUser = await prisma.user.create({
    data: {
        email:"test123@gmail.com",
        firstName:"test",
        lastName:"testing",
        avatar:"default avatar",
        password:"test123",
      }
  })
}

main()
  .catch((e)=>{
    console.error(e);
    process.exit(1);
  })
  .finally(async()=>await prisma.$disconnect)