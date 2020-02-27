const mongoose = require('mongoose');

const connectionString = `mongodb://localhost/${process.env.MONGODB_URI}`;


mongoose.connect(connectionString);


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connected error ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
