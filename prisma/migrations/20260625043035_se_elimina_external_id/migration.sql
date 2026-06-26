/*
  Warnings:

  - You are about to drop the column `externalId` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_externalId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "externalId";
