var mongoose = require('mongoose');
require('mongoose-type-email');
//for password hashing
var bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	email: {type: mongoose.SchemaTypes.Email},	//ensures its actually in email form
	symbols: [String]
})

//for hashing yo
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(undefined, isMatch);
    });
};

var Users = mongoose.model('myuser', userSchema);
module.exports = Users;