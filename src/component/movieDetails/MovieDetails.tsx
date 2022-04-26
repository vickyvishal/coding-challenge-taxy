import { CardMedia, Chip, Rating, Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, GET_MOVIE_DETAILS } from "../../constants/app_constants";
import { Context } from "../../contexts/context";
import { getReleaseDate } from "../../helpers/funtions";
import { MovieDetailsModel } from "../../models/movieModels";
import { Loader } from "../reusables/Loader";
import "./movie-details.scss"
import { ImageCard, MovieRatingStyled, MovieTitle, ReleaseDate, TagLine, MovieDetailsStyled } from "./movieDetails.styled";


export const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState<MovieDetailsModel>({} as MovieDetailsModel)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { movieId } = useParams();
    const naviagte = useNavigate();
    const { appState } = useContext(Context);

    console.log(appState.selectedMovie)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${GET_MOVIE_DETAILS}+${movieId}+?api_key=${API_KEY}`).then((res) => {
            setMovieDetails(res.data)
            setIsLoading(false)
        })
    }, [])

    

    return <MovieDetailsStyled>
        {
            !isLoading ? <> <ImageCard >
                <CardMedia
                    component="img"
                    height="450"
                    width="300"
                    image={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                /></ImageCard>
                <div className="movie-info">
                    <div className="movie-header">
                        <MovieTitle>{movieDetails.title}</MovieTitle><ReleaseDate>{getReleaseDate(movieDetails.release_date)}</ReleaseDate>
                        <div className="movie-facts">
                            <Stack direction="row" spacing={1}>

                                {
                                    movieDetails.genres.map((genre) => {
                                        return <Chip label={genre.name} key={genre.id} onClick={() => naviagte(`/genre/${genre.id}`)} />
                                    })
                                }
                            </Stack>
                        </div>
                        <div className="movie-body">
                            <TagLine>{movieDetails.tagline}</TagLine>
                            <MovieRatingStyled>
                                <Rating
                                    name="read-only"
                                    readOnly 
                                    value={movieDetails.vote_average / 2}
                                    precision={0.1}
                                />
                                <span>{movieDetails.vote_count} votes</span>
                            </MovieRatingStyled>
                            <div className="movie-description">
                                <span>{movieDetails.overview}</span>
                            </div>
                        </div>
                    </div>
                </div></>: <Loader/> 
        }

    </MovieDetailsStyled>



}