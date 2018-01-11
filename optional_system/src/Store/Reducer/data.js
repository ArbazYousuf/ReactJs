const STATE = {
    
    }
    function Data(state = STATE, action) {
        switch(action.type){
            case 'GET':
            return Object.assign({},state,action.val);
            
    
            default : return state ;
        }
    
    }
    
    export default Data;