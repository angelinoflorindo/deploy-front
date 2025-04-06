/*
  Warnings:

  - You are about to alter the column `estado_civil` on the `pessoa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `pessoa` MODIFY `estado_civil` ENUM('SOLTEIRO', 'CASADO') NOT NULL;
