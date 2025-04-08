/*
  Warnings:

  - You are about to drop the column `partilhar_emprestimo` on the `emprestimo` table. All the data in the column will be lost.
  - Added the required column `partilhar_emprestimo` to the `Investidor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emprestimo` DROP COLUMN `partilhar_emprestimo`;

-- AlterTable
ALTER TABLE `investidor` ADD COLUMN `partilhar_emprestimo` BOOLEAN NOT NULL;
