interface PromptInput {
  topic: string;
  difficulty?: string;
}

export function generateInClassDoc({ topic, difficulty }: PromptInput): string {
  return `Generate a comprehensive in-class lesson plan on the topic: ${topic}
  with a difficulty level of: ${difficulty}

  -Actually consider the level of difficulty
  -If the difficulty is Advanced then make the lesson plan more advanced and complex (Include some advanced coding examples/problems)
  -If the difficulty is Beginner then make the lesson plan more basic and simple
  -If the difficulty is Intermediate then make the lesson plan more intermediate and balanced (Include some advanced coding examples/problems)


## Formatting Requirements
Use proper Markdown syntax throughout:
- **###** for section headings and time blocks
- **Bold text** for key terms, activities, and instructor cues
- _Italics_ for emphasis and teaching notes
- **-** for bulleted lists with proper indentation
- Standard paragraph formatting with appropriate line spacing
- Don't hesistate to include code blocks for technical content
- Code blocks if technical content is involved
- **[TIME]** markers for session timing

## Content Structure & Requirements

### 1. Session Overview (5 minutes)
- **Learning Objectives** (3-4 specific, measurable outcomes)
- **Session Agenda** with time allocations
- **Materials Needed** (slides, handouts, tech requirements)
- **Pre-requisites Check** - quick review of assumed knowledge

### 2. Opening Hook (5-8 minutes)
- **Attention Grabber**: Current event, provocative question, or surprising statistic
- **Relevance Statement**: Why this matters now and for their careers
- **Connection to Previous Learning**: Bridge from last session
- _Teaching Note: Gauge student energy and adjust accordingly_

### 3. Core Content Delivery (35-40 minutes)
Structure as **3-4 distinct segments** with:

#### Segment 1: [Concept Name] (10-12 minutes)
- **Key Points** to cover (bulleted list)
- **Examples/Case Studies** with specific details
- **Interactive Element**: Poll, quick discussion, or demonstration
- **Check for Understanding**: Specific questions to ask
- _Transition: How to move to next segment_

#### Segment 2: [Concept Name] (10-12 minutes)
- **Key Points** to cover (bulleted list)
- **Examples/Case Studies** with specific details
- **Interactive Element**: Group work, problem-solving, or analysis
- **Check for Understanding**: Specific questions to ask
- _Transition: How to move to next segment_

#### Segment 3: [Concept Name] (10-12 minutes)
- **Key Points** to cover (bulleted list)
- **Examples/Case Studies** with specific details
- **Interactive Element**: Application exercise or debate
- **Check for Understanding**: Specific questions to ask

### 4. Active Learning Activities (8-12 minutes)
- **Primary Activity**: Detailed description of main engagement
 - Instructions for students
 - Expected outcomes
 - Facilitation tips
- **Backup Activity**: Alternative if primary runs short/long
- **Debrief Strategy**: How to capture and discuss insights

### 5. Integration & Synthesis (5-8 minutes)
- **Key Takeaways Summary**: 3-4 main points to emphasize
- **Real-World Applications**: Immediate professional relevance
- **Q&A Management**: Strategy for handling questions
- **Bridge to Future**: Connect to upcoming sessions

### 6. Closing & Next Steps (2-3 minutes)
- **Session Wrap-up**: Clear ending statement
- **Assignments/Preparation**: Specific tasks for next class
- **Resources**: Additional materials for deeper learning
- **Preview**: Teaser for next session

## Teaching Support Elements

### Discussion Prompts
- **3-5 prepared questions** for generating class discussion
- **Follow-up probes** for deeper exploration
- **Handling difficult questions** strategies

### Reference links for teaching purposes
- **Multiple references** for teaching resources at the end of the document

### Timing Management
- **Checkpoint markers** at 15, 30, and 45 minutes
- **Content prioritization**: What to cut if running behind
- **Extension activities**: What to add if running ahead

### Engagement Strategies
- **Participation techniques** for different learning styles
- **Energy management**: When to shift pace or activity
- **Inclusive practices**: Ensuring all students can contribute

## Additional Specifications
- **Target Audience**: Final year graduate students
- **Session Length**: 60 minutes (50 minutes content + 10 minutes buffer)
- **Class Size**: 20-30 students
- **Teaching Style**: Interactive lecture with active learning
- **Technology**: Assume standard classroom with projector/screen
- **Assessment Integration**: Formative assessment throughout

**Very Important add current day, date with the topic of the class at the top of the document, should be highlighted properly.**
**Also, Add code samples or blocks**

## Quality Checklist
- [ ] Clear timing for each segment with realistic allocations
- [ ] Multiple engagement strategies throughout session
- [ ] Specific examples and case studies included
- [ ] Transition statements between segments
- [ ] Backup plans for timing variations
- [ ] Assessment of learning integrated naturally
- [ ] Professional development connections explicit
- [ ] Instructor cues and teaching notes included

**Output only the final Markdown document - no meta-commentary or explanations.**`;
}
