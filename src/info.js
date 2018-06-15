import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
// import Footer from './footer'
let url_bg = require('./img/bg.jpg')
let info1 = require('./img/info.jpg')
let info2 = require('./img/info_2.jpg')

class Info extends Component {
  // constructor(){
  //   super()
  //   this.state={
  //     value:'1000'
  //   }
  // }
  render() {
    return (
      <div>
             <h1>Recan</h1>
            <img  className='bg' src={url_bg} alt='img'/>
             <img  className='bg' src={info1} alt='img'/>
             <img  className='bg' src={info2} alt='img'/>
             {/* <div className='enter_site'>
               <Link to={'/login'}><a className="button is-success is-rounded is-medium">
               <i className="fab fa-font-awesome-flag"></i><b >&nbsp;&nbsp;&nbsp;&nbsp;Enter Website</b></a></Link>
            </div> */}
            {/* <div className="foots">
                <Footer/>
            </div> */}
      </div>
    );
  }
}

export default Info;