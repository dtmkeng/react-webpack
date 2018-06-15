import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import './user.css'
import {singInEmail} from '../config/user_manage'
let url_logo = require('../img/logo.jpg')
class Login extends React.Component{
    constructor(props){
      super(props)
      this.state={
          student_id:'',
          password:'',
          error:{},
          done:false
      }
      this.haadleInputChange = this.haadleInputChange.bind(this)
      this.handleClick = this.handleClick.bind(this)
}
haadleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
	if(!!this.state.error[event.target.name]){
		let error = Object.assign({},this.state.error)
		delete error[event.target.name]
		this.setState({
			[event.target.name]:event.target.value,
			error
		})
	}else{
		this.setState({
			[name]: value
		  });
    }
 }
handleClick(){
   let error ={}
   let { student_id,password} =this.state
   if(this.state.student_id==="") error.student_id ="! student is empty";
//    if(this.state.student_id.toLocaleUpperCase()[0]!=='B')error.student_id ="! student not format";
//    if(this.state.student_id.length!==8)error.student_id ="! student not format";
   if(this.state.password==="")error.password="! password is empty";
   if(this.state.password.length<6)error.password="! password is short"
   this.setState({error})
//    console.log(`${this.state.student_id}@recan.ac.th`)
//      toLowerCase();
   const inValid = Object.keys(error).length===0
   if(inValid){
       let email = `${student_id.trim().toLocaleUpperCase()}@recan.ac.th`
    singInEmail(email,password.trim()).then(user=>{
        console.log("LOGIN SCCUSS!!")
        this.setState({done:true})
        //   console.log(user.user.uid)
    }).catch(err=>{
        let error ={}
        error.password="password or username id match";
        this.setState({error})
        if(err.code==='')
        	console.log("logined")
        else if (err.code==='auth/user-not-found'){
            // console.log(err.code)
			this.props.history.push('/login')
        	return;
        }
   })
   }
  
 }
    render(){
       
        const Form =(
	 	   <div className="layout_login">
            <div className="logo_login">
                <figure className="image is-128x128">
                    <img src={url_logo} alt='img'/>
                </figure>
           
            </div>
             <h4 className="title is-4"><b>LOGIN RECAN</b></h4>
	 			<p className="field is-center">
	 				<input  className="input is-success"
	 				    	type="text" 
                            name="student_id"
                            value={this.state.student_id}
                            placeholder="StudenID or Username"
                            onChange={this.haadleInputChange}
	 				   		/>			 
                    <span className="noti">{this.state.error.student_id}</span>
	 			</p>
				
	 			<p className="field" >
	 				<input 	className="input is-success"
	 				        type="password" 
                            name="password"
                            value={this.state.password}
	 						placeholder="Password"
 							onChange={this.haadleInputChange}
	 						/>
							 <span className="noti">{this.state.error.password}</span>
	 			</p>
	 			<p className="field" style={{textAlign:'center'}}>
                  <br/>
	 			    <a  className="button is-info" onClick={this.handleClick}><b>LOGIN</b></a>
	 			</p>
				 <p className="field" style={{textAlign:'center'}}>
	 			<Link to={'/signup'} ><a><u>Sign Up</u></a></Link>
				 </p>
	 		</div>
	 		)
        return(
            <div className="login">
                {this.state.done?<Redirect to={`/user/profile/${this.state.student_id.trim()}`}/>:Form}
               
            </div>
        )
    }
}
export default Login