/*
  Warnings:

  - Added the required column `dependentes` to the `Conjugue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `conjugue` ADD COLUMN `dependentes` INTEGER NOT NULL;
