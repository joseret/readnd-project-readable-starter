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
  const funcNameLog = 'reduce-post:'
  switch(action.type) {
    case REQUEST_POSTS:
      return state
    case RECEIVE_POSTS:
      console.log(funcNameLog + 'action.type' ,  action.type, {action, state})
      var categoryPosts = []
      var categoryPostsMap = {}
      if (action.postId && action.category) {
        categoryPostsMap = state[action.category].postsMap
        categoryPostsMap[action.postId] = action.postInfo
        categoryPosts = state[action.category].posts
        const at = categoryPosts.findIndex((item, index) => (item.id == action.postId))
        console.log(funcNameLog + 'findIndex' ,  {at, 'postId': action.postId})
        if (at >= 0) {
          categoryPosts[at] = action.postInfo
        } else {
          categoryPosts.push(action.postInfo)
        }
      } else {
        action.postInfo.map((post) => categoryPostsMap[post.id] = post )
        categoryPosts = action.postInfo
      }
      const nextState = {
        ...state,
        [action.category]: {
          posts: categoryPosts,
          postsMap: categoryPostsMap
        }
      }
      console.log(funcNameLog + 'nextState', action.type, nextState)
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
    console.log('reducer-post-comment-' + action.type, action, state)
    const nextStateNewComments = {
      ...state,
      [action.postId]: {
        comments: action.comments
      }
    }
    // const nextStateNewPosts = JSON.parse(JSON.stringify(state))

    // if (nextStateNewPosts[action.categoryId]) {
    //   nextStateNewPosts[action.categoryId].posts.map((post) => {
    //     console.log('reducer-post-comment-post-entry', post)          
    //     if (post.id == action.postId) {
    //       post['comments'] = action.comments
    //       console.log('reducer-post-comment-post-entry-found', post)               
    //     }
    //   })
    // }
    console.log('nextState', action.type, nextStateNewComments)
    return nextStateNewComments 
    default:
      return state
  }

}

export default combineReducers({
  category, 
  post,
  comment,
})

