# Host: localhost  (Version: 5.7.26)
# Date: 2023-01-19 00:41:48
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
  `avatar` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `article_count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "author"
#

INSERT INTO `author` VALUES (1,'111','111223123','test',0),(2,'10101','testing','AAA',0),(3,'1111','222TESTING','bbb',0),(4,'TESTING','bbb','cccc',0);

#
# Structure for table "articleslist"
#

CREATE TABLE `articleslist` (
  `id` varchar(36) NOT NULL,
  `comment_count` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `like_count` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `view_count` int(11) NOT NULL,
  `sub_tabs` varchar(255) NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cc1b60f8db06f60a184172df486` (`authorId`),
  CONSTRAINT `FK_cc1b60f8db06f60a184172df486` FOREIGN KEY (`authorId`) REFERENCES `author` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "articleslist"
#


#
# Structure for table "category"
#

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "label"
#

INSERT INTO `label` VALUES (1,'react',1),(2,'vue',1),(3,'angular',1),(4,'springCloud',2),(5,'java',2),(6,'移动端ios开发',3);

#
# Structure for table "router_list"
#

CREATE TABLE `router_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Data for table "router_list"
#

INSERT INTO `router_list` VALUES (1,'/','首页',''),(2,'/pins','沸点',''),(3,'/course','课程',''),(4,'/live','直播',''),(5,'/events','活动',''),(6,'/challenge','竞赛','码上掘金'),(7,'/mall','商城',''),(8,'/app','APP','邀请有礼');

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'admin','admin','1899-12-29 00:00:00'),(2,'zc627788','123123','2023-01-19 00:17:21');
