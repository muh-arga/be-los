/*
  Warnings:

  - You are about to drop the column `numCPevents` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numCallouts` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numCharEvents` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numDiagnosis` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numInput` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numLabs` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numMicroLabs` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numNotes` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numOutput` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numProcEvents` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numProcs` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numRX` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `numTransfers` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `totalNumInteract` on the `los` table. All the data in the column will be lost.
  - Added the required column `NumCPTevents` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumCallouts` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumChartEvents` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumDiagnosis` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumInput` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumLabs` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumMicroLabs` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumNotes` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumOutput` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumProcs` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumRx` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumTransfers` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalNumInteract` to the `Los` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `los` DROP COLUMN `numCPevents`,
    DROP COLUMN `numCallouts`,
    DROP COLUMN `numCharEvents`,
    DROP COLUMN `numDiagnosis`,
    DROP COLUMN `numInput`,
    DROP COLUMN `numLabs`,
    DROP COLUMN `numMicroLabs`,
    DROP COLUMN `numNotes`,
    DROP COLUMN `numOutput`,
    DROP COLUMN `numProcEvents`,
    DROP COLUMN `numProcs`,
    DROP COLUMN `numRX`,
    DROP COLUMN `numTransfers`,
    DROP COLUMN `totalNumInteract`,
    ADD COLUMN `NumCPTevents` DOUBLE NOT NULL,
    ADD COLUMN `NumCallouts` DOUBLE NOT NULL,
    ADD COLUMN `NumChartEvents` DOUBLE NOT NULL,
    ADD COLUMN `NumDiagnosis` DOUBLE NOT NULL,
    ADD COLUMN `NumInput` DOUBLE NOT NULL,
    ADD COLUMN `NumLabs` DOUBLE NOT NULL,
    ADD COLUMN `NumMicroLabs` DOUBLE NOT NULL,
    ADD COLUMN `NumNotes` DOUBLE NOT NULL,
    ADD COLUMN `NumOutput` DOUBLE NOT NULL,
    ADD COLUMN `NumProcs` DOUBLE NOT NULL,
    ADD COLUMN `NumRx` DOUBLE NOT NULL,
    ADD COLUMN `NumTransfers` DOUBLE NOT NULL,
    ADD COLUMN `TotalNumInteract` DOUBLE NOT NULL;
