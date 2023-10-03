const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, minlength: 7 },
  password: { type: String, required: true, minlength: 8 },
},
{collection : 'users'});

// IF ITS ONLY ONE YOU CAN ALSO DO IT AS

module.exports = mongoose.model("User", UserSchema);