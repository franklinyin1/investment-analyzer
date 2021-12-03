import axios from 'axios'

//ACTION TYPES
const SET_COMPANY = "SET_COMPANY"

//ACTION CREATORS
const setCompany = (company) => {
  return {
    type: SET_COMPANY,
    company
  }
}

//THUNK CREATORS
export const fetchCompany = (companyName) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/companies/${companyName}`)
    return dispatch(setCompany(data))
  }
}

//REDUCER & INITIAL STATE
const initialState = []
export default function (company = initialState, action) {
  switch(action.type) {
    case SET_COMPANY:
      return action.company
    default:
      return company
  }
}
