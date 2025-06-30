require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./user.model');

jest.setTimeout(20000);

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a User document successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const userDoc = new User(userData);
    const savedDoc = await userDoc.save();
    expect(savedDoc._id).toBeDefined();
    expect(savedDoc.name).toBe('John Doe');
    expect(savedDoc.email).toBe('john@example.com');
    expect(savedDoc.role).toBe('user');
    expect(savedDoc.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a User document without required fields', async () => {
    const userDoc = new User({});
    let err;
    try {
      await userDoc.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });
}); 