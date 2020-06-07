const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    id : String,
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    resetPasswordToken : String,
    resetPasswordExpires  : Date
});

UserSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err){
            return next(err);
        }
        this.password = hashedPassword;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err){
            return callback(err);
        }
        else {
            if (!isMatch){
                return callback(null, isMatch);
            }
            else {
                return callback(null, this);
            }
        }
    });
}

module.exports = mongoose.model('User', UserSchema);