const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');

dotenv.config({ path: './config.env' });
const Router = require('./routes/route-config');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api', Router);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!!');
    eval(fs.readFileSync('schedule/AWS_scheduleTasks.js') + '');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
    await sleep(10000);
    await connectDB();
  }
};

app.listen(port, async () => {
  console.log(`App running on port ${port}...`);
  try {
    await connectDB();
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Perform any necessary cleanup here
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Perform any necessary cleanup here
});
