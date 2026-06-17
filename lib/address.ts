import {prisma} from './prisma'

export async function getAddressById(addressId: string) {
    return prisma.address.findUnique({
        where: { id: addressId },
    });
}