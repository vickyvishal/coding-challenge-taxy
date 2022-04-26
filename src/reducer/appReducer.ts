import { AppStateModel, ActionModel } from "../models/movieModels";
import { SET_GENRE_LIST, SET_IS_LOADING_FALSE, SET_IS_LOADING_TRUE, SET_SELECTED_MOVIE } from "./constant";



export const appReducer = (state: AppStateModel, action: ActionModel): AppStateModel => {
    switch (action.type) {
        case SET_GENRE_LIST:
            return {
                ...state,
                genreList: action.genreList!
            }
        case SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: action.selectedMovie!
            }
        case SET_IS_LOADING_TRUE:
            return {
                ...state,
                isLoading: true
            }
        case SET_IS_LOADING_FALSE:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}