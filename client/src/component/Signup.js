import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'

class Signup extends Component{

    state = {
        email: "",
        password: "",
        confirm_password: ""
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    chkPassword = () => {
        const {password, confirm_password} = this.state
        if(password != confirm_password){
            return false
        } else {
            return true
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if(!this.chkPassword()){
            alert('Password dont match!!')
            this.setState({
                password: "",
                confirm_password: ""
            })
        } else {
        const response = await fetch('http://localhost:3001/api/signup/', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                credentials: 'include'
            })
            const data = await response.json()
            console.log(response.status)
            console.log(data)
        }
    }

    render(){
        return (
            <div>
            <Header />
            <div className="container col-md-5">
                <h2 className="text-secondary">SIGNUP</h2>
                <div className="form-group mt-3">
                    <form onSubmit={this.handleSubmit}>
                        <label className="title">Email</label>
                        <input className="form-control" 
                                type="text" 
                                name="email" 
                                value={this.state.email} 
                                onChange={this.handleChange}
                                required
                        />
                        <label className="title">Password</label>
                        <input className="form-control" 
                                type="password" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleChange}
                                required
                        />
                        <label className="title">Confirm Password</label>
                        <input className="form-control" 
                                type="password" 
                                name="confirm_password" 
                                value={this.state.confirm_password} 
                                onChange={this.handleChange}
                                required
                        />
                        <br />
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                </div> 
            </div>
            <Footer company="Takdanai" email="Petch@gmail.com" />
            </div>
        )
    }
}

export default Signup