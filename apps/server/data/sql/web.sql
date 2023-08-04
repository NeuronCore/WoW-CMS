/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `web`;

CREATE TABLE IF NOT EXISTS `account_information` (
  `id` int unsigned NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coins` int unsigned DEFAULT NULL,
  `role` enum('admin','manager','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'user',
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `account_password` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `password_changed_at` timestamp NULL DEFAULT NULL,
  `password_reset_expires` timestamp NULL DEFAULT NULL,
  `password_reset_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `blog` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account` int unsigned NOT NULL DEFAULT '0',
  `title_en` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title_de` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title_fa` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The meta title to be used for browser title and SEO.',
  `meta_title_de` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The meta title to be used for browser title and SEO.',
  `meta_title_fa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The meta title to be used for browser title and SEO.',
  `slug_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug_de` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug_fa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `summary_en` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'The summary of the post to mention the key highlights.',
  `summary_de` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'The summary of the post to mention the key highlights.',
  `summary_fa` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'The summary of the post to mention the key highlights.',
  `content_en` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content_de` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content_fa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `published` enum('Confirmed','Rejected','Waiting') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'It can be used to identify whether the post is publicly available.',
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_en` (`slug_en`),
  UNIQUE KEY `slug_de` (`slug_de`),
  UNIQUE KEY `slug_fa` (`slug_fa`),
  KEY `idx_blog_account` (`account`) USING BTREE,
  CONSTRAINT `FK_BLOG_ACCOUNT` FOREIGN KEY (`account`) REFERENCES `account_information` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `blog_category` (
  `blog_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  PRIMARY KEY (`blog_id`,`category_id`) USING BTREE,
  KEY `idx_blog_category_category` (`category_id`) USING BTREE,
  KEY `idx_blog_category_blog` (`blog_id`) USING BTREE,
  CONSTRAINT `FK_BLOG_CATEGORY_BLOG` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
  CONSTRAINT `FK_BLOG_CATEGORY_CATEGORY` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `blog_tag` (
  `blog_id` int unsigned NOT NULL,
  `tag_id` int unsigned NOT NULL,
  PRIMARY KEY (`blog_id`,`tag_id`) USING BTREE,
  KEY `idx_blog_tag_tag` (`tag_id`) USING BTREE,
  KEY `idx_blog_tag_blog` (`blog_id`) USING BTREE,
  CONSTRAINT `FK_BLOG_TAG_BLOG` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
  CONSTRAINT `FK_BLOG_TAG_TAG` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `blog_reads` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `blog_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_blog_reads_blog` (`blog_id`) USING BTREE,
  CONSTRAINT `FK_BLOG_READS_BLOG` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `faq` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_de` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_fa` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_de` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_fa` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `faq` (`id`, `title_en`, `title_de`, `title_fa`, `description_en`, `description_de`, `description_fa`) VALUES
	(1, 'Title', 'Titel', 'عنوان', 'Description', 'Beschreibung', 'شرح'),
	(2, 'Title 2', 'Titel 2', 'عنوان ۲', 'Description', 'Beschreibung', 'شرح'),
	(3, 'Title 3', 'Titel 3', 'عنوان ۳', 'Description', 'Beschreibung', 'شرح');

CREATE TABLE IF NOT EXISTS `feature` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_de` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title_fa` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_en` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_de` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description_fa` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `feature` (`id`, `title_en`, `title_de`, `title_fa`, `image`, `description_en`, `description_de`, `description_fa`) VALUES
    (1, 'Title', 'Titel', 'عنوان', 'feature.jpg', 'Description', 'Beschreibung', 'شرح'),
    (2, 'Title 2', 'Titel 2', 'عنوان ۲', 'feature.jpg', 'Description', 'Beschreibung', 'شرح'),
    (3, 'Title 3', 'Titel 3', 'عنوان ۳', 'feature.jpg', 'Description', 'Beschreibung', 'شرح');

CREATE TABLE IF NOT EXISTS `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_en` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title_de` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title_fa` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The meta title to be used for browser title and SEO.',
  `meta_title_de` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meta_title_fa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug_de` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug_fa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The column used to store the category data.',
  `content_de` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content_fa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_en` (`slug_en`),
  UNIQUE KEY `slug_de` (`slug_de`),
  UNIQUE KEY `slug_fa` (`slug_fa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `character_service` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `coins` int unsigned DEFAULT '0',
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `character_service` (`id`, `coins`, `description`) VALUES
	(1, 50, 'Character rename'),
	(2, 60, 'Character customize'),
	(3, 100, 'Character change faction'),
	(4, 80, 'Character change race'),
	(5, 0, 'Character unstuck');

CREATE TABLE IF NOT EXISTS `coins` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `rial` float unsigned DEFAULT NULL,
  `count` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `coins` (`id`, `rial`, `count`) VALUES
	(1, 10000, 1);

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account` int unsigned NOT NULL,
  `blog_id` int unsigned NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `reply_of` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_comments_account_information` (`account`),
  KEY `idx_comments_blog` (`blog_id`),
  CONSTRAINT `FK_COMMENTS_ACCOUNT_INFORMATION` FOREIGN KEY (`account`) REFERENCES `account_information` (`id`),
  CONSTRAINT `FK_COMMENTS_BLOG` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account` int unsigned DEFAULT NULL,
  `blog_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_likes_account_information` (`account`) USING BTREE,
  KEY `fk_likes_blog` (`blog_id`) USING BTREE,
  CONSTRAINT `FK_LIKES_ACCOUNT_INFORMATION` FOREIGN KEY (`account`) REFERENCES `account_information` (`id`),
  CONSTRAINT `FK_LIKES_BLOG` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `payments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account` int unsigned DEFAULT NULL,
  `coins` int unsigned DEFAULT NULL,
  `gateway` enum('ZarinPalGateway') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verify` tinyint unsigned DEFAULT '0',
  `amount` float DEFAULT NULL,
  `authority` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ref_id` bigint DEFAULT NULL,
  `card_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_en` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title_de` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `title_fa` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meta_title_de` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meta_title_fa` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug_de` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `slug_fa` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `content_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content_de` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content_fa` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_en` (`slug_en`),
  UNIQUE KEY `slug_de` (`slug_de`),
  UNIQUE KEY `slug_fa` (`slug_fa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `votes` (
  `account` int unsigned NOT NULL,
  `comment_id` int unsigned NOT NULL,
  `vote` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `comment_id` (`comment_id`),
  KEY `idx_votes_account_information` (`account`) USING BTREE,
  KEY `idx_votes_comments` (`comment_id`) USING BTREE,
  CONSTRAINT `FK_VOTES_ACCOUNT_INFORMATION` FOREIGN KEY (`account`) REFERENCES `account_information` (`id`),
  CONSTRAINT `FK_VOTES_COMMENTS` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
