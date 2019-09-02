import React,{Component} from 'react'
import { Redirect } from 'react-router'
import Cookies from 'js-cookie'
import Header from './Header'
import Footer from './Footer'

class Signin extends Component{

    state = {
        email: "",
        password: "",
        session:"",
        isAuth: false
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.props.onLoginSubmit(this.state.email,this.state.password)
    }
    // handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const response = await fetch('http://localhost:3001/api/signin/',{
    //         method: 'post',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify({ email: this.state.email, password: this.state.password}),
    //         credentials: 'include'
    //     })
    //     const data = await response.json()
    //     console.log(response.status)
    //     if(response.status === 200){
    //         this.setState({
    //             session: Cookies.get('sess'),
    //             email: "",
    //             password: "",
    //             isAuth: true
    //         })
    //     }
    // }
    
    render(){

        if(this.props.isAuth){
            // console.log(this.state.isAuth)
            return <Redirect to="/profile"/>
        }

        return (
            <div>
                <Header />
                <div className="container col-md-5">
                    <h2 className="text-secondary">SIGNIN</h2>
                    <div className="form-group mt-3">
                        {/* {console.log(Cookies.get('sess'),this.state.isAuth)} */}
                        <form onSubmit={this.handleSubmit}>
                            <label className="title">Email: </label>
                            <input className="form-control"
                                    type="text" 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required 
                            />
                            <br />
                            <label className="title">Password: </label>
                            <input className="form-control" 
                                    type="password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">Signin</button>
                        </form>
                    </div>
                </div>
                <Footer company="Takdanai" email="Petch@gmail.com" />
            </div>
        )
    }
}

export default Signin