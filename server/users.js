
module.exports = (mongoose) => {
    const { Schema, Types } = mongoose
    var UserSchema = new Schema({
        name: String,
        gender: String,
        age: Number
    });

    var User = mongoose.model('User', UserSchema);


    function insertUser(info, cb) {
        //Render new UserList
        let user = new User({
            name: info.name,
            gender: info.gender,
            age: info.age
        });
        user.save(err => err ? console.error(err) : cb())
    }


    function getAllUsers(cb) {
        User.find({}, cb)
    }

    function get(id, cb) {
        User.findById(id, cb)
    }
    function updateUser(id, info, cb) {
        User.findOneAndUpdate({ '_id': Types.ObjectId(id) }, info, cb)
    }

    function removeUser(id, cb){
        User.findByIdAndRemove(id, cb)
    }

    return {
        insertUser,
        getAllUsers,
        get,
        updateUser,
        removeUser
    }
};