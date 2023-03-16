import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useState } from "react";
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(
      `https://itunes.apple.com/search?term=${searchTerm}&entity=album&country=au`
      // `https://itunes.apple.com/search?term=jack+johnson&entity=musicVideo`
    );
    setResults(response.data.results);
    console.log(results);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="searchBox">
        <input
          className="search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Album Artwork</TableCell>
              <TableCell align="left">Artist Name</TableCell>
              <TableCell align="left">Album Name</TableCell>
              <TableCell align="left">Genre</TableCell>
              <TableCell align="left">Release Date</TableCell>
              <TableCell align="left">View it iTunes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .filter((results) => {
                return searchTerm === ""
                  ? results
                  : results.artistName.toLowerCase().includes(searchTerm);
              })
              .map((result) => {
                const {
                  collectionId,
                  artistName,
                  collectionName,
                  primaryGenreName,
                  releaseDate
                } = result;
                let publishDate = new Date(releaseDate);
                let formatDate = publishDate.toLocaleString("en-us", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                });
                return (
                  <TableRow key={collectionId}>
                    <TableCell>
                      <img
                        src={result.artworkUrl100}
                        alt={result.collectionName}
                      />
                    </TableCell>
                    <TableCell>{artistName}</TableCell>
                    <TableCell>{collectionName}</TableCell>
                    <TableCell>{primaryGenreName}</TableCell>
                    <TableCell>{formatDate}</TableCell>
                    <TableCell>
                      <Button
                        href={result.collectionViewUrl}
                        target="_blank"
                        rel="noreferrer"
                        variant="contained"
                      >
                        View on iTunes
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default App;
