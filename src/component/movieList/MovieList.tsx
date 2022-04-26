import axios from "axios";
import { useState, useRef, useCallback, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GET_MOVIE_LIST_FROM_GENRE } from "../../constants/app_constants";
import { MovieModel } from "../../models/movieModels";
import "./movie-list.scss"
import { MovieCard } from "./MovieCard";
import { ContentHeader } from "../styledComponents/ContentHeader.style";
import { Context } from "../../contexts/context";
import { ListBody } from "./MovieList.stye";
import { Loader } from "../reusables/Loader";

export const MovieList = () => {
    const [movieList, setMovieList] = useState<MovieModel[]>([] as MovieModel[])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const { genreId } = useParams();

    const { appState } = useContext(Context);


    const observer: any = useRef()
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${GET_MOVIE_LIST_FROM_GENRE}&with_genres=${genreId}&page=${pageNumber}`).then((res) => {
            setMovieList(movieList => [...movieList, ...res.data.results])
            setIsLoading(false)
        })
    }, [pageNumber, genreId])

    const lastMovieElement = useCallback((node: any) => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPage => prevPage + 1)
            }
        })
        if (node) observer.current.observe(node)

    }, [isLoading])


    return <div className="movie-list">
        {!isLoading && <ContentHeader>Here are some popular {appState.genreList.filter(genre => genre.id === Number(genreId))[0].name} film for you</ContentHeader>
        }

        {
            !isLoading ? <ListBody>
            {
                movieList.map((movie: MovieModel, index: number) => {
                    if (movieList.length === index + 1)
                        return <MovieCard isLoading={isLoading} key={index} index={movie.id} movie={movie} ref={lastMovieElement} />

                    else return <MovieCard isLoading={isLoading} key={index} index={movie.id} movie={movie} />
                })
            }
        </ListBody>:<Loader/> 
        }


    </div>
}