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

const formatDuration = (ms) => {
  if (!ms) return "";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const TopTracks = ({ token, currentTrackUri, setCurrentTrackUri, timeRange }) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=30`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const sortedTracks = response.data.items.sort(
            (a, b) => b.popularity - a.popularity
          );
          setTopTracks(sortedTracks);
        })
        .catch((error) => {
          console.error("Error fetching top tracks:", error);
          if (error.response && error.response.status === 401) {
            window.localStorage.removeItem("token");
            window.location.reload();
          }
        });
    }
  }, [token, timeRange]);

  const columns = [[], [], []];
  topTracks.slice(0, 30).forEach((track, index) => {
    columns[index % 3].push({ ...track, rank: index + 1 });
  });

  return (
    <GridContainer>
      {columns.map((col, colIndex) => (
        <GridColumn key={colIndex}>
          {col.map((track) => {
            const isPlaying = currentTrackUri === track.uri;
            return (
              <GridItem
                key={track.id}
                className={isPlaying ? "playing" : ""}
                onClick={() => setCurrentTrackUri(track.uri)}
              >
                <RankBadge $rank={track.rank}>#{track.rank}</RankBadge>
                <CoverWrapper $playing={isPlaying}>
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    loading="lazy"
                  />
                  <div className="play-overlay">{isPlaying ? "♫" : "▶"}</div>
                </CoverWrapper>
                <ItemDetails>
                  <span className="item-title" title={track.name}>
                    {track.name}
                  </span>
                  <span
                    className="item-subtitle"
                    title={track.artists.map((a) => a.name).join(", ")}
                  >
                    {track.artists.map((a) => a.name).join(", ")}
                  </span>
                </ItemDetails>
                {track.duration_ms && (
                  <ItemMeta>{formatDuration(track.duration_ms)}</ItemMeta>
                )}
              </GridItem>
            );
          })}
        </GridColumn>
      ))}
    </GridContainer>
  );
};

export default TopTracks;
