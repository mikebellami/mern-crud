import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateContact from "./components/create-contact.component";
import EditContact from "./components/edit-contact.component";
import ContactsList from "./components/contacts-list.component";

import logo from "./logo.png";


class App extends Component {
	render(){  
	  return(
	  	<Router>
		    <div className="container">
		        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		       		<a className="navbar-brand" href="/">
		       			<img src={logo} width="30" height="30" alt="Ont know what they want"/>
		       		</a>
		       		<Link to ="/" className="navbar-brand"> Mern Phone book App</Link>
		       		<div className="collapse navbar-collapse">
		       			<ul className="navbar-nav mr-auto">
		       				<li className="navbar-item">
		       					<Link to="/" className="nav-link">Contacts</Link>
		       				</li>
		       				<li className="navbar-item">
		       					<Link to="/create" className="nav-link"> Create contact</Link>
		       				</li>
		       			</ul>
		       		</div>
		        </nav>
		         
		        <Route path="/" exact component= {ContactsList} />
		    	<Route path="/edit/:id" component={EditContact} />
		    	<Route path="/create" component={CreateContact} />
		    </div>
		    
		</Router>
	  );
	}
}
export default App;
