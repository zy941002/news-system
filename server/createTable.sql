CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL DEFAULT '' COMMENT '姓名',
  `nickName` varchar(255) DEFAULT NULL COMMENT '昵称',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) DEFAULT NULL COMMENT '用户名',
  `cateID` int(11) DEFAULT NULL COMMENT '分类Id',
  `createTime` datetime DEFAULT NULL COMMENT '发布时间',
  `type` smallint(2) NOT NULL COMMENT '0:读者,1:作者2:管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL COMMENT '作者',
  `clicked` int(11) DEFAULT NULL COMMENT '点击率',
  `title` varchar(1024) DEFAULT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `pass` tinyint(1) DEFAULT NULL COMMENT '审核通过,0:拒绝;1通过',
  `cateId` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cateId` (`cateId`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`cateId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `link` char(255) DEFAULT NULL COMMENT '友情链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `newsid` int(11) unsigned DEFAULT NULL,
  `content` text,
  `userid` int(11) unsigned DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `newsid` (`newsid`),
  KEY `userid` (`userid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`newsid`) REFERENCES `news` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table user type ENUM not null;