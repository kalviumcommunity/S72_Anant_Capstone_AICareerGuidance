const mongoose = require('mongoose');
const Question = require('./question.model');
require('dotenv').config();
jest.setTimeout(20000);

describe('Question Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a Question document successfully', async () => {
    const questionData = {
      text: 'What is your favorite subject?',
      type: 'mcq',
      options: ['Math', 'Science'],
      category: 'Education'
    };
    const questionDoc = new Question(questionData);
    const savedDoc = await questionDoc.save();
    expect(savedDoc._id).toBeDefined();
    expect(savedDoc.text).toBe('What is your favorite subject?');
    expect(savedDoc.type).toBe('mcq');
    expect(savedDoc.options).toContain('Math');
    expect(savedDoc.category).toBe('Education');
  });

  it('should fail to create a Question document without required fields', async () => {
    const questionDoc = new Question({});
    let err;
    try {
      await questionDoc.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.text).toBeDefined();
    expect(err.errors.category).toBeDefined();
  });
}); 