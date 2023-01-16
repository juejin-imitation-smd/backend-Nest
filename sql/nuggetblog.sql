# Host: localhost  (Version: 5.7.26)
# Date: 2023-01-16 18:48:55
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "articleslist"
#

CREATE TABLE `articleslist` (
  `id` varchar(36) NOT NULL,
  `comment_count` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `like_count` varchar(255) NOT NULL DEFAULT '18',
  `time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `view_count` varchar(255) NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "articleslist"
#

INSERT INTO `articleslist` VALUES ('0','12','okokokok',NULL,'前端','40','2022-01-14 19:51:21','设计','200',1),('1','33','testingtestingtestingtestingtestingtestingtesting',NULL,'后端','18','2023-01-14 19:51:21','测试文本','120',1);

#
# Structure for table "author"
#

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_count` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `articlesListsId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "author"
#

INSERT INTO `author` VALUES (1,'14','111','111223123','test','1');
