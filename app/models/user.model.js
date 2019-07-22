const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    first: String,
    email: { type: String, unique: true },
    password: String,
    image: String
}, {
        collection: 'User',
        timestamps: true
    });
UserSchema.pre('save', function (next) {
    const user = this;
    // if (!user.isModified('password')) { return next() };
    // console.log(user.password);
    if(user.password==undefined || user.password==null) {
        return next("undefined");
    }
    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
        if (err) {
            console.log(err)
            return next(err);
        }
        if(user)
        user.password = hashedPassword;
        next();
    })
});

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch)
    })
}
module.exports = mongoose.model('User', UserSchema);