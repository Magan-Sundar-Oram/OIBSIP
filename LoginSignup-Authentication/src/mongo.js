const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/loginAuth', {
// })
//   .then(() => {
//     console.log('MongoDB connected...');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB');
//     console.error(err);
//   });

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const AuthCollection = mongoose.model('authCollection', schema);

module.exports = AuthCollection;
