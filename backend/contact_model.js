const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
	contact_name:{
		type:String
	},
	contact_phone:{
		type:Number
	},
	contact_email:{
		type:String
	},
	contact_address:{
		type:String
	}
});

module.exports = mongoose.model('Todo', Todo);

