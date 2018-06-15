import React from 'react'
import './user.css'
import {ref} from '../config/firebase'
import {authEmail} from '../config/user_manage'
import {Link,Redirect} from 'react-router-dom'
let url_logo = require('../img/logo.jpg')
class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            student_id:'',
            password:'',
            error:{},
            fullname:'',
            type:'',
            typer:['สถานะผู้ใช้งาน','นักศึกษา','บุคลากร','อาจารย์'],
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
       if(this.state.student_id.trim()==="") error.student_id ="! student is empty";
       if(this.state.type==="นักศึกษา"&&this.state.student_id.trim().toLocaleUpperCase()[0]!=='B')error.student_id ="! student not format";
       if(this.state.type==="นักศึกษา"&&this.state.student_id.length!==8)error.student_id ="! student not format";
       if(this.state.password==="")error.password="! password is empty";
       if(this.state.type!=="นักศึกษา"&&this.state.student_id.length<5)error.student_id="! username shorted!!"
       if(this.state.password.length<6)error.password="! password is short (6-10)";
       if(this.state.fullname.trim()==="")error.fullname="! fullname is empty";
       if(this.state.type==="สถานะผู้ใช้งาน")error.type="! type not select";
       if(this.state.type==="")error.type="! type not select";
       this.setState({error})
       const inValid = Object.keys(error).length===0
       if(inValid){
           let email = `${student_id.trim().toLocaleUpperCase()}@recan.ac.th`
    authEmail(email,password).then(user=>{
            ref.child(`users/${this.state.student_id.trim().toLocaleUpperCase()}`).set({
                fullname:this.state.fullname.trim(),
                cash:0,
                hours:0,
                point:0,
                type:this.state.type
            }).then(()=>{
                console.log("Sign SCCUSS!!")
                this.setState({done:true})
            })
    }).catch(err=>{
            let error ={}
            error.password="password or student id match";
            this.setState({error})
            if(err.code==='')
                console.log("logined")
            else if (err.code==='auth/user-not-found'){
                 console.log(err.code)
                return;
            }else if(err.code==='auth/email-already-in-use'){
                error.password="Student ID already in use";
                this.setState({error})
            }
       })
    }
}
    render(){
       const typer = this.state.typer.map((type)=>(
          <option>{type}</option>
       )) 
       const student = (
        <p className="field is-center">
        <input  className="input is-success"
                type="text" 
               name="student_id"
               value={this.state.student_id}
               placeholder="StudentID"
               onChange={this.haadleInputChange}
                   />			 
       <span className="noti">{this.state.error.student_id}</span>
    </p>
       )
       const ohter = (
        <p className="field is-center">
        <input  className="input is-success"
                type="text" 
               name="student_id"
               value={this.state.student_id}
               placeholder="Username"
               onChange={this.haadleInputChange}
                   />			 
       <span className="noti">{this.state.error.student_id}</span>
    </p>
       )
        const Signup = (
            <div className="layout_login">
            <div className="logo_login">
                <figure className="image is-128x128">
                    <img src={url_logo} alt='img'/>
                </figure>
            </div>
            <h4 className="title is-4">Register Member RECAN</h4>
                <p className="field is-center">
	 				<input  className="input is-success"
	 				    	type="text" 
                            name="fullname"
                            value={this.state.fullname}
                            placeholder="Enter Fullname"
                            onChange={this.haadleInputChange}
	 				   		/>			 
                    <span className="noti">{this.state.error.fullname}</span>
	 			</p>
                 <p className="field is-center" >
                    <div className="sle select is-primary">
                      <div>
                            <select className="sle" 
                              name='type'
                              value={this.state.type}
                              onChange={this.haadleInputChange}
                            >
                                {typer}
                            </select>
                        </div>
                    </div> 
                    <span className="noti">{this.state.error.type}</span>
                </p>
	 			{this.state.type==="นักศึกษา"?student:ohter}
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
	 			    <a  className="button is-primary" onClick={this.handleClick}><b>SIGNUP</b></a>
	 			</p>
				 <p className="field" style={{textAlign:'center'}}>
	 			<Link to={'/login'} ><a><u>Log In</u></a></Link>
				 </p>
	 		</div>
        )
        return(
            <div>
                {this.state.done?<Redirect  to={`/user/profile/${this.state.student_id.trim()}`}/>:Signup}            </div>
        )
    }
}
export default Signup
