# American Tech English Handbook

## Project Overview

构建一个面向中国程序员和技术管理者的英语学习网站。

目标用户：

* CET4~CET6 水平
* 阅读能力较好
* 口语表达较弱
* 希望提升真实英语沟通能力
* 希望参与国际技术会议、海外协作、英文面试
* 技术负责人 / Team Lead / Engineering Manager
* AI、软件工程、新能源、产业投资从业者

---

# Core Philosophy

本项目不是：

* 雅思教材
* TOEFL教材
* 语法书
* 单词书

而是：

> American Real Spoken English

聚焦：

* 美国成年人日常口语
* 美国互联网公司职场英语
* 美国程序员真实表达

---

# Learning Goals

学习完成后应具备：

## Daily Life

能够完成：

* 自我介绍
* 家庭交流
* 社交聊天
* 购物
* 餐厅
* 旅行

覆盖美国人90%以上日常交流场景。

---

## Workplace

能够完成：

* 英文会议
* 项目同步
* 需求讨论
* 风险沟通
* 跨团队协作

覆盖美国职场90%以上场景。

---

## Software Engineering

能够完成：

* Requirement Review
* Technical Design
* Architecture Review
* Code Review
* Incident Response
* Project Management

覆盖程序员90%以上场景。

---

## Leadership

能够完成：

* Team Management
* Stakeholder Management
* Leadership Communication

覆盖技术负责人90%以上场景。

---

# Content Architecture

## Book 1

Core Spoken English

### Chapter 1

300 High Frequency Chunks

### Chapter 2

150 Universal Sentence Patterns

### Chapter 3

300 Daily Expressions

---

## Book 2

American Workplace English

### Chapter 4

Meeting English

### Chapter 5

Collaboration English

### Chapter 6

Feedback English

### Chapter 7

Leadership English

---

## Book 3

Software Engineer English

### Chapter 8

Requirement Review

### Chapter 9

Technical Design

### Chapter 10

Architecture Review

### Chapter 11

Code Review

### Chapter 12

Incident Response

### Chapter 13

Project Management

---

## Book 4

Tech Lead English

### Chapter 14

Team Management

### Chapter 15

Stakeholder Management

### Chapter 16

Engineering Leadership

---

## Book 5

AI & Startup English

### Chapter 17

AI Native English

### Chapter 18

Agent Engineering English

### Chapter 19

Startup English

---

## Book 6

Investment English

### Chapter 20

Industry Analysis

### Chapter 21

Investment Discussion

### Chapter 22

Due Diligence

---

# Content Requirements

所有内容必须使用：

## Structure

### Expression

英文表达

### Literal Translation

中文直译

### Natural Meaning

中文真实含义

### Example

英文例句

### Example Translation

中文翻译

---

# Example

Expression:

get things done

Literal Translation:

把事情完成

Natural Meaning:

推动事情落地，把事情办成

Example:

He's really good at getting things done.

Translation:

他特别擅长推进事情落地。

---

# Content Quality Rules

禁止：

* AI生成腔
* 生硬翻译
* 教材英语
* 雅思英语
* 冷门表达

优先：

* 美国人口语高频表达
* 美国互联网公司表达
* 美国程序员表达

---

# UI Requirements

## Home Page

展示：

* 学习进度
* 最近学习
* 收藏表达
* 每日推荐

---

## Navigation

左侧导航：

Book
Chapter

树状结构

---

## Search

支持：

* 英文搜索
* 中文搜索
* 模糊搜索

---

## Expression Card

卡片展示：

Expression

Meaning

Example

Translation

---

## Learning Mode

支持：

### Normal Mode

正常浏览

### Flash Card Mode

抽认卡

点击翻转

---

### Quiz Mode

看中文说英文

看英文说中文

---

## Favorites

收藏表达

本地存储

---

## Review

间隔复习

本地实现

---

# Technical Stack

Frontend:

* React
* TypeScript
* Vite

UI:

* Radix UI
* TailwindCSS

State:

* Zustand

Search:

* Fuse.js

Data:

* JSON

Deployment:

* GitHub Pages

---

# Data Model

```ts
type Expression = {
  id: string
  chapter: string

  expression: string

  literalTranslation: string

  naturalMeaning: string

  example: string

  exampleTranslation: string

  tags: string[]
}
```

---

# Expected Scale

Chapter 1

300 Chunks

Chapter 2

150 Patterns

Chapter 3

300 Daily Expressions

Chapter 4-22

1500+ Expressions

Total:

2000+ High Frequency Real Expressions

覆盖：

* 日常交流
* 职场沟通
* 软件工程
* AI
* 管理
* 投资

90%以上真实场景。
