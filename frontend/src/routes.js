import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/index'
import Dashboard from './pages/Dashboard/index'
import Register from './pages/Register/index'

export default function Routes() {
	return(
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login}/>
				<Route path='/dashboard' exact component={Dashboard}/>
				<Route path='/register' component={Register}/>
				
			</Switch>
		</BrowserRouter>
	)
}