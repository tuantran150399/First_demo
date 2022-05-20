import mongoose, {Schema} from 'mongoose';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: String, required: true }
},
{
    timestamps:true
});

var User = mongoose.model('User', UserSchema);
declare var module: any;

(module).exports = User