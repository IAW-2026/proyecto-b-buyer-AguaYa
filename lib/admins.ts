import { prisma } from './prisma'

export async function getAllAdmins() {
  return prisma.adminBuyer.findMany()
}

export async function createAdmin(id_usuario: string, nombre: string) {
  return prisma.adminBuyer.create({
    data: { id_usuario, nombre },
  })
}

export async function deleteAdmin(adminId: string) {
  return prisma.adminBuyer.delete({
    where: { id_admin: adminId },
  })
}
