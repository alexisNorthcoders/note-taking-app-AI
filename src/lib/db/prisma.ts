import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prismaClientSingleton()
}

const prisma = globalThis.prismaGlobal

export default prisma