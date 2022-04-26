import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { GET_GENRE_LIST } from "../constants/app_constants";
import { ActionModel, AppStateModel, GenreModel } from "../models/movieModels";
import { appReducer } from "../reducer/appReducer";
import { SET_GENRE_LIST, SET_IS_LOADING_FALSE } from "../reducer/constant";


const initialState: AppStateModel = {
    genreList: [] as GenreModel[],
    isLoading: true
  }
  
export const Context = React.createContext<{
  appState: AppStateModel, dispatch: React.Dispatch<ActionModel>
}>({ appState: initialState, dispatch: () => null });

export const ContextProvider = ({ children }: any) => {
  const [appState, dispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    axios.get(GET_GENRE_LIST).then((res) => {
      dispatch({ type: SET_GENRE_LIST, genreList: res.data.genres })
      dispatch({type: SET_IS_LOADING_FALSE})
    })
  }, [])
  
  return (
    <Context.Provider value={{ appState, dispatch }}>
      {children}
    </Context.Provider>
  )
}
