import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridContainer, GridColumn, GridItem } from '../styles/LayoutStyle';

const TopArtists = ({ token, setCurrentTrackUri, timeRange }) => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const sortedArtists = response.data.items.sort((a, b) => a.popularity - b.popularity);
        setTopArtists(sortedArtists);
      }).catch(error => console.error('Error fetching top artists:', error));
    }
  }, [token, timeRange]);

  const columns = [[], [], []];
  topArtists.forEach((artist, index) => {
    columns[index % 3].push(artist);
  });

  return (
    <GridContainer>
      {columns.map((col, colIndex) => (
        <GridColumn key={colIndex}>
          {col.slice(0, 10).map((artist) => (
            <GridItem key={artist.id} onClick={() => setCurrentTrackUri(artist.uri)}>
              <img src={artist.images[0]?.url} alt={artist.name} width={50} height={50} />
              <div>
                <span>{artist.name}</span>
              </div>
            </GridItem>
          ))}
        </GridColumn>
      ))}
    </GridContainer>
  );
};

export default TopArtists;
