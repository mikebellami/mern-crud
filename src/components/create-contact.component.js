import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default  class CreateContact extends Component{

	constructor(props){
		super(props);

		this.onChangeContactName = this.onChangeContactName.bind(this); 
		this.onChangeContactPhone = this.onChangeContactPhone.bind(this); 
		this.onChangeContactEmail = this.onChangeContactEmail.bind(this); 
		this.onChangeContactAddress = this.onChangeContactAddress.bind(this); 
		this.onSubmit = this.onSubmit.bind(this); 

		this.state ={
			contact_name:'',
			contact_phone:'',
			contact_email:'',
			contact_address:""
		}
	}

	onChangeContactName(e){
		this.setState({
			contact_name:e.target.value
		});
	}

	onChangeContactPhone(e){
		this.setState({
			contact_phone:e.target.value
		});
	}

	onChangeContactEmail(e){
		this.setState({
			contact_email:e.target.value
		});
	}

	onChangeContactAddress(e){
		this.setState({
			contact_address:e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();

		console.log(`Form Submitted:`)
		console.log(`Todo description: ${this.state.contact_name}`);
		console.log(`Todo responsible: ${this.state.contact_phone}`);
		console.log(`Todo priority: ${this.state.contact_email}`);
		console.log(`Todo completed: ${this.state.contact_address}`);


		const newContact = {
			contact_name: this.state.contact_name,
			contact_phone: this.state.contact_phone,
			contact_email: this.state.contact_email,
			contact_address: this.state.contact_address	
		}

		axios.post('http://localhost:4000/contacts/add', newContact)
			.then(res => console.log(res.data));

		this.setState({
			contact_name:'',
			contact_phone:'',
			contact_email:'',
			contact_address: ''
		});
	}

	render(){
		return(
			<div style={{margin:30}}>
				<h4> Create contact</h4>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name</label>
						<input type="text" placeholder="Name" className="form-control" value={this.state.contact_name} onChange={this.onChangeContactName}/>
					</div>

					<div className="form-group">
						<label>Phone</label>
						<input type="text" placeholder="Phone" className="form-control" value={this.state.contact_phone} onChange={this.onChangeContactPhone}/>
					</div>

					<div className="form-group">
						<label>Email</label>
						<input type="email" placeholder="Email" className="form-control" value={this.state.contact_email} onChange={this.onChangeContactEmail}/>
					</div>

					<div className="form-group">
						<label>Address</label>
						<input type="text" placeholder="Address" className="form-control" value={this.state.contact_address} onChange={this.onChangeContactAddress}/>
					</div>
					
					<div className="form-group">
						<button className="btn btn-outline-dark" style={{width:150}}> Save </button>
					</div>
				</form>

			</div>
		)
	}
}	