import React from 'react'
import  {Route,Switch} from 'react-router-dom'
import Info from '../info' 
// import  Login from '../user/login'
// import  Signup from '../user/signup'
// import Profile from '../user/profile'
// import ChangePointToHous from '../user/change'
// import NotFound from './404not'
class Routes extends React.Component{
	render(){
		return (
			<div>
				<Switch>
				    	<Route  path={'/'}  component={Info}/>
                    	{/* <Route exact path={'/login'}  component={Login}/>
                    	<Route exact path={'/signup'}   component={Signup}/>
                    	<Route exact path={'/user/profile/:uid'} component={Profile}/>
						<Route exact path={'/user/change/:uid'} component={ChangePointToHous}/> */}
				</Switch>
			</div>
		)
	}
}
export default Routes