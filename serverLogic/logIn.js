const mongoose = require('mongoose');
const dbData = require('../mongoDB/data');
const User = require('../model/user');

const { url, db } = dbData;

async function logIn(userName, password) {
    let result = false;
    //Connect to DB to check user
    await mongoose.connect(`mongodb://${url}/${db}`, { useNewUrlParser: true })
        .then(async () => {
            console.log("Connection To DB Established...");
            await User.findOne({userName: userName, password: password}, { _id: 0, __v: 0 }, (err, user) => {
                if (err) throw new Error(err);
                if (user) {
                    console.log(`${user.userName} succesfuly log in!`);
                    result = !result;
                    mongoose.connection.close();
                } else {
                    console.log("User Not Found");
                    mongoose.connection.close();
                }
            })
        })
        .catch(err => {
            throw new Error(err);
        })
        return result;
}

module.exports = logIn;

