interface PromptInput {
  topic: string;
  difficulty?: string;
}
export function generatePostClassDoc({
  topic,
  difficulty,
}: PromptInput): string {
  return `Generate a comprehensive post-class document on the topic: ${topic} with a difficulty level of: ${difficulty}

  -Actually consider the level of difficulty
  -If the difficulty is Hard then make the lesson plan more advanced and complex (Include some advanced coding examples/problems)
  -If the difficulty is Easy then make the lesson plan more basic and simple
  -If the difficulty is Medium then make the lesson plan more intermediate and balanced (Include some advanced coding examples/problems)

## Formatting Requirements
Use proper Markdown syntax throughout:
- **###** for section headings
- **Bold text** for key terms and important concepts
- _Italics_ for emphasis and definitions
- **-** for bulleted lists with proper indentation
- Standard paragraph formatting with appropriate line spacing
- Don't hesistate to include code blocks for technical content
- Code blocks if technical content is involved
- Numbered lists for quiz questions

## Content Structure & Requirements

### 1. Session Summary (150-200 words)
- Recap the main topics covered in class
- Highlight key insights and breakthroughs from discussions
- Connect theoretical concepts to practical applications discussed
- Reference any case studies or examples used during the session

### 3. Knowledge Assessment Quiz (6-10 questions)
- **Mix of question types**:
 - Multiple choice (2-3 questions)
 - Short answer (2-3 questions)
 - Application/scenario-based (2-3 questions)
 - Critical thinking/analysis (1-2 questions)
- Questions should test different cognitive levels:
 - Knowledge recall
 - Conceptual understanding
 - Application and analysis
- Include **answer key** at the end with brief explanations

### 4. Reinforcement Activities
- **2-3 practical exercises** to deepen understanding
- Self-reflection questions for personal application
- Suggested discussion points for peer interaction
- Links to current industry developments or research

### 5. Looking Forward (100-150 words)
- Connect today's learning to upcoming topics
- Identify areas for further exploration
- Suggest preparatory actions for next session
- Highlight long-term professional relevance

**Very Important add current day, date with the topic of the class at the top of the document, should be highlighted properly.**
**Also, Add code samples or blocks**

## Additional Specifications
- **Target Audience**: Final year graduate students
- **Length**: 600-900 words (approximately 2-3 pages)
- **Tone**: Reflective yet forward-looking
- **Assessment Focus**: Both comprehension and application
- **Integration**: Clear connections between theory and practice
- **Actionability**: Concrete steps for continued learning

## Quality Checklist
- [ ] All sections properly formatted with Markdown
- [ ] Quiz questions are varied and appropriately challenging
- [ ] Answer key provides clear, concise explanations
- [ ] Content reinforces session learning objectives
- [ ] Activities promote active engagement with material
- [ ] Document serves as effective study reference
- [ ] Professional development connections are explicit

**Output only the final Markdown document - no meta-commentary or explanations.**`;
}
