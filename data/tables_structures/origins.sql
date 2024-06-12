CREATE TABLE
  `origins` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `status` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `editor` varchar(255) DEFAULT NULL,
    `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `created` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci