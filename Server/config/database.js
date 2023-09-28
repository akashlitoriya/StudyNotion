const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> console.log("Connection to DB is successfull..."))
    .catch((err)=>{
        console.error(err);
        process.exit(1);
    })
}
