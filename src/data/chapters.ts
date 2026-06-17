import type { Expression } from './types'

// Import generated JSON files as raw strings to avoid Vite JSON plugin issues
const rawModules: Record<string, string> = import.meta.glob('./generated/*.json', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const chapterExpressions: Record<string, Expression[]> = {}

for (const [path, raw] of Object.entries(rawModules)) {
  const match = path.match(/ch(\d+)/)
  if (match) {
    try {
      const data = JSON.parse(raw as string)
      if (Array.isArray(data)) {
        chapterExpressions[`ch${match[1]}`] = data
      }
    } catch (e) {
      console.warn(`Failed to parse ${path}:`, e)
    }
  }
}

// Sample data (only used if no generated files exist - e.g. fresh clone without content)
if (Object.keys(chapterExpressions).length === 0) {
  chapterExpressions['ch01'] = [
    {
      id: 'ch01-001',
      chapter: 'ch01',
      expression: 'get things done',
      literalTranslation: '把事情完成',
      naturalMeaning: '推动事情落地，把事情办成',
      example: "He's really good at getting things done.",
      exampleTranslation: '他特别擅长推进事情落地。',
      tags: ['daily', 'workplace', 'high-frequency'],
      frequency: 5,
    },
  ]
}

export function getTotalExpressionCount(): number {
  return Object.values(chapterExpressions).reduce((sum, arr) => sum + arr.length, 0)
}
