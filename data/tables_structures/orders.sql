CREATE TABLE
  `orders` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `client_name` varchar(255) DEFAULT NULL,
    `status` varchar(255) DEFAULT NULL,
    `total_cost_value` float DEFAULT NULL,
    `total_sale_value` float DEFAULT NULL,
    `extra_details` varchar(255) DEFAULT NULL,
    `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `invoicing_date` datetime DEFAULT NULL,
    `client_address` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by` varchar(255) DEFAULT NULL,
    `modified_by` varchar(255) DEFAULT NULL,
    `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci