//COPIED FROM REACT BLOG EXAMPLE

// import _ from 'lodash';
// import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
//
// export default function(state = {}, action) {
//   switch (action.type) {
//     case FETCH_POST:
//       //note we are not creating an array here. we were doing key interpolation.
//       //this code means: 'whatever the id of the post is, make a new key on the object with that key,
//       //and set its value to action.payload.data'
//       return { ...state, [action.payload.data.id]: action.payload.data }; //...state = take all existing posts in our state and put them into this new object
//     case FETCH_POSTS:
//       return _.mapKeys(action.payload.data, 'id');
//     case DELETE_POST:
//       return _.omit(action.payload);
//     default:
//       return state;
//   }
// }
