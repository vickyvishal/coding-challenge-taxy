import { GenreModel } from "../../models/movieModels"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { ContentHeader } from "../styledComponents/ContentHeader.style";
import { Context } from "../../contexts/context";
import { useContext } from "react";
import { GenreListStyled, GenreStyled } from "./GenreList.style";
import { Loader } from "../reusables/Loader";



export const GenreList = () => {
    const { appState } = useContext(Context);
   
    return (<GenreListStyled>
        <Box sx={{ flexGrow: 1 }}>
            <ContentHeader>Select a Genre</ContentHeader>
            <Grid container spacing={5}>
                {
                    !appState.isLoading ? appState.genreList.map((genre: GenreModel, index: number) => {
                        return <Grid data-testid={`genre-item-${index}`} item key={genre.id} md={2}>
                            <Link style={{textDecoration: "none"}} to={`genre/${genre.id}`}><GenreStyled sx={{}}>{genre.name}</GenreStyled></Link>
                        </Grid>
                    }): <Loader/>
                }
            </Grid>
        </Box>
    </GenreListStyled>)
}