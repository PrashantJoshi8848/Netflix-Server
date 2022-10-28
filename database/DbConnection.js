const mongoose = require("mongoose");

async function connectdb() {
  try {
    let response = await mongoose.connect(process.env.Mongo_URL);
    if (response) {
      console.log(`Db Connected...`);
    }
  } catch ({ message }) {
    console.log(message);
  }
}

module.exports = connectdb;
