
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '姓名',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `createTime` datetime DEFAULT NULL COMMENT '发布时间',
  `type` tinyint(2) DEFAULT NULL COMMENT '0:普通用户,1:作者2:管理员',
  `file` varchar(1024) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8;

CREATE TABLE `file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `fieldName` varchar(255) DEFAULT NULL,
  `originalFilename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;

CREATE TABLE `config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '0:图片1链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `newsid` int(11) unsigned DEFAULT NULL,
  `content` text,
  `userid` int(11) unsigned DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_user` (`userid`),
  KEY `comments_news` (`newsid`),
  CONSTRAINT `comments_news` FOREIGN KEY (`newsid`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_user` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

CREATE TABLE `news_cate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `news_id` int(11) unsigned DEFAULT NULL,
  `cate_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_cate_news` (`news_id`),
  KEY `news_cate_cate` (`cate_id`),
  CONSTRAINT `news_cate_cate` FOREIGN KEY (`cate_id`) REFERENCES `category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `news_cate_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `author_id` int(11) unsigned NOT NULL COMMENT '作者_id',
  `clicked` int(11) DEFAULT NULL COMMENT '点击率',
  `title` varchar(1024) DEFAULT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `timeflag` date DEFAULT NULL,
  `pass` tinyint(1) DEFAULT NULL COMMENT '审核通过,0:拒绝;1通过',
  `top` tinyint(1) DEFAULT NULL COMMENT '0不置顶;1置顶',
  PRIMARY KEY (`id`),
  KEY `news_user` (`author_id`),
  CONSTRAINT `news_user` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;