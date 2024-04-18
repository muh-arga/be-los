-- DropForeignKey
ALTER TABLE `los` DROP FOREIGN KEY `Los_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `los` DROP FOREIGN KEY `Los_staffId_fkey`;

-- AlterTable
ALTER TABLE `los` MODIFY `staffId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Los` ADD CONSTRAINT `Los_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Los` ADD CONSTRAINT `Los_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
