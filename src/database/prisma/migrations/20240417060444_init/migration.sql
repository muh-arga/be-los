/*
  Warnings:

  - You are about to drop the column `bed` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `los` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `los` DROP COLUMN `bed`,
    DROP COLUMN `room`,
    ADD COLUMN `bedId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Bed` (
    `id` VARCHAR(191) NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `bed` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Los` ADD CONSTRAINT `Los_bedId_fkey` FOREIGN KEY (`bedId`) REFERENCES `Bed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
