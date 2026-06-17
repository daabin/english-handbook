export interface Expression {
  id: string
  chapter: string
  expression: string
  literalTranslation: string
  naturalMeaning: string
  example: string
  exampleTranslation: string
  tags: string[]
  frequency: number
}

export interface Chapter {
  id: string
  bookId: string
  title: string
  description: string
  count: number
}

export interface Book {
  id: string
  title: string
  description: string
  chapters: Chapter[]
}
