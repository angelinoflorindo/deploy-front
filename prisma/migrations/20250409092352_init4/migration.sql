/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Solidario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Solidario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `solidario` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Solidario_user_id_key` ON `Solidario`(`user_id`);

-- AddForeignKey
ALTER TABLE `Solidario` ADD CONSTRAINT `Solidario_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
