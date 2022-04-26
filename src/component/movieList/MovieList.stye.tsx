import styled from "@emotion/styled";
import { Rating, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const MovieCardStyled = styled.div`
    margin: 20px 150px 20px 0px;
`

export const CardStyled = styled(Card)`
    width: 150px;
    box-shadow: none
`

export const CardContentStyled = styled(CardContent)`
    minHeight: 100px;
    overflow: hidden;
`

export const MovieTitleStyled = styled(Typography)`
    font-weight: bold; 
    font-size: 20px
`

export const RatingStyled = styled(Rating)`
    display: flex;
    justify-content: center;
`

export const ReleaseDate = styled.p`
    font-style: italic
`

export const ListBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`