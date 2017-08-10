import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import mangoosePaginate from 'mongoose-paginate';
import MangooseFOF from 'friends-of-friends';
const validateEmail = (email) => {
  const re = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i;
  return re.test(email);
};
const options = {
  personModelName: 'User',
  friendshipModelName: 'Friendship',
};
const mongooseFriends = new MangooseFOF(mongoose, options);
const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    //validate: [validateEmail, 'Please fill a valid email address'],
    //match: [/^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '',
  },
  location: {
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    postcode: {
      type: String,
      default: '',
    },
  },
  gender: {
    type: String,
    default: '',
  },
  dob: {
    type: Date,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
});
userSchema.plugin(mongooseUniqueValidator);
userSchema.plugin(mangoosePaginate);
userSchema.plugin(mongooseFriends.plugin, options);

export default mongoose.model(options.personModelName, userSchema);

