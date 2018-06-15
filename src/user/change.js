import React from 'react';
import firebase from 'firebase'
import {ref} from '../config/firebase'
import {Link} from 'react-router-dom'
class ChangePointToHous extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uid:'', 
            data:[],
            point:0,
            hours:0,
            done:false,
            error:{}
           
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
componentDidMount() {
    let user = firebase.auth().currentUser;
    // let than = this   
    let data=[]
	if (user) {
     this.setState({uid:this.props.match.params.uid})  
          ref.child(`users/${this.props.match.params.uid.toLocaleUpperCase()}`).on('value',res=>{
            data=[];
            res.forEach(shot => {
                // let key = shot.key
                // let value = shot.val()
                // console.log(key ,value)
                //data[key] = value 
                data.push(shot.val()) 
            })
           // console.log(data)
           this.setState({data:data,point:data[3],hours:parseInt(data[3]/70)})

        })
       
	} else { 
	       this.props.history.push('/login')
   }
}
handleClick(){
    let error ={}
    const {data} = this.state
    if(this.state.hours===''||this.state.hours==='0')error.hours ="! empty hours"
    if(parseInt(data[3])/70 < 1)error.hours = "! Point not enough"
    if(parseInt(data[3])/70  < this.state.hours)error.hours= "! hours over flow"
    this.setState({error})
    const inValid = Object.keys(error).length===0
    if(inValid){
        const hours = parseInt(data[2]) + this.state.hours
        ref.child(`users/${this.state.uid.trim().toLocaleUpperCase()}/hours`).set(hours).then(()=>{
            const point = parseInt(data[3]) - (this.state.hours*70)
            ref.child(`users/${this.state.uid.trim().toLocaleUpperCase()}/point`).set(point).then(()=>{
                    console.log("Sign SCCUSS!!")
                    this.setState({done:true})
                    this.props.history.push(`/user/profile/${this.state.uid.trim()}`)
        })
    })
    }
    
}
	render(){
        const {data} = this.state
        let url_logo = require('../img/logo.jpg')
		return (
			<div>
				<div className="layout_profile">
                    <div className="logo_profile">
                            <img  className="image is-128x128" src={url_logo} alt='img'/>
                    </div>
                    <div className="title_cha"><i className="fas fa-exchange-alt"></i>&nbsp;&nbsp;
                                Change Point to Hours</div> 
                    <div><b>Your point :&nbsp;{data[3]}&nbsp;point</b></div>
                    <div><b>70 point =  1 hours</b></div>
                    <div className="layout_logins">
                   
                    <div className="field">
                       <p className="control has-icons-left has-icons-right">
	 				     <input  className="input is-success"
	 				    	  type="number" 
                              name="point"
                              value={this.state.point}
                              disabled
	 				   		/>	
                                 <span className="icon is-small is-left">
                                    <i className="fas fa-star"></i>
                                </span>		 
                        {/* <span className="noti">{this.state.error.student_id}</span> */}
	 			        </p>
                    </div>
                    <div className="field">
                         <p className="control has-icons-left has-icons-right">
	 				     <input  className="input is-success"
	 				    	  type="number" 
                              name="hours"
                              value={this.state.hours}
                              onChange={this.haadleInputChange}
	 				   		/>		
                         <span className="icon is-small is-left">
                                    <i className="fas fa-clock"></i>
                         </span>		 
                           <span className="noti">{this.state.error.hours}</span>
	 			        </p> 
                     </div>    
                   </div>
                   <br/>
                        <a className="button is-primary" onClick={this.handleClick}><b>Change</b></a>  
                         &nbsp;&nbsp;
                         <Link to={`/user/profile/${this.state.uid.trim()}`}><a className="button is-danger"><b>Cancel</b></a></Link>
                    <br/> <br/> 
                </div>
               
			</div>
		)
	}
}
export default ChangePointToHous