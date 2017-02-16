#encoding=utf-8
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Category(models.Model):
	name = models.CharField(max_length=254)

class User(models.Model):
	name = models.CharField(max_length=254)
	nickname = models.CharField(max_length=254)
	address = models.CharField(max_length=254)
	email = models.EmailField(max_length=254)
	password = models.CharField(max_length=254)
	create_time = models.DateField()
	TYPE_CHOICES = ((
		(0, u'普通用户'),
        (1, u'管理员'),
        (2, u'超级管理员'),
	))
	user_type = models.SmallIntegerField(default=TYPE_CHOICES,choices=TYPE_CHOICES)

class News(models.Model):
	author = models.ForeignKey(User,related_name='NEWS_USER')
	clicked = models.BigIntegerField(default=0)
	title = models.CharField(max_length=254)
	content = models.TextField()
	passed = models.BooleanField(default=False)
	category = models.ForeignKey(Category,related_name="CATEGORY_NEWS")

class Config(models.Model):
	link = models.CharField(max_length=254)

class Comments(models.Model):
	news = models.ForeignKey(News,related_name="COMMENTS_NEWS")
	content = models.TextField()
	user = models.ForeignKey(User,related_name="COMMENTS_USER")
	create_time = models.DateTimeField();

