export const meta = {
  name: 'generate-english-content',
  description: 'Generate 2000+ authentic American English expressions across 22 chapters',
  phases: [
    { title: 'Generation', detail: '1 agent per chapter generates & writes JSON files' },
  ],
}

const CHAPTERS = [
  // Book 1: Core Spoken English
  { id: 'ch01', count: 300, theme: '300 High Frequency Chunks - multi-word expressions like "get things done", "figure out", "on the same page"', book: 1, scenes: 'Productivity (getting things done, making progress), Communication (checking in, following up), Agreement & Understanding (being on same page), Problems & Solutions (running into issues, figuring out), Decisions & Trade-offs, Work Rhythm & Deadlines, Effort & Quality, Social & Small Talk, Meetings & Collaboration, Success & Failure' },
  { id: 'ch02', count: 150, theme: '150 Universal Sentence Patterns - sentence templates like "I was wondering if...", "What if we..."', book: 1, scenes: 'Asking Questions Politely, Making Suggestions, Agreeing & Disagreeing, Clarifying & Rephrasing, Checking Understanding, Giving Opinions, Making Requests, Expressing Uncertainty, Wrapping Up, Hypotheticals, Comparisons, Preferences' },
  { id: 'ch03', count: 300, theme: '300 Daily Expressions - everyday life phrases', book: 1, scenes: 'Greetings & Small Talk, Dining Out & Food, Shopping & Prices, Travel & Directions, Making Plans, Phone & Texting, Emotions & Reactions, Health & Wellness, Weather, Technology & Gadgets, Home & Family, Money, Time & Scheduling, Emergencies' },

  // Book 2: Workplace English
  { id: 'ch04', count: 80, theme: 'Meeting English', book: 2, scenes: 'Scheduling, Opening meetings, Agenda, Presenting data, Asking for input, Disagreeing politely, Decisions & alignment, Action items, Closing & recap' },
  { id: 'ch05', count: 80, theme: 'Collaboration English', book: 2, scenes: 'Pair programming, Async updates, Asking for help, Giving help, PR reviews, Deadlines & ETA, Scope discussions, Blockers, Handoffs, Cross-team sync' },
  { id: 'ch06', count: 70, theme: 'Feedback English', book: 2, scenes: 'Giving constructive feedback, Receiving feedback, Positive reinforcement, Performance reviews, Peer feedback, 360 feedback, Delivering tough news, Growth areas' },
  { id: 'ch07', count: 70, theme: 'Leadership English', book: 2, scenes: 'Setting direction, Motivating the team, Delegating, Conflict resolution, Making decisions, Transparency, Team building, 1-on-1s, Growth & development' },

  // Book 3: Software Engineer English
  { id: 'ch08', count: 75, theme: 'Requirement Review', book: 3, scenes: 'Clarifying requirements, Questioning scope, Edge cases, Dependencies, Trade-offs, Asking questions, Documenting decisions, Sign-off, Acceptance criteria, Success metrics' },
  { id: 'ch09', count: 75, theme: 'Technical Design', book: 3, scenes: 'Proposing solutions, Data flow, API contracts, Database schema, Services & dependencies, Alternatives, Trade-off analysis, Getting buy-in, Design review' },
  { id: 'ch10', count: 75, theme: 'Architecture Review', book: 3, scenes: 'High-level design, Scaling, Fault tolerance, Security, Monitoring, Performance, Consistency, Review feedback, System diagrams, Tech stack decisions' },
  { id: 'ch11', count: 75, theme: 'Code Review', book: 3, scenes: 'Reviewing code, Suggesting changes, Asking questions, Explaining approach, Edge cases & bugs, Style & conventions, Performance, Approving, Naming & readability' },
  { id: 'ch12', count: 75, theme: 'Incident Response', book: 3, scenes: 'Detecting issues, Alerting & paging, Triaging, Debugging under pressure, Communicating status, Mitigation & rollback, Postmortem, Follow-ups, RCA' },
  { id: 'ch13', count: 75, theme: 'Project Management', book: 3, scenes: 'Sprint planning, Standups, Estimation, Tracking progress, Scope changes, Stakeholder updates, Retrospectives, Shipping, Risk management' },

  // Book 4: Tech Lead English
  { id: 'ch14', count: 75, theme: 'Team Management', book: 4, scenes: '1-on-1s, Career growth conversations, Workload management, Feedback, Team culture, Hiring, Onboarding, Promotions, Performance management' },
  { id: 'ch15', count: 75, theme: 'Stakeholder Management', book: 4, scenes: 'Status updates, Managing expectations, Saying no, Getting buy-in, Difficult conversations, Presenting to execs, Trade-offs, Building relationships, Influencing' },
  { id: 'ch16', count: 75, theme: 'Engineering Leadership', book: 4, scenes: 'Technical vision, Influencing without authority, Mentoring, Cross-team collaboration, Driving change, Architecture decisions, Technical debt, Innovation, Coaching' },

  // Book 5: AI & Startup English
  { id: 'ch17', count: 75, theme: 'AI Native English', book: 5, scenes: 'LLMs & models, Prompting, RAG, Agents, Fine-tuning, Evaluation, Deployment, Inference cost, Hallucination, Context window, Benchmarks' },
  { id: 'ch18', count: 75, theme: 'Agent Engineering English', book: 5, scenes: 'Agent design, Tools & functions, Memory, Multi-agent, Reliability, Safety & guardrails, Observability, Evaluation, Orchestration, Loops' },
  { id: 'ch19', count: 75, theme: 'Startup English', book: 5, scenes: 'Fundraising, Pitching, PMF, Growth metrics, Hiring, MVP, Customer conversations, Metrics & KPIs, Unit economics, Runway' },

  // Book 6: Investment English
  { id: 'ch20', count: 75, theme: 'Industry Analysis', book: 6, scenes: 'Market sizing, Competitive landscape, Trends, Risks, Opportunities, Business models, Technology analysis, Outlook & thesis' },
  { id: 'ch21', count: 75, theme: 'Investment Discussion', book: 6, scenes: 'Evaluating deals, Term sheets, Due diligence questions, Portfolio strategy, Founder assessment, Deal flow, Syndication, Exit strategy, Valuation' },
  { id: 'ch22', count: 75, theme: 'Due Diligence', book: 6, scenes: 'Financial DD, Technical DD, Legal DD, Market DD, Team DD, Operational DD, Risk assessment, Final recommendation, Data room' },
]

