import { combineReducers} from 'redux'

import { 
  REQUEST_CATEGORIES, 
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,  
} from '../actions/actions'

const categoriesList = [
]

function getCategoriesMap(categoriesList) {
  return categoriesList.reduce(function(map, obj) {
  console.log('categoriesMap', obj)
  map[obj.path] = obj;
  return map;
  }, {})
}

const initialCategoriesState = { 
  categoriesList,    
  categoriesMap: getCategoriesMap(categoriesList)
}

const initialPostsState = {}
const initialCommentsState = {}



function category(state = initialCategoriesState, action) {
  switch( action.type) {
    case REQUEST_CATEGORIES:
      return state
    case RECEIVE_CATEGORIES:
      console.log('reducer-category' + action.type, action)
      const nextState = {
        categoriesList: action.categories,
        categoriesMap: getCategoriesMap(action.categories)
      }
      console.log('nextState', action.type, nextState)
      return nextState
    default:
      return state
  }
}

function post(state = {}, action) {
  switch(action.type) {
    case REQUEST_POSTS:
      return state
    case RECEIVE_POSTS:
      console.log('reducer-post' + action.type, action)
      const nextState = {
        ...state,
        [action.category]: {
          posts: action.posts
        }
      }
      console.log('nextState', action.type, nextState)
      return nextState    
    default:
      return state
  }
}

function comment(state = {}, action) {
  switch(action.type) {
    case REQUEST_POST_COMMENTS:
      return state
    case RECEIVE_POST_COMMENTS:
      console.log('reducer-post' + action.type, action)
      const nextState = {
        ...state,
        [action.postId]: {
          comments: action.posts
        }
      }
      console.log('nextState', action.type, nextState)
      return nextState    
    default:
      return state
  }
}

export default combineReducers({
  category, 
  post,
  comment,
})

