/*
  Warnings:

  - You are about to drop the column `numProcEvent` on the `los` table. All the data in the column will be lost.
  - You are about to drop the column `totalNumIntreract` on the `los` table. All the data in the column will be lost.
  - Added the required column `numProcEvents` to the `Los` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalNumInteract` to the `Los` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `los` DROP COLUMN `numProcEvent`,
    DROP COLUMN `totalNumIntreract`,
    ADD COLUMN `numProcEvents` DOUBLE NOT NULL,
    ADD COLUMN `totalNumInteract` DOUBLE NOT NULL;
