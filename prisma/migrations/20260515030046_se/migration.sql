/*
  Warnings:

  - The primary key for the `Reclamos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_reclamo` column on the `Reclamos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `estado` to the `Reclamos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Reclamos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto` to the `Reclamos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_comprador` to the `Reclamos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_pedido` to the `Reclamos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_vendedor` to the `Reclamos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `justificacion` to the `Reclamos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'READY', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Reclamos" DROP CONSTRAINT "Reclamos_pkey",
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "foto" TEXT NOT NULL,
ADD COLUMN     "id_comprador" INTEGER NOT NULL,
ADD COLUMN     "id_pedido" INTEGER NOT NULL,
ADD COLUMN     "id_vendedor" INTEGER NOT NULL,
ADD COLUMN     "justificacion" TEXT NOT NULL,
DROP COLUMN "id_reclamo",
ADD COLUMN     "id_reclamo" SERIAL NOT NULL,
ADD CONSTRAINT "Reclamos_pkey" PRIMARY KEY ("id_reclamo");

-- CreateTable
CREATE TABLE "Cliente" (
    "id_usuario" SERIAL NOT NULL,
    "id_cliente" SERIAL NOT NULL,
    "mail" TEXT NOT NULL,
    "telefonos" TEXT NOT NULL,
    "direcciones" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id_pedido" SERIAL NOT NULL,
    "id_vendedor" SERIAL NOT NULL,
    "id_comprador" SERIAL NOT NULL,
    "estado" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total" DOUBLE PRECISION NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "Favoritos" (
    "id_comprador" INTEGER NOT NULL,
    "id_vendedor" INTEGER NOT NULL,

    CONSTRAINT "Favoritos_pkey" PRIMARY KEY ("id_comprador","id_vendedor")
);

-- CreateTable
CREATE TABLE "AdminBuyer" (
    "id_admin" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "AdminBuyer_pkey" PRIMARY KEY ("id_admin")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_mail_key" ON "Cliente"("mail");
