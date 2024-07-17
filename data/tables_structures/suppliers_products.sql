CREATE TABLE
  `suppliers_products` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `validity_period` int DEFAULT NULL,
    `value` float DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by` varchar(255) DEFAULT NULL,
    `modified_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified_by` varchar(255) DEFAULT NULL,
    `product_id` int unsigned DEFAULT NULL,
    `supplier_id` int unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `supplier_extend_id` (`supplier_id`),
    KEY `product_extend_id` (`product_id`),
    CONSTRAINT `product_extend_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    CONSTRAINT `supplier_extend_id` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci