import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridContainer, GridColumn, GridItem } from '../styles/LayoutStyle';

const TopAlbums = ({ token, setCurrentTrackUri, timeRange }) => {
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const albumMap = new Map();
        response.data.items.forEach(track => {
          const album = track.album;
          if (!albumMap.has(album.id)) {
            albumMap.set(album.id, {
              ...album,
              popularity: track.popularity
            });
          }
        });
        const sortedAlbums = Array.from(albumMap.values()).sort((a, b) => b.popularity - a.popularity);
        setTopAlbums(sortedAlbums);
      }).catch(error => console.error('Error fetching top albums:', error));
    }
  }, [token, timeRange]);
  const columns = [[], [], []];
  topAlbums.forEach((album, index) => {
    columns[index % 3].push(album);
  });

  return (
    <GridContainer>
      {columns.map((col, colIndex) => (
        <GridColumn key={colIndex}>
          {col.slice(0, 10).map((album) => (
            <GridItem key={album.id} onClick={() => setCurrentTrackUri(album.uri)}>
              <img src={album.images[0]?.url} alt={album.name} width={50} height={50} />
              <div>
                <span>{album.name}</span>
                <span><b>{album.artists[0].name}</b></span>
              </div>
            </GridItem>
          ))}
        </GridColumn>
      ))}
    </GridContainer>
  );
};

export default TopAlbums;
