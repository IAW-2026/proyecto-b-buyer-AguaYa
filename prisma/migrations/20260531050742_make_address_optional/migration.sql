-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_address_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "address_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
