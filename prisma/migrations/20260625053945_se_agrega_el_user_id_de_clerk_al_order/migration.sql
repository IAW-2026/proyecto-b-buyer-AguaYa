/*
  Warnings:

  - Added the required column `buyer_user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyer_user_id" TEXT NOT NULL;
