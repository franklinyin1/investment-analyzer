import axios from 'axios'

//ACTION TYPES
const SET_TAGS = "SET_TAGS"

//ACTION CREATORS
const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags
  }
}

//THUNK CREATORS
export const fetchTags = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/tags/`)
    return dispatch(setTags(data))
  }
}

//REDUCER & INITIAL STATE
const initialState = []
export default function (tags = initialState, action) {
  switch(action.type) {
    case SET_TAGS:
      return action.tags
    default:
      return tags
  }
}
