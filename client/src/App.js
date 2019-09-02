import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Profile from './component/Profile'
import Signup from './component/Signup'
import Signin from './component/Signin'
import PrivateRoute from './component/PrivateRoute'


class App extends Component {


  state = {isAuth: false,email: ""}

  // componentWillMount(){
  //   if(Cookies.get('sess')){
  //     this.setState({isAuth: true})
  //    }
  // }
  loginSubmit = async (email,password) => {
      const response = await fetch('http://localhost:3001/api/signin/',{
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, password: password}),
        credentials: 'include'
      })
      if(response.status === 200){
        this.setState({
            isAuth: true,
            email: email
        })
    }
  }
  logout = async () => {
      const response = await fetch('http://localhost:3001/api/signout/',{ method: 'post',credentials: 'include'})
      if(response.status === 200){
        this.setState({
            isAuth: false
        })
      }
  }

  render(){
      return (
        <div>
          {console.log(this.state.isAuth)}
          <Switch>
              <PrivateRoute path='/profile' exact component={Profile} onLogOut={this.logout} email={this.state.email} isAuth={this.state.isAuth} />
              {/* <Route path='/signin' exact component={Signin} /> */}
              <Route path='/signin' exact render={() => <Signin onLoginSubmit={this.loginSubmit} isAuth={this.state.isAuth} />}  />
              <Route path='/signup' exact component={Signup} />
          </Switch>
        </div>
      )
  }
}

export default App;
