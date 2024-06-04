import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridContainer, GridColumn, GridItem } from '../styles/LayoutStyle';

const TopTracks = ({ token, setCurrentTrackUri, timeRange }) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const sortedTracks = response.data.items.sort((a, b) => a.popularity - b.popularity);
        setTopTracks(sortedTracks);
      }).catch(error => console.error('Error fetching top tracks:', error));
    }
  }, [token, timeRange]);

  const columns = [[], [], []];
  topTracks.forEach((track, index) => {
    columns[index % 3].push(track);
  });

  return (
    <GridContainer>
      {columns.map((col, colIndex) => (
        <GridColumn key={colIndex}>
          {col.slice(0, 10).map((track) => (
            <GridItem key={track.id} onClick={() => setCurrentTrackUri(track.uri)}>
              <img src={track.album.images[0]?.url} alt={track.name} width={50} height={50} />
              <div>
                <span>{track.name}</span>
                <span><b>{track.artists[0].name}</b></span>
              </div>
            </GridItem>
          ))}
        </GridColumn>
      ))}
    </GridContainer>
  );
};

export default TopTracks;
