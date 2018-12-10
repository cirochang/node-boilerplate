const axios = require('axios');

const fooApi = () => axios.create({
  baseURL: process.env.BACKEND_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

exports.getFoo = () => fooApi().post('/foobar/');
