-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'READY', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Buyer" (
    "user_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone_numbers" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("buyer_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "claim_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("claim_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total" DOUBLE PRECISION NOT NULL,
    "address_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "buyer_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("buyer_id","vendor_id")
);

-- CreateTable
CREATE TABLE "AdminBuyer" (
    "id_admin" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "AdminBuyer_pkey" PRIMARY KEY ("id_admin")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_user_id_key" ON "Buyer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_mail_key" ON "Buyer"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Order_externalId_key" ON "Order"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminBuyer_id_usuario_key" ON "AdminBuyer"("id_usuario");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "Buyer"("buyer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "Buyer"("buyer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
