import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route {...rest} render={props => (isAuth ? <Component {...props} {...rest} /> : 
            (<Redirect to={{pathname: "/signin",state: { from: props.location }}}/>)
        )}
    />
   )
   
export default PrivateRoute