import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";

export const favouriteContext = createContext()

export const DataLayer = ({children}) => (
    <favouriteContext.Provider value={useReducer(reducer, initialState)}>
        { children }
    </favouriteContext.Provider>
)
 export const useFavourite = () => {
    return useContext(favouriteContext);
 }