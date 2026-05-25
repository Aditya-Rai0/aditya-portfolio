import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import dotenv from 'dotenv';
import User from './models/User.js'; // ESM mein .js lagana zaroori hota hai

dotenv.config();

const createAdmin = async () => {
  try {
    // Database se connect karo
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected...');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // Check karo ki user pehle se toh nahi hai
    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin already exists! Try logging in.');
      process.exit();
    }

    // Password ko hash (encrypt) karo
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user database mein save karo
    user = new User({
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('Success! Admin user created in database. You can now login.');
    process.exit();

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();