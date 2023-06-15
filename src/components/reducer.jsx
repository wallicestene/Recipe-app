export const initialState = {
    user: null,
    favourite: [],
}
const reducer = (state, action) => {
    console.log(action)

    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user : action.user 
            };
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
        default: 
            throw Error("No case for that type found")
    }

}
export default reducer