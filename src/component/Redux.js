import { createStore } from 'redux'
const initialState = {
    blogList: [],
    blogHistory:{
        buttonPosition: 1,
        searchText: ''
    }
}
 function blogListReducer(state=[],action){
    switch (action.type){
        case 'SET_LIST':
            return state.concat(action.payload)
        default:
            return state
    }
}
function blogHistoryReducer(state={},action){
    switch (action.type){
        case 'SET_BUTTON_HISTORY':
            return state.buttonPosition = action.payload;
        case 'SET_SEARCH_TEXT':
            console.log('action payload===>',action.payload)
            // console.log('state:',state)
            return {...state,searchText: action.payload}
        default:
            return state
    }
}
function reducer (state=initialState,action){
    return{
        blogList: blogListReducer(initialState.blogList,action),
        blogHistory: blogHistoryReducer(initialState.blogHistory,action)
    }
}
let store = createStore(reducer)
//store.subscribe(() => console.log(store.getState()))
export default store