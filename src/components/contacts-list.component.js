import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Contact = props =>(
	<tr>
		<td >{props.contact.contact_name}</td>
		<td >{props.contact.contact_phone}</td>
		<td >{props.contact.contact_email}</td>
		<td >{props.contact.contact_address}</td>
		<td > <Link to={"/edit/"+props.contact._id}><button className="btn btn-primary">Edit</button></Link></td>
		<td > <button onClick={(e) ==>this.delete()} className="btn btn-danger">Delete</button></td>

	</tr>
	)

export default class ContactsList extends Component{

	constructor (props){
		super(props);
		this.state = {contacts: []};
		this.delete = this.delete.bind(this);
	}

	delete(e){
		axios.get('http://localhost:4000/contacts/delete/'+this.props.obj._id)
			.then(console.log('deleted'))
			.catch(err => console.log(err))
	}

	componentDidMount(){
		axios.get('http://localhost:4000/contacts/')
			.then(response =>{
				this.setState({contacts: response.data});
			})
			.catch(function(error){
				console.log(error);
			})
	}

	componentDidUpdate(){
		axios.get('http://localhost:4000/contacts/')
			.then(response =>{
				this.setState({contacts: response.data});
			})
			.catch(function(error){
				console.log(error);
			})
	}

	contactList(){
		return this.state.contacts.map(function(currentContact, i){
			return <Contact contact={currentContact} key={i} />;
		});
	}

	render(){
		return(
			<div>
				<h5 style={{margin:20}}>Contact List</h5>
				<table className='table table-striped' style={{margin:10}}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Address</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.contactList()}
					</tbody>
				</table>
			</div>
		)
	}
}	