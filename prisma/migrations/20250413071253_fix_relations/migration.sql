-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primeiro_nome` VARCHAR(191) NOT NULL,
    `segundo_nome` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMININO') NOT NULL,
    `bilhete` VARCHAR(191) NOT NULL,
    `telemovel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Residencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('PROPRIA', 'RENDA') NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Papel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil` ENUM('ADMIN', 'ANALISTA') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Papel_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pessoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado_civil` ENUM('SOLTEIRO', 'CASADO') NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `profissao` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `nivel_instrucao` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `emprego_id` INTEGER NOT NULL,
    `residencia_id` INTEGER NOT NULL,

    UNIQUE INDEX `Pessoa_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `salario` INTEGER NOT NULL,
    `iban` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `pessoa_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Conta_pessoa_id_key`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conjugue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `dependentes` INTEGER NOT NULL,
    `nivel_instrucao` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `data_nascimento` DATETIME(3) NOT NULL,
    `pessoa_id` INTEGER NOT NULL,

    UNIQUE INDEX `Conjugue_pessoa_id_key`(`pessoa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('BILHETE', 'DECLARACAO_TRABALHO', 'DECLARACAO_SEGURO', 'BEM_MOVEL', 'ORDEM_DEBITO', 'DEPOSITO', 'LEVANTAMENTO', 'RECIBO') NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `extensao` VARCHAR(191) NOT NULL,
    `tamanho` VARCHAR(191) NOT NULL,
    `nome_original` VARCHAR(191) NOT NULL,
    `nome_salvado` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `solicitacao` INTEGER NOT NULL DEFAULT 0,
    `adimplencia` INTEGER NOT NULL DEFAULT 0,
    `inadimplencia` INTEGER NOT NULL DEFAULT 0,
    `estado` BOOLEAN NOT NULL DEFAULT true,
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
    `saque_antecipado` BOOLEAN NOT NULL,
    `fundo_protegido` BOOLEAN NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `partilhar_emprestimo` BOOLEAN NOT NULL,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `assunto` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proponente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitacao` INTEGER NOT NULL,
    `reembolsar` INTEGER NOT NULL,
    `satisfeitos` INTEGER NOT NULL,
    `insatisfeitos` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `user_id` INTEGER NOT NULL,
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
    `estado` BOOLEAN NOT NULL DEFAULT false,
    `pessoa_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `pendencia` BOOLEAN NOT NULL,
    `progresso` ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO') NOT NULL,
    `devedor_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `pendencia` BOOLEAN NOT NULL,
    `progresso` ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO') NOT NULL,
    `proponente_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmprestimoSolidario` (
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `solidario_id` INTEGER NOT NULL,
    `emprestimo_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`solidario_id`, `emprestimo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditoSolidario` (
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `solidario_id` INTEGER NOT NULL,
    `credito_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`solidario_id`, `credito_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diversificacao` (
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `investidor_id` INTEGER NOT NULL,
    `emprestimo_id` INTEGER NOT NULL,
    `taxa` INTEGER NOT NULL,
    `protencao` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`investidor_id`, `emprestimo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `taxa` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `pendencia` BOOLEAN NOT NULL,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `pendencia` BOOLEAN NOT NULL,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `pendencia` BOOLEAN NOT NULL,
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
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `detalhe` VARCHAR(191) NOT NULL,
    `proponente_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Papel` ADD CONSTRAINT `Papel_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_emprego_id_fkey` FOREIGN KEY (`emprego_id`) REFERENCES `Emprego`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_residencia_id_fkey` FOREIGN KEY (`residencia_id`) REFERENCES `Residencia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conta` ADD CONSTRAINT `Conta_pessoa_id_fkey` FOREIGN KEY (`pessoa_id`) REFERENCES `Pessoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `Solidario` ADD CONSTRAINT `Solidario_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movel` ADD CONSTRAINT `Movel_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Devedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credito` ADD CONSTRAINT `Credito_devedor_id_fkey` FOREIGN KEY (`devedor_id`) REFERENCES `Devedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_proponente_id_fkey` FOREIGN KEY (`proponente_id`) REFERENCES `Proponente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmprestimoSolidario` ADD CONSTRAINT `EmprestimoSolidario_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmprestimoSolidario` ADD CONSTRAINT `EmprestimoSolidario_emprestimo_id_fkey` FOREIGN KEY (`emprestimo_id`) REFERENCES `Emprestimo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditoSolidario` ADD CONSTRAINT `CreditoSolidario_solidario_id_fkey` FOREIGN KEY (`solidario_id`) REFERENCES `Solidario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditoSolidario` ADD CONSTRAINT `CreditoSolidario_credito_id_fkey` FOREIGN KEY (`credito_id`) REFERENCES `Credito`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
