/*
  Warnings:

  - You are about to drop the column `solidario_id` on the `credito` table. All the data in the column will be lost.
  - You are about to drop the column `solidario_id` on the `emprestimo` table. All the data in the column will be lost.
  - Added the required column `pendencia` to the `Credito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Deposito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendencia` to the `Deposito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendencia` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendencia` to the `Pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Saque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendencia` to the `Saque` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `credito` DROP FOREIGN KEY `Credito_solidario_id_fkey`;

-- DropForeignKey
ALTER TABLE `emprestimo` DROP FOREIGN KEY `Emprestimo_solidario_id_fkey`;

-- DropIndex
DROP INDEX `Credito_solidario_id_key` ON `credito`;

-- DropIndex
DROP INDEX `Emprestimo_solidario_id_key` ON `emprestimo`;

-- AlterTable
ALTER TABLE `credito` DROP COLUMN `solidario_id`,
    ADD COLUMN `pendencia` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `deposito` ADD COLUMN `estado` BOOLEAN NOT NULL,
    ADD COLUMN `pendencia` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `emprestimo` DROP COLUMN `solidario_id`,
    ADD COLUMN `pendencia` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `pagamento` ADD COLUMN `estado` BOOLEAN NOT NULL,
    ADD COLUMN `pendencia` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `saque` ADD COLUMN `estado` BOOLEAN NOT NULL,
    ADD COLUMN `pendencia` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `Papel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil` ENUM('ADMIN', 'ANALISTA') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Papel_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmprestimoSolidario` (
    `solidario_id` INTEGER NOT NULL,
    `emprestimo_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EmprestimoSolidario_solidario_id_key`(`solidario_id`),
    UNIQUE INDEX `EmprestimoSolidario_emprestimo_id_key`(`emprestimo_id`),
    PRIMARY KEY (`solidario_id`, `emprestimo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditoSolidario` (
    `solidario_id` INTEGER NOT NULL,
    `credito_id` INTEGER NOT NULL,
    `taxa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CreditoSolidario_solidario_id_key`(`solidario_id`),
    UNIQUE INDEX `CreditoSolidario_credito_id_key`(`credito_id`),
    PRIMARY KEY (`solidario_id`, `credito_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Papel` ADD CONSTRAINT `Papel_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmprestimoSolidario` ADD CONSTRAINT `EmprestimoSolidario_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmprestimoSolidario` ADD CONSTRAINT `EmprestimoSolidario_emprestimo_id_fkey` FOREIGN KEY (`emprestimo_id`) REFERENCES `Emprestimo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditoSolidario` ADD CONSTRAINT `CreditoSolidario_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditoSolidario` ADD CONSTRAINT `CreditoSolidario_credito_id_fkey` FOREIGN KEY (`credito_id`) REFERENCES `Credito`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
