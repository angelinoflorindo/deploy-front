/*
  Warnings:

  - The values [Masculino,Feminino] on the enum `User_genero` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `genero` ENUM('MASCULINO', 'FEMININO') NOT NULL;
