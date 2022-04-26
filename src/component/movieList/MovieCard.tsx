import { forwardRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieModel } from '../../models/movieModels'
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Context } from '../../contexts/context';
import { SET_SELECTED_MOVIE } from '../../reducer/constant';
import { CardContentStyled, CardStyled, MovieCardStyled, MovieTitleStyled, RatingStyled, ReleaseDate } from './MovieList.stye';
import { getReleaseDate } from '../../helpers/funtions';

interface movieCardProps {
  index: number,
  movie: MovieModel,
  isLoading: boolean
}

export const MovieCard = forwardRef(({ index, movie }: movieCardProps, lastMovieElement: any) => {
  const naviagte = useNavigate()
  const { dispatch } = useContext(Context);

  const onMovieSelect = () => {
    naviagte(`/movie/${movie.id}`)
    dispatch({ type: SET_SELECTED_MOVIE, selectedMovie: movie })
  }

  return (<MovieCardStyled ref={lastMovieElement} key={index} onClick={onMovieSelect}>
    <CardStyled>
      <CardActionArea>
        <CardMedia
          component="img"
          height="225"
          loading='lazy'
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
        <RatingStyled
          name="read-only"
          readOnly 
          value={movie.vote_average/2}
          precision={0.1}
        />
        <CardContentStyled>
          <MovieTitleStyled gutterBottom variant="h5">
            {movie.title}
          </MovieTitleStyled>
          <ReleaseDate>
            {getReleaseDate(movie.release_date)}
          </ReleaseDate>

        </CardContentStyled>
      </CardActionArea>
    </CardStyled>
  </MovieCardStyled>)
})

