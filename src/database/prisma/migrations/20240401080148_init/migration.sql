-- CreateTable
CREATE TABLE `Los` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `estimate` INTEGER NOT NULL,
    `numProcEvent` DOUBLE NOT NULL,
    `numNotes` DOUBLE NOT NULL,
    `numLabs` DOUBLE NOT NULL,
    `numCharEvents` DOUBLE NOT NULL,
    `numDiagnosis` DOUBLE NOT NULL,
    `totalNumIntreract` DOUBLE NOT NULL,
    `numProcs` DOUBLE NOT NULL,
    `numCallouts` DOUBLE NOT NULL,
    `numMicroLabs` DOUBLE NOT NULL,
    `numInput` DOUBLE NOT NULL,
    `numOutput` DOUBLE NOT NULL,
    `numCPevents` DOUBLE NOT NULL,
    `numTransfers` DOUBLE NOT NULL,
    `numRX` DOUBLE NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `bed` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Los` ADD CONSTRAINT `Los_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Los` ADD CONSTRAINT `Los_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
