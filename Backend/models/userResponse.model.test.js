require('dotenv').config();
jest.setTimeout(20000);
const mongoose = require('mongoose');
const UserResponse = require('./userResponse.model');

describe('UserResponse Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a UserResponse document successfully', async () => {
    const responseData = {
      userId: new mongoose.Types.ObjectId(),
      responses: [
        { questionId: new mongoose.Types.ObjectId(), answer: '42' }
      ]
    };
    const responseDoc = new UserResponse(responseData);
    const savedDoc = await responseDoc.save();
    expect(savedDoc._id).toBeDefined();
    expect(savedDoc.userId).toBeDefined();
    expect(savedDoc.responses.length).toBe(1);
    expect(savedDoc.responses[0].answer).toBe('42');
    expect(savedDoc.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a UserResponse document without required fields', async () => {
    const responseDoc = new UserResponse({});
    let err;
    try {
      await responseDoc.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.userId).toBeDefined();
  });
}); 