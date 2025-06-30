jest.setTimeout(20000);
const { buildPrompt } = require('./ai');

describe('buildPrompt', () => {
  it('should build a prompt string containing user answers', () => {
    const userAnswers = { Q1: 'Answer 1', Q2: 'Answer 2' };
    const prompt = buildPrompt(userAnswers);
    expect(prompt).toContain('Q1: Answer 1');
    expect(prompt).toContain('Q2: Answer 2');
    expect(prompt).toContain('You are an AI career counselor');
    expect(prompt).toContain('IMPORTANT: Provide ONLY the JSON array');
  });
}); 