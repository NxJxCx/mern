const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        mongoose.set({'strictQuery': false});
        console.log('Connecting to MongoDB database...');
        const con = await mongoose.connect(uri || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected @ ' + con.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
