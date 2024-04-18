/*
  Warnings:

  - A unique constraint covering the columns `[room,bed]` on the table `Bed` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Bed_room_bed_key` ON `Bed`(`room`, `bed`);
