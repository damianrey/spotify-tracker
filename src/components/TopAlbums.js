import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GridContainer,
  GridColumn,
  GridItem,
  RankBadge,
  CoverWrapper,
  ItemDetails,
  ItemMeta,
} from "../styles/LayoutStyle";

const TopAlbums = ({ token, currentTrackUri, setCurrentTrackUri, timeRange }) => {
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const albumMap = new Map();
          response.data.items.forEach((track) => {
            const album = track.album;
            if (!albumMap.has(album.id)) {
              albumMap.set(album.id, {
                ...album,
                popularity: track.popularity,
              });
            }
          });
          const sortedAlbums = Array.from(albumMap.values()).sort(
            (a, b) => b.popularity - a.popularity
          );
          setTopAlbums(sortedAlbums);
        })
        .catch((error) => {
          console.error("Error fetching top albums:", error);
          if (error.response && error.response.status === 401) {
            window.localStorage.removeItem("token");
            window.location.reload();
          }
        });
    }
  }, [token, timeRange]);

  const columns = [[], [], []];
  topAlbums.slice(0, 30).forEach((album, index) => {
    columns[index % 3].push({ ...album, rank: index + 1 });
  });

  return (
    <GridContainer>
      {columns.map((col, colIndex) => (
        <GridColumn key={colIndex}>
          {col.map((album) => {
            const isPlaying = currentTrackUri === album.uri;
            const releaseYear = album.release_date
              ? album.release_date.split("-")[0]
              : "";
            return (
              <GridItem
                key={album.id}
                className={isPlaying ? "playing" : ""}
                onClick={() => setCurrentTrackUri(album.uri)}
              >
                <RankBadge $rank={album.rank}>#{album.rank}</RankBadge>
                <CoverWrapper $playing={isPlaying}>
                  <img
                    src={album.images[0]?.url}
                    alt={album.name}
                    loading="lazy"
                  />
                  <div className="play-overlay">{isPlaying ? "♫" : "▶"}</div>
                </CoverWrapper>
                <ItemDetails>
                  <span className="item-title" title={album.name}>
                    {album.name}
                  </span>
                  <span
                    className="item-subtitle"
                    title={album.artists.map((a) => a.name).join(", ")}
                  >
                    {album.artists.map((a) => a.name).join(", ")}
                  </span>
                </ItemDetails>
                {releaseYear && <ItemMeta>{releaseYear}</ItemMeta>}
              </GridItem>
            );
          })}
        </GridColumn>
      ))}
    </GridContainer>
  );
};

export default TopAlbums;
