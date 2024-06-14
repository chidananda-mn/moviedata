import "./styles.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "./Context";

export default function ListDisplay() {
  const [data, setData] = React.useState("");
  const [selectedMovies, setSelectedMovies] = React.useState([]);
  const [movieItems, setMovieItems] = useContext(MovieContext);

  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchDetails = async () => {
      if (data) {
        const url = `https://api.tvmaze.com/search/shows?q=${data}`;
        const getData = await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const shows = data.map((item) => item.show);
            setMovieItems(shows);
          });
      }
    };
    fetchDetails();
  }, [data]);
  const handleOnChange = (event, value, reason) => {
    setData(value);
  };
  const handleSelectionChange = (event, newValue) => {
    setSelectedMovies(newValue);
  };

  const movieHandler = (e, movieData) => {
    navigate("/movieDetails", { state: { movieData } });
  };

  const handleDelete = (movieToDelete) => () => {
    setSelectedMovies((movies) =>
      movies.filter((movie) => movie.id !== movieToDelete.id)
    );
  };
  console.log("selectedMovies", selectedMovies);
  console.log("movieItems", movieItems);
  return (
    <div className="App">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(option) => option.name}
        options={movieItems}
        sx={{ width: 300 }}
        onInputChange={handleOnChange}
        onChange={handleSelectionChange}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Box mt={2}>
        {movieItems?.map((movie) => (
          <Chip
            key={movie.id}
            label={movie.name}
            onDelete={handleDelete(movie)}
            onClick={(e) => movieHandler(e, movie)}
            component={Link}
            to={`/movieDetails/${movie.id}`}
            clickable
          />
        ))}
      </Box>
    </div>
  );
}
