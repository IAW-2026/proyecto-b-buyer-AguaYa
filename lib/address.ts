import {prisma} from './prisma'

export type { Address } from '../generated/prisma/client';

export async function getAddressById(addressId: string) {
    return prisma.address.findUnique({
        where: { id: addressId },
    });
}

export async function getAddressesByBuyerId(buyerId: string) {
    return prisma.address.findMany({
        where: { buyer_id: buyerId },
        orderBy: { id: 'desc' },
    });
}

export async function createAddress(buyerId: string, street: string, city: string, zip: string) {
    return prisma.address.create({
        data: { buyer_id: buyerId, street, city, zip },
    });
}

export async function updateAddress(addressId: string, data: { street?: string; city?: string; zip?: string }) {
    return prisma.address.update({
        where: { id: addressId },
        data,
    });
}

export async function deleteAddress(addressId: string) {
    return prisma.address.delete({
        where: { id: addressId },
    });
}