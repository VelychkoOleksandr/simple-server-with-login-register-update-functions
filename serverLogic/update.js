const mongoose = require('mongoose');
const dbData = require('../mongoDB/data');
const User = require('../model/user');

const { url, db } = dbData;

async function update(userName, password, userNewName, newPassword) {
    const userNewData = {
        userName: userNewName,
        password: newPassword
    }

    //Update
    await mongoose.connect(`mongodb://${url}/${db}`, { useNewUrlParser: true })
        .then( async () => {
            console.log("Connection To DB Established...");
            await User.findOneAndUpdate({userName: userName}, {$set: userNewData}, { upsert: false, useFindAndModify: false }, (err, doc) => {
                if (err) throw new Error(err);
                if (!doc) {
                    console.log("No User");
                } else {
                    console.log("Updated");
                    console.log(doc);
                }
                
            });
        })
        .catch(err => {
            throw new Error(err);
        })
    
    mongoose.connection.close();
}

module.exports = update;