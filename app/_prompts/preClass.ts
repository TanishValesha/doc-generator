interface PromptInput {
  topic: string;
  difficulty?: string;
}

export function generatePreClassDoc({
  topic,
  difficulty,
}: PromptInput): string {
  return `Generate a comprehensive pre-class document on the topic: ${topic} with a difficulty level of: ${difficulty}

  -Actually consider the level of difficulty
  -If the difficulty is Advanced then make the lesson plan more advanced and complex (Include some advanced coding examples/problems)
  -If the difficulty is Beginner then make the lesson plan more basic and simple
  -If the difficulty is Intermediate then make the lesson plan more intermediate and balanced (Include some advanced coding examples/problems)

## Formatting Requirements
Use proper Markdown syntax throughout:
- **###** for section headings
- **Bold text** for key terms and important concepts
- _Italics_ for emphasis and definitions
- **-** for bulleted lists with proper indentation
- Standard paragraph formatting with appropriate line spacing
- Don't hesistate to include code blocks for technical content
- Code blocks if technical content is involved

## Content Structure & Requirements

### 1. Introduction (100-150 words)
- Provide context and relevance of the topic
- State learning objectives clearly
- Connect to previous coursework or industry applications

### 2. Key Concepts Section
- **Exactly 3 primary concepts** presented as bulleted lists
- Each concept should include:
  - Clear definition
  - Why it matters
  - How it connects to other concepts
- Use sub-bullets for detailed explanations

### 3. Real-World Applications (150-200 words)
- **Minimum 2 specific industry examples**
- Current trends and developments
- Case studies or practical scenarios
- Quantifiable impact where possible

### 4. Preparation Guidelines
- Recommended readings or resources
- Key questions students should consider
- Prerequisites or background knowledge needed

### 5. Summary & Next Steps (100 words)
- Synthesize main points
- Preview how this connects to upcoming class activities
- Clear call-to-action for student preparation

**Very Important add current day, date with the topic of the class at the top of the document, should be highlighted properly.**
**Also, Add code samples or blocks**

## Additional Specifications
- **Target Audience**: Final year graduate students
- **Length**: 500-800 words (approximately 1-2 pages)
- **Tone**: Professional yet accessible
- **Depth**: Advanced undergraduate to graduate level
- **Currency**: Include recent developments (within last 2-3 years)
- **Engagement**: Include thought-provoking questions or scenarios

## Quality Checklist
- [ ] All sections properly formatted with Markdown
- [ ] Content is academically rigorous yet readable
- [ ] Real-world relevance is clearly established
- [ ] Key terms are properly emphasized
- [ ] Document flows logically from concept to application
- [ ] Appropriate length and detail for pre-class preparation

**Output only the final Markdown document - no meta-commentary or explanations.**`;
}
