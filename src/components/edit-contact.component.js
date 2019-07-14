import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class EditContact extends Component{
	
	constructor(props){
		super(props);

		//creating a binding
		this.onChangeContactName = this.onChangeContactName.bind(this); 
		this.onChangeContactPhone = this.onChangeContactPhone.bind(this); 
		this.onChangeContactEmail = this.onChangeContactEmail.bind(this); 
		this.onChangeContactAddress = this.onChangeContactAddress.bind(this); 
		this.onSubmit = this.onSubmit.bind(this); 

		this.state = {
			contact_name:'',
			contact_phone:'',
			contact_email:'',
			contact_address:''
		}
	}

	componentDidMount(){
		axios.get('http://localhost:4000/contacts/'+this.props.match.params.id)
			.then(response => {
				this.setState({
					contact_name: response.data.contact_name,
					contact_phone: response.data.contact_phone,
					contact_email: response.data.contact_email,
					contact_address: response.data.contact_address
				})	
			})
			.catch(function (error){
				console.log(error)
			})
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

		const obj = {
			contact_name: this.state.contact_name,
			contact_phone: this.state.contact_phone,
			contact_email: this.state.contact_email,
			contact_address: this.state.contact_address	
		};

		axios.post('http://localhost:4000/contacts/update/'+this.props.match.params.id, obj)
			.then(res => console.log(res.data));

			this.props.history.push('/')
		
	}


	render(){
		return(
			<div>
				<h3></h3>
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
						<button className="btn btn-outline-dark" style={{width:150}}> Save changes </button>
					</div>
				</form>
			</div>
		)
	}
}	