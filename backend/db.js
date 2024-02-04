const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aakarsha97:J9b3qVRhBAm8hbH3@cluster0.kjiwewa.mongodb.net/Paytm');

const UserSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    Lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    Password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
	balance: {
        type : Number,
        required : true
    }
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    User,
    Account
}