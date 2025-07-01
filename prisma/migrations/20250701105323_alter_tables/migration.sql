/*
  Warnings:

  - Added the required column `updatedAt` to the `Gig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gig` ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deliveryTime` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
