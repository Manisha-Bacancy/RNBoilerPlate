/**
 *
 * LoginScreen reducer
 *
 */

 import * as Actions from './constants';

 const initState = {
    loading: false,
    user: null,
    error: null
};
 
 export const authReducer = (state:any = initState, action: any) => {
     const {type}=action;
    switch (type) {
        case Actions.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case Actions.LOGIN_SUCCESS:
            return {
                ...state,
                user:action.response.data.data,
                loading: false,
            };
        case Actions.LOGIN_FAILURE:
            return {
                ...state,
                error: action.response.data!=undefined?action.response.data.message:"",
                loading: false,
            };
        default:
            return state;
    }
 };
 
 export default authReducer;