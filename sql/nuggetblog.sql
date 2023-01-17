# Host: localhost  (Version: 5.7.26)
# Date: 2023-01-17 20:23:26
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "advertisement"
#

CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "advertisement"
#

INSERT INTO `advertisement` VALUES (1,'1111111','22222','3333');

#
# Structure for table "author"
#

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_count` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "author"
#

INSERT INTO `author` VALUES (1,'14','111','111223123','test'),(2,'10','10101','testing','AAA'),(3,'8','1111','222TESTING','bbb'),(4,'50','TESTING','bbb','cccc');

#
# Structure for table "articleslist"
#

CREATE TABLE `articleslist` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `comment_count` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `like_count` varchar(255) NOT NULL DEFAULT '18',
  `time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `view_count` varchar(255) NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cc1b60f8db06f60a184172df486` (`authorId`),
  CONSTRAINT `FK_cc1b60f8db06f60a184172df486` FOREIGN KEY (`authorId`) REFERENCES `author` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "articleslist"
#

INSERT INTO `articleslist` VALUES ('1','44','testingtestingtestingtestingtestingtestingtesting','1123','前端','18','2023-01-14 19:51:21','44','67',1),('2','23','测试测试测试测试测试测试测试测试测试测试','111','后端','18','2023-01-11 19:51:21','55','70',1);

#
# Structure for table "category"
#

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "category"
#

INSERT INTO `category` VALUES (1,'前端'),(2,'后端'),(3,'IOS');

#
# Structure for table "label"
#

CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c65430b21d7e973ab302b484e28` (`categoryId`),
  CONSTRAINT `FK_c65430b21d7e973ab302b484e28` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "label"
#

INSERT INTO `label` VALUES (1,'react',1),(2,'vue',1),(3,'angular',1),(4,'springCloud',2),(5,'java',2),(6,'移动端ios开发',3);
