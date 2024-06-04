import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.h3`
  color: white;
  margin-left: 10px;
  margin-right: 5px;
`;

export const MainContainer = styled.main`
  background-color: #4b4b4b;
  margin-top: 60px;
  padding: 10px;
  min-height: calc(100vh - 60px);
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TabList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #333;
  padding: 11px 0;
  border-bottom: 1px solid #444;
`;

export const Tab = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s, color 0.3s;

  &:hover {
    border-bottom: 2px solid #189e47;
  }

  &.active {
    border-bottom: 2px solid #189e47;
    font-weight: bold;
    color: #fff;
  }
`;

export const TabPanel = styled.div`
  display: none;
  padding: 20px;
  background: #4b4b4b;

  &.active {
    display: block;
  }
`;

export const PeriodTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const PeriodTabList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #444;
  border-radius: 5px;
`;

export const PeriodTab = styled.button`
  background: none;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  border-bottom: 2px solid transparent;
  margin: 0 5px;
  transition: border-bottom 0.3s, color 0.3s;

  &.active {
    border-bottom: 2px solid #189e47;
    font-weight: bold;
  }

  &:hover {
    border-bottom: 2px solid #189e47;
  }
`;

export const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const GridColumn = styled.div`
  flex: 1;
  max-width: 33%;
  box-sizing: border-box;
  padding: 5px;
`;

export const GridItem = styled.div`
  display: flex;
  align-items: center;
  background: #333;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #444;
  }

  img {
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;
