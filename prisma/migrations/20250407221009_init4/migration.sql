-- CreateTable
CREATE TABLE `Conta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `salario` INTEGER NOT NULL,
    `iban` VARCHAR(191) NOT NULL,
    `emprego_id` INTEGER NOT NULL,
    `pessoa_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Conta_emprego_id_key`(`emprego_id`),
    UNIQUE INDEX `Conta_pessoa_id_key`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_emprego_id_fkey` FOREIGN KEY (`emprego_id`) REFERENCES `Emprego`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_pessoa_id_fkey` FOREIGN KEY (`pessoa_id`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
