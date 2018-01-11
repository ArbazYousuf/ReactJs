import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Carousel } from 'react-bootstrap';
import Navpic1 from '../../images/navpic1.jpg'
import Navpic2 from '../../images/navpic2.jpg'
import Navpic3 from '../../images/navpic3.png'
import {Link} from 'react-router-dom';
import Navigation from '../Navigation/navigation'

export default class Home extends Component{
  
 
    render(){
        return(
  <div>
    <div><Navigation /></div>
    <div>
  <Carousel>
    <Carousel.Item>
      <img width={900} height={500} alt="900x500" src={Navpic1} />
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={300} alt="900x500" src={Navpic2} />
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={900} alt="900x500" src={Navpic3} />
    </Carousel.Item>
  </Carousel>
    </div>
    </div>
        )
    }

}