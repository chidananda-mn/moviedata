import "./styles.css";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "./Context";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function MovieDetails() {
  const navigate = useNavigate();
  const [movieItems, setMovieItems] = useContext(MovieContext);

  const { state } = useLocation();
  const handleDelete = (id) => {
    setMovieItems((movies) => movies.filter((movie) => movie.id !== id));
  };
  console.log("state", state);
  return (
    <>
      MovieDetails
      <Card>
        <CardMedia
          component="img"
          height="100%"
          image={state?.movieData?.image?.medium}
          alt={state?.movieData?.name}
        />
        <CardContent>
          <Typography variant="h5">{state?.movieData?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {state?.movieData?.rating.average
              ? `Rating: ${state?.movieData?.rating?.average}`
              : "No rating available"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {state?.movieData?.summary
              ? state?.movieData?.summary.replace(/(<([^>]+)>)/gi, "")
              : "No description available"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleDelete(state?.movieData?.id);
              navigate("/");
            }}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
