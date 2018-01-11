import React, {Component} from 'react';

class Showlist extends Component{

render(){
    return(
        <div> 
           <thead>
               <tr>
                   <th>Value</th>
                   <th>Button's</th>
               </tr>
           </thead>
             {this.props.todolist.map((val, ind)=>{
                return <div key={ind}>{ind+1} -- {val}<button onClick={()=>{this.setState(prev => ({
                    
                    }))}}>Delete</button></div>
               })}
        </div>
    )
}
}

export default Showlist;