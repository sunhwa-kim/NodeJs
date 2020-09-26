
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store';   // src > store.js
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/HomePage'
import Room from './containers/RoomPage'
import NotFound from './components/NotFound'
import styles from './app.css'

render(
	// redux store
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				// room 변수
				<Route path="/r/:room" component={Room}></Route>
				<Route path="*" component={NotFound}></Route>
			</Switch>
		</BrowserRouter>
	</Provider>
	document.getElementById('app');  // index.html  의 body 하위 <main> id
);