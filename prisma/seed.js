const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.createMany({
    data:[
      {
        email:"test@gmail.com",
        firstName:"Annoy",
        lastName:"Orange",
        avatar:"AVATAR!",
        password:"abcd"
      },
      {
        email:"Random@gmail.com",
        firstName:"Joe",
        lastName:"Random",
        avatar:"AVATAR!",
        password:"12345"
      },
    ]
  })
}

main()
  .catch((e)=>{
    console.error(e);
    process.exit(1);
  })
  .finally(async()=>await prisma.$disconnect)