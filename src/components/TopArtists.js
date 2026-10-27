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

const TopArtists = ({
  token,
  currentTrackUri,
  setCurrentTrackUri,
  timeRange,
}) => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const sortedArtists = response.data.items.sort(
            (a, b) => b.popularity - a.popularity
          );
          setTopArtists(sortedArtists);
        })
        .catch((error) => {
          console.error("Error fetching top artists:", error);
          if (error.response && error.response.status === 401) {
            window.localStorage.removeItem("token");
            window.location.reload();
          }
        });
    }
  }, [token, timeRange]);

  const columns = [[], [], []];
  topArtists.slice(0, 30).forEach((artist, index) => {
    columns[index % 3].push({ ...artist, rank: index + 1 });
  });

  return (
    <GridContainer>
      {columns.map((col, colIndex) => (
        <GridColumn key={colIndex}>
          {col.map((artist) => {
            const isPlaying = currentTrackUri === artist.uri;
            const mainGenre = artist.genres?.[0] || "Artista";
            return (
              <GridItem
                key={artist.id}
                className={isPlaying ? "playing" : ""}
                onClick={() => setCurrentTrackUri(artist.uri)}
              >
                <RankBadge $rank={artist.rank}>#{artist.rank}</RankBadge>
                <CoverWrapper $round $playing={isPlaying}>
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    loading="lazy"
                  />
                  <div className="play-overlay">{isPlaying ? "♫" : "▶"}</div>
                </CoverWrapper>
                <ItemDetails>
                  <span className="item-title" title={artist.name}>
                    {artist.name}
                  </span>
                  <span
                    className="item-subtitle"
                    style={{ textTransform: "capitalize" }}
                  >
                    {mainGenre}
                  </span>
                </ItemDetails>
                {artist.popularity !== undefined && (
                  <ItemMeta title="Popularidade no Spotify">
                    ★ {artist.popularity}
                  </ItemMeta>
                )}
              </GridItem>
            );
          })}
        </GridColumn>
      ))}
    </GridContainer>
  );
};

export default TopArtists;
