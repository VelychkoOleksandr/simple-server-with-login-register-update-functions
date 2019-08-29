const mongoose = require('mongoose');
const dbData = require('../mongoDB/data');
const User = require('../model/user');

const { url, db } = dbData;

async function register(userName, password) {
    let status = 'inProgress';
    const user = new User({
        userName: userName,
        password: password
    });

    await mongoose.connect(`mongodb://${url}/${db}`, { useNewUrlParser: true })
        .then(async () => {
            console.log("Connection To DB Established...");
            await user.save()
                .then(resolve => {
                    console.log(`User ${resolve.userName} has bee succesfully added to DB`);
                    status = 'Succesfully Added';
                })
                .catch(err => {
                    if (err.code = 11000) status = 'userExists'; 
                    //throw new Error(err);
                });

        })
        .catch(err => {
            throw new Error();
        })

        return status;
}