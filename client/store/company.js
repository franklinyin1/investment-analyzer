import axios from "axios";

//ACTION TYPES
const SET_COMPANY = "SET_COMPANY";

//ACTION CREATORS
const setCompany = (company) => {
  return {
    type: SET_COMPANY,
    company,
  };
};

//THUNK CREATORS
export const fetchCompany = (ticker) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/companies/${ticker}`);
      return dispatch(setCompany(data));
    } catch {
      return dispatch(setCompany('error'))
    }
  };
};

//REDUCER & INITIAL STATE
const initialState = {};
export default function (company = initialState, action) {
  switch (action.type) {
    case SET_COMPANY:
      return action.company;
    default:
      return company;
  }
}
