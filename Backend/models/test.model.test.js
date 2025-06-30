require('dotenv').config();
jest.setTimeout(20000);
const mongoose = require('mongoose');
const Test = require('./test.model');

describe('Test Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a Test document successfully', async () => {
    const testData = {
      userId: new mongoose.Types.ObjectId(),
      testName: 'Sample Test',
      score: 85
    };
    const testDoc = new Test(testData);
    const savedDoc = await testDoc.save();
    expect(savedDoc._id).toBeDefined();
    expect(savedDoc.testName).toBe('Sample Test');
    expect(savedDoc.score).toBe(85);
    expect(savedDoc.dateTaken).toBeInstanceOf(Date);
  });

  it('should fail to create a Test document without required fields', async () => {
    const testDoc = new Test({});
    let err;
    try {
      await testDoc.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.userId).toBeDefined();
    expect(err.errors.testName).toBeDefined();
    expect(err.errors.score).toBeDefined();
  });
}); 