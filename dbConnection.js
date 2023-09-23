const mongoose = require ('mongoose');

// Connect to the Database
async function main() {
    await mongoose.connect(process.env.mongo_URL);
}

module.exports = main;