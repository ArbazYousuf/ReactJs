import {createStore,applyMiddleware,combineReducers} from 'redux'
import auth from './Reducer/auth';
import Updatepost from './Reducer/post'
import Data from './Reducer/data' 
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'

const middleware = applyMiddleware(createLogger(),thunk)
let Reducer = combineReducers({
  Post :  Updatepost,
   Auth: auth,
   Data : Data,
})

let store = createStore(
    Reducer,
    middleware
)

store.subscribe(()=>{console.log(store.getState())})

export default store