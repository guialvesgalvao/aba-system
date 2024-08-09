CREATE TABLE
  `customers` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `status` varchar(255) DEFAULT NULL,
    `cnpj` varchar(255) DEFAULT NULL,
    `delivery_address` varchar(255) DEFAULT NULL,
    `complete_address` varchar(255) DEFAULT NULL,
    `state_registration` varchar(255) DEFAULT NULL,
    `fantasy_name` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by` varchar(255) DEFAULT NULL,
    `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci