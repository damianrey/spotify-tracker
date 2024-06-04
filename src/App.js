import React, { useState } from "react";
import Auth from "./components/Auth";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";
import TopAlbums from "./components/TopAlbums";
import {
  Header,
  HeaderLeft,
  HeaderTitle,
  MainContainer,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  PeriodTabs,
  PeriodTabList,
  PeriodTab,
} from "./styles/LayoutStyle";
import MainLogo from "./img/mainlogo.png";
import { PlayerWrapper, playerStyles } from "./styles/PlayerStyles";
import SpotifyPlayer from "react-spotify-web-playback";

function App() {
  const [token, setToken] = useState("");
  const [currentTrackUri, setCurrentTrackUri] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState("short_term");

  return (
    <div>
      <Header>
        <HeaderLeft>
          <img src={MainLogo} alt="" width={46} height={46} />
          <HeaderTitle>SpotifyTracker</HeaderTitle>
        </HeaderLeft>
        <TabList>
          <Tab
            className={activeTab === 0 ? "active" : ""}
            onClick={() => setActiveTab(0)}
          >
            Top Tracks
          </Tab>
          <Tab
            className={activeTab === 1 ? "active" : ""}
            onClick={() => setActiveTab(1)}
          >
            Top Albums
          </Tab>
          <Tab
            className={activeTab === 2 ? "active" : ""}
            onClick={() => setActiveTab(2)}
          >
            Top Artists
          </Tab>
        </TabList>
        <Auth setToken={setToken} />
      </Header>
      {token && (
        <>
          <MainContainer>
            <Tabs>
              <PeriodTabs>
                <PeriodTabList>
                  <PeriodTab
                    className={timeRange === "short_term" ? "active" : ""}
                    onClick={() => setTimeRange("short_term")}
                  >
                    Short Term
                  </PeriodTab>
                  <PeriodTab
                    className={timeRange === "medium_term" ? "active" : ""}
                    onClick={() => setTimeRange("medium_term")}
                  >
                    Medium Term
                  </PeriodTab>
                  <PeriodTab
                    className={timeRange === "long_term" ? "active" : ""}
                    onClick={() => setTimeRange("long_term")}
                  >
                    Long Term
                  </PeriodTab>
                </PeriodTabList>
              </PeriodTabs>
              <TabPanel className={activeTab === 0 ? "active" : ""}>
                <TopTracks
                  token={token}
                  setCurrentTrackUri={setCurrentTrackUri}
                  timeRange={timeRange}
                />
              </TabPanel>
              <TabPanel className={activeTab === 1 ? "active" : ""}>
                <TopAlbums
                  token={token}
                  setCurrentTrackUri={setCurrentTrackUri}
                  timeRange={timeRange}
                />
              </TabPanel>
              <TabPanel className={activeTab === 2 ? "active" : ""}>
                <TopArtists
                  token={token}
                  setCurrentTrackUri={setCurrentTrackUri}
                  timeRange={timeRange}
                />
              </TabPanel>
            </Tabs>
          </MainContainer>
          <PlayerWrapper>
            <SpotifyPlayer
              token={token}
              uris={currentTrackUri ? [currentTrackUri] : []}
              play={true}
              showSaveIcon={true}
              magnifySliderOnHover={true}
              styles={playerStyles}
            />
          </PlayerWrapper>
        </>
      )}
    </div>
  );
}

export default App;
