# Criando o banco
CREATE DATABASE agenda DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;

# Selecionando o banco
USE agenda;

# Criando a tabela
CREATE TABLE contatos(
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(250) NOT NULL,
    telefone CHAR(9) NOT NULL,
    celular CHAR(8) NOT NULL,
    email CHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) DEFAULT CHARSET = utf8mb4, DEFAULT COLLATE = utf8mb4_general_ci, COMMENT = 'Tabela para guardar os contatos cadastrado pelo sistema';