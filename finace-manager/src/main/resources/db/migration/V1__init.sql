CREATE DATABASE IF NOT EXISTS finance_manager_db;
USE finance_manager_db;

CREATE TABLE IF NOT EXISTS finances (
    id BIGINT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT uq_finances_type UNIQUE (`type`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    finance_id BIGINT,
    transaction_type VARCHAR(100) NOT NULL,
    transaction_sum DOUBLE NOT NULL,
    transaction_date DATE NOT NULL,
    description VARCHAR(150) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_finance_transaction FOREIGN KEY (finance_id) REFERENCES finances(id),
    CONSTRAINT ch_transaction_sum_is_not_negative CHECK(transaction_sum >= 0)

) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users(
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(40) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_account_non_expired BOOLEAN NOT NULL DEFAULT TRUE,
    is_account_non_locked BOOLEAN NOT NULL DEFAULT TRUE,
    is_credentials_non_expired BOOLEAN NOT NULL DEFAULT TRUE,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    role ENUM('ROLE_ADMIN', 'ROLE_USER', 'ROLE_SYS') NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT uq_users_username UNIQUE(username),
    CONSTRAINT uq_users_email UNIQUE(email)
)ENGINE=InnoDB;