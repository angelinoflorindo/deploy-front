-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primeiro_nome` VARCHAR(191) NOT NULL,
    `segundo_nome` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `genero` ENUM('Masculino', 'Feminino') NOT NULL,
    `bilhete` VARCHAR(191) NOT NULL,
    `telemovel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_password_key`(`password`),
    UNIQUE INDEX `User_bilhete_key`(`bilhete`),
    UNIQUE INDEX `User_telemovel_key`(`telemovel`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emprego` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL,
    `sector` ENUM('PUBLICO', 'PRIVADO') NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `area` ENUM('ADMINISTRACAO_PUBLICA', 'EDUCACAO', 'SAUDE', 'DEFESA_SEGURANCA', 'ENERGIA', 'PETROLEO', 'MINERACAO', 'FINANCAS', 'CONSTRUCAO', 'TECNOLOGIA', 'COMERCIO', 'AGRICULTURA', 'TURISMO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Residencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('PROPRIA', 'RENDA') NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pessoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado_civil` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `profissao` VARCHAR(191) NOT NULL,
    `nivel_instrucao` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `emprego_id` INTEGER NOT NULL,
    `residencia_id` INTEGER NOT NULL,

    UNIQUE INDEX `Pessoa_user_id_key`(`user_id`),
    UNIQUE INDEX `Pessoa_emprego_id_key`(`emprego_id`),
    UNIQUE INDEX `Pessoa_residencia_id_key`(`residencia_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conjugue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `nivel_instrucao` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `pessoa_id` INTEGER NOT NULL,

    UNIQUE INDEX `Conjugue_pessoa_id_key`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('BILHETE', 'DECLARACAO_TRABALHO', 'DECLARACAO_SEGURO', 'BEM_MOVEL', 'PAGAMENTO') NOT NULL,
    `titilo` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Documento_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `solicitacao` INTEGER NOT NULL,
    `adimplencia` INTEGER NOT NULL,
    `inadimplencia` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Devedor_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investidor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maior_risco` BOOLEAN NOT NULL,
    `maior_seguranca` BOOLEAN NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Investidor_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reclamacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `assunto` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Reclamacao_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proponente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `solicitacao` INTEGER NOT NULL,
    `reembolsar` INTEGER NOT NULL,
    `satisfeitos` INTEGER NOT NULL,
    `insatisfeitos` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Proponente_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solidario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('CREDITO', 'EMPRESTIMO') NOT NULL,
    `parentesco` ENUM('PAI', 'MAE', 'FILHO', 'FILHA', 'AVO', 'NETO', 'NETA', 'IRMAO', 'IRMA', 'TIO', 'TIA', 'SOBRINHO', 'SOBRINHA', 'PRIMO', 'PRIMA', 'CUNHADO', 'CUNHADA', 'SOGRO', 'SOGRA', 'GENRO', 'NORA', 'ENTEADO', 'ENTEADA', 'PADRASTO', 'MADRASTA') NOT NULL,
    `taxa` INTEGER NOT NULL,
    `pessoa_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Solidario_pessoa_id_key`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` ENUM('CARRO', 'MOTO') NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,
    `detalhes` VARCHAR(191) NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('CONSUMO', 'DECIMA', 'VIGESSIMA', 'MENSAL') NOT NULL,
    `valor` DOUBLE NOT NULL,
    `prestacao` INTEGER NOT NULL,
    `juro` INTEGER NOT NULL,
    `termino` DATETIME(3) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `progresso` ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO') NOT NULL,
    `solidario_id` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Credito_solidario_id_key`(`solidario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `juro_proponente` INTEGER NOT NULL,
    `taxa_investidor` INTEGER NOT NULL,
    `prestacao` INTEGER NOT NULL,
    `termino` DATETIME(3) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `progresso` ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO') NOT NULL,
    `solidario_id` INTEGER NOT NULL,
    `proponente_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Emprestimo_solidario_id_key`(`solidario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diversificacao` (
    `investidor_id` INTEGER NOT NULL,
    `emprestimo_id` INTEGER NOT NULL,
    `taxa` INTEGER NOT NULL,
    `protencao` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Diversificacao_investidor_id_key`(`investidor_id`),
    UNIQUE INDEX `Diversificacao_emprestimo_id_key`(`emprestimo_id`),
    PRIMARY KEY (`investidor_id`, `emprestimo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `taxa` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Saque_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deposito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Deposito_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carteira` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo` DOUBLE NOT NULL,
    `numero` INTEGER NOT NULL,
    `codigo` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Carteira_numero_key`(`numero`),
    UNIQUE INDEX `Carteira_codigo_key`(`codigo`),
    UNIQUE INDEX `Carteira_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `detalhe` VARCHAR(191) NOT NULL,
    `prestacao` INTEGER NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reembolso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `prestacao` INTEGER NOT NULL,
    `detalhe` VARCHAR(191) NOT NULL,
    `proponente_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_emprego_id_fkey` FOREIGN KEY (`emprego_id`) REFERENCES `Emprego`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_residencia_id_fkey` FOREIGN KEY (`residencia_id`) REFERENCES `Residencia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conjugue` ADD CONSTRAINT `Conjugue_pessoa_id_fkey` FOREIGN KEY (`pessoa_id`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devedor` ADD CONSTRAINT `Devedor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investidor` ADD CONSTRAINT `Investidor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reclamacao` ADD CONSTRAINT `Reclamacao_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proponente` ADD CONSTRAINT `Proponente_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solidario` ADD CONSTRAINT `Solidario_pessoa_id_fkey` FOREIGN KEY (`pessoa_id`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movel` ADD CONSTRAINT `Movel_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Devedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credito` ADD CONSTRAINT `Credito_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credito` ADD CONSTRAINT `Credito_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Devedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_proponente_id_fkey` FOREIGN KEY (`proponente_id`) REFERENCES `Proponente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diversificacao` ADD CONSTRAINT `Diversificacao_investidor_id_fkey` FOREIGN KEY (`investidor_id`) REFERENCES `Investidor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diversificacao` ADD CONSTRAINT `Diversificacao_emprestimo_id_fkey` FOREIGN KEY (`emprestimo_id`) REFERENCES `Emprestimo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saque` ADD CONSTRAINT `Saque_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposito` ADD CONSTRAINT `Deposito_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carteira` ADD CONSTRAINT `Carteira_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamento` ADD CONSTRAINT `Pagamento_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Devedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reembolso` ADD CONSTRAINT `Reembolso_proponente_id_fkey` FOREIGN KEY (`proponente_id`) REFERENCES `Proponente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
