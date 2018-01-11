const STATE = {

}
function Updatepost(state = STATE, action) {
    switch(action.type){
        case 'POST':
        return Object.assign({},state,action.val);
        
        case 'DELETE':
        return Object.assign({});

        default : return state ;
    }

}

export default Updatepost;