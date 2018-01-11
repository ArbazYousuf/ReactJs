const INITIAL_STATE = {
    
}
function Auth(state = INITIAL_STATE , action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({},state,action.val);

        case 'SIGNUP':
            return Object.assign({},state,action.val);

        default: return state;

    }
}
export default Auth;