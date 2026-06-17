import type { Book } from './types'

export const books: Book[] = [
  {
    id: 'book-1',
    title: 'Core Spoken English',
    description: '核心口语 · 日常交流必备的高频词块、句型和表达',
    chapters: [
      { id: 'ch01', bookId: 'book-1', title: '300 High Frequency Chunks', description: '300个最高频口语词块', count: 300 },
      { id: 'ch02', bookId: 'book-1', title: '150 Universal Sentence Patterns', description: '150个万能句型', count: 150 },
      { id: 'ch03', bookId: 'book-1', title: '300 Daily Expressions', description: '300个日常表达', count: 300 },
    ],
  },
  {
    id: 'book-2',
    title: 'American Workplace English',
    description: '职场英语 · 美国互联网公司职场沟通',
    chapters: [
      { id: 'ch04', bookId: 'book-2', title: 'Meeting English', description: '会议英语', count: 80 },
      { id: 'ch05', bookId: 'book-2', title: 'Collaboration English', description: '协作英语', count: 80 },
      { id: 'ch06', bookId: 'book-2', title: 'Feedback English', description: '反馈英语', count: 70 },
      { id: 'ch07', bookId: 'book-2', title: 'Leadership English', description: '领导力英语', count: 70 },
    ],
  },
  {
    id: 'book-3',
    title: 'Software Engineer English',
    description: '软件工程英语 · 程序员高频场景',
    chapters: [
      { id: 'ch08', bookId: 'book-3', title: 'Requirement Review', description: '需求评审', count: 75 },
      { id: 'ch09', bookId: 'book-3', title: 'Technical Design', description: '技术设计', count: 75 },
      { id: 'ch10', bookId: 'book-3', title: 'Architecture Review', description: '架构评审', count: 75 },
      { id: 'ch11', bookId: 'book-3', title: 'Code Review', description: '代码审查', count: 75 },
      { id: 'ch12', bookId: 'book-3', title: 'Incident Response', description: '故障响应', count: 75 },
      { id: 'ch13', bookId: 'book-3', title: 'Project Management', description: '项目管理', count: 75 },
    ],
  },
  {
    id: 'book-4',
    title: 'Tech Lead English',
    description: '技术负责人英语 · 管理与沟通',
    chapters: [
      { id: 'ch14', bookId: 'book-4', title: 'Team Management', description: '团队管理', count: 75 },
      { id: 'ch15', bookId: 'book-4', title: 'Stakeholder Management', description: '利益相关者管理', count: 75 },
      { id: 'ch16', bookId: 'book-4', title: 'Engineering Leadership', description: '工程领导力', count: 75 },
    ],
  },
  {
    id: 'book-5',
    title: 'AI & Startup English',
    description: 'AI 与创业英语',
    chapters: [
      { id: 'ch17', bookId: 'book-5', title: 'AI Native English', description: 'AI 原生英语', count: 75 },
      { id: 'ch18', bookId: 'book-5', title: 'Agent Engineering English', description: 'Agent 工程英语', count: 75 },
      { id: 'ch19', bookId: 'book-5', title: 'Startup English', description: '创业英语', count: 75 },
    ],
  },
  {
    id: 'book-6',
    title: 'Investment English',
    description: '投资英语 · 行业分析与投资讨论',
    chapters: [
      { id: 'ch20', bookId: 'book-6', title: 'Industry Analysis', description: '行业分析', count: 75 },
      { id: 'ch21', bookId: 'book-6', title: 'Investment Discussion', description: '投资讨论', count: 75 },
      { id: 'ch22', bookId: 'book-6', title: 'Due Diligence', description: '尽职调查', count: 75 },
    ],
  },
]

import { chapterExpressions } from './chapters'
export { chapterExpressions }
export function getChapterData(chapterId: string) {
  return chapterExpressions[chapterId] || []
}
