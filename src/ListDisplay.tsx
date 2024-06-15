import "./styles.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "./Context";
import Avatar from "@mui/material/Avatar";

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
    setMovieItems((movies) =>
      movies.filter((movie) => movie.id !== movieToDelete.id)
    );
  };

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
            label={`${movie.name} (Rating: ${
              movie.rating.average ? movie.rating.average : "NA"
            })`}
            onDelete={handleDelete(movie)}
            onClick={(e) => movieHandler(e, movie)}
            avatar={<Avatar alt={movie.name} src={movie?.image?.medium} />}
            variant="outlined"
            clickable
          />
        ))}
      </Box>
    </div>
  );
}
