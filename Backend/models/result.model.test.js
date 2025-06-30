require('dotenv').config();
jest.setTimeout(20000);
const mongoose = require('mongoose');
const Result = require('./result.model');

describe('Result Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a Result document successfully', async () => {
    const resultData = {
      userId: new mongoose.Types.ObjectId(),
      careerTitle: 'Engineer',
      description: 'Builds things',
      education_requirements: 'B.Tech',
      best_companies: ['Google', 'Microsoft'],
      career_paths: ['Software Engineer'],
      required_skills: ['Coding'],
      job_outlook: ['Good']
    };
    const resultDoc = new Result(resultData);
    const savedDoc = await resultDoc.save();
    expect(savedDoc._id).toBeDefined();
    expect(savedDoc.careerTitle).toBe('Engineer');
    expect(savedDoc.best_companies).toContain('Google');
    expect(savedDoc.career_paths).toContain('Software Engineer');
    expect(savedDoc.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a Result document without required fields', async () => {
    const resultDoc = new Result({});
    let err;
    try {
      await resultDoc.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.userId).toBeDefined();
    expect(err.errors.careerTitle).toBeDefined();
    expect(err.errors.description).toBeDefined();
    expect(err.errors.education_requirements).toBeDefined();
  });
}); 