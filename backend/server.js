//Library
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');
const contactRoutes = express.Router();
const PORT= 4000;

//bring in model 
let Contact = require('./contact_model');

app.use(cors());
app.use(bodyParser.json());

//connecting to DB
mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
	console.log('Mongodb database don dey work');
})

//endpoint
contactRoutes.route('/').get(function(req, res){
	Contact.find(function(err, contacts){
		if(err){
			console.log(err);
		}else{
			res.json(contacts);
		}
	});
});

contactRoutes.route('/:id').get(function(req,res){
	let id =req.params.id;
	Contact.findById(id, function(err, contact){	
		res.json(contact);
	});
});

contactRoutes.route('/add').post(function(req, res){
	let contact = new Contact(req.body);
	contact.save()
		.then(concta =>{
			res.status(200).json({'contact': 'contact don dey successful 😃👍👌😎'});
		})
		.catch(err => {
			res.status(400).send('Oga the new contact fail ☹☹😕😕')
		})
});

contactRoutes.route('/update/:id').post(function(req, res){
	Contact.findById(req.params.id, function(err, contact){
		if(!contact)
			res.status(404).send('Ogbeni the data no dey here na ☹☹😕😕');
		else
			contact.contact_name = req.body.contact_name;
			contact.contact_phone = req.body.contact_phone;
			contact.contact_email = req.body.contact_email;
			contact.contact_address = req.body.contact_address;

			contact.save().then(contact => {
				res.json(' omo iya mi the contact don dey Updated 😃👍👌😎 ');
			})
			.catch(err => {
			res.status(400).send('Oga the update contact fail oo ☹☹😕😕');
			});
	});
});

contactRoutes.route('/delete/:id').get(function(req, res){
	Contact.findByIdAndRemove({_id:req.params.id}, function(err, contact){
		if(err)
			res.status(400).send('Ogbeni the data no delete 😟😟');
		else
			res.status(200).send('Oga the data delete 😃👍👌😎 ')
	});
});

// Router point
app.use('/contacts', contactRoutes);



//starting Server
app.listen(PORT, function(){
	console.log("server don dey run on: "+ PORT)
});