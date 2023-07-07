export const initialState = {
    user: null,
    favourite: [],
}
const reducer = (state, action) => {
    switch(action.type){

        case 'ADD_FAVOURITE':
            return{
                ...state,
                favourite:[...state.favourite, action.favourite]
            };
            case 'REMOVE_FAVOURITE':
                return{
                    ...state,
                    favourite: state.favourite.filter((item) => item !== action.favourite),
                };
                
            case 'LOG_IN':
                return{
                    ...state,
                    user: action.user
                };

            case 'LOG_OUT':
                return{
                    ...state,
                    user :null
                }
        default: 
            throw Error("No case for that type found")
    }

}
export default reducer