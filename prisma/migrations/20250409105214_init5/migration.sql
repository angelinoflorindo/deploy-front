-- DropForeignKey
ALTER TABLE `documento` DROP FOREIGN KEY `Documento_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `pessoa` DROP FOREIGN KEY `Pessoa_emprego_id_fkey`;

-- DropForeignKey
ALTER TABLE `pessoa` DROP FOREIGN KEY `Pessoa_residencia_id_fkey`;

-- DropForeignKey
ALTER TABLE `reclamacao` DROP FOREIGN KEY `Reclamacao_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `solidario` DROP FOREIGN KEY `Solidario_user_id_fkey`;

-- DropIndex
DROP INDEX `Documento_user_id_key` ON `documento`;

-- DropIndex
DROP INDEX `Pessoa_emprego_id_key` ON `pessoa`;

-- DropIndex
DROP INDEX `Pessoa_residencia_id_key` ON `pessoa`;

-- DropIndex
DROP INDEX `Reclamacao_user_id_key` ON `reclamacao`;

-- DropIndex
DROP INDEX `Solidario_user_id_key` ON `solidario`;

-- AddForeignKey
ALTER TABLE `Proponente` ADD CONSTRAINT `Proponente_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditoSolidario` ADD CONSTRAINT `CreditoSolidario_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditoSolidario` ADD CONSTRAINT `CreditoSolidario_credito_id_fkey` FOREIGN KEY (`credito_id`) REFERENCES `Credito`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saque` ADD CONSTRAINT `Saque_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reembolso` ADD CONSTRAINT `Reembolso_proponente_id_fkey` FOREIGN KEY (`proponente_id`) REFERENCES `Proponente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
