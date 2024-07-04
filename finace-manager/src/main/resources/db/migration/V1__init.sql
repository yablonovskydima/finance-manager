    CREATE DATABASE IF NOT EXISTS finance_manager_db;
USE finance_manager_db;

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT NOT NULL AUTO_INCREMENT,
    `type`VARCHAR(100) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    `transaction_type` VARCHAR(100) NOT NULL,
    `transaction_sum` DOUBLE NOT NULL,
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `description` VARCHAR(150) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_category_transaction FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT ch_transaction_sum_is_not_negative CHECK(transaction_sum >= 0)

) ENGINE=InnoDB;