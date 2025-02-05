const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true 
    },
    first_name: {
        type: String,
        required: true,
        trim: true 
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: String, 
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{2}\/\d{2}\/\d{4}$/.test(value); 
            },
            message: props => `${props.value} אינו תאריך חוקי בפורמט DD/MM/YYYY`
        }
    },
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'], 
        required: true
    }
});



const User = mongoose.model('User', UserSchema);
  


module.exports = User;