function genPrompt(ch) {
  return `Generate EXACTLY ${ch.count} authentic American English expressions for: ${ch.theme}

This is CHAPTER ${ch.id} of a handbook for Chinese tech professionals learning real American English.

## Scenes to cover (spread expressions evenly):
${ch.scenes}

## CRITICAL RULES (MUST FOLLOW):
1. Every expression MUST be something a real American native speaker would genuinely say
2. NO textbook English, NO IELTS/TOEFL vocabulary, NO AI-generated sounding phrases
3. NO "How are you? I'm fine, thank you" type expressions — these are NOT real American speech
4. Literal Translation should be word-for-word Chinese
5. Natural Meaning should explain the actual conversational meaning in Chinese
6. Example must be a natural sentence a real American would say in context
7. Tags: choose from ["daily", "workplace", "high-frequency", "software-engineering", "meetings", "leadership", "technical", "casual", "formal", "ai", "startup", "investment"] as appropriate — add 2-4 tags per expression
8. Frequency: 1-5 (5 = extremely common, American says this daily)
9. ID format: "${ch.id}-XXX" where XXX is 3-digit zero-padded sequential

## Output format:
IMPORTANT: Use the Write tool to save ALL generated expressions as a JSON array to the file:
src/data/generated/${ch.id}.json

The JSON should be a valid array of objects like:
[
  {
    "id": "${ch.id}-001",
    "chapter": "${ch.id}",
    "expression": "get things done",
    "literalTranslation": "把事情完成",
    "naturalMeaning": "推动事情落地，把事情办成（强调执行力）",
    "example": "He's really good at getting things done.",
    "exampleTranslation": "他特别擅长推进事情落地。",
    "tags": ["daily", "workplace", "high-frequency"],
    "frequency": 5
  }
]

Make sure to:
- First create the directory: mkdir -p src/data/generated
- Then Write the complete JSON file
- Generate EXACTLY ${ch.count} expressions
- Each must pass the "native speaker test" — would an American genuinely say this?
- Prioritize frequency and naturalness over cleverness`
}

phase('Generation')
const results = await pipeline(
  CHAPTERS,
  async (ch) => {
    log(`Starting ${ch.id}: ${ch.count} expressions`)
    const text = await agent(genPrompt(ch), {
      label: `${ch.id}-gen`,
    })
    return { id: ch.id, count: ch.count }
  }
)

const total = results.filter(Boolean).length
log(`=== GENERATION COMPLETE ===`)
log(`Generated content for ${total}/${CHAPTERS.length} chapters`)
