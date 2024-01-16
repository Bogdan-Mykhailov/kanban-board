import './App.css'
import {CardItem} from "./components/Card/CardItem.tsx";
import {TopMenu} from "./components/TopMenu/TopMenu.tsx";
import Layout from "antd/lib/layout/layout";
import {MainHeader} from "./components/Header/Header.tsx";
import {CSSProperties} from "react";
import {DashedButton} from "./components/DashedButton/DashedButton.tsx";

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  paddingBottom: '40px'
};

const innerLayout: CSSProperties = {
  borderRadius: 8,
  width: '75%',
  backgroundColor: "#f0f0f0",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "spaceBetween",
};

const column: CSSProperties = {
  width: '100%',
  flexDirection: "column",
  display: 'flex',
  alignItems: "center"
};

const cardWrapper: CSSProperties = {
  overflow: 'scroll',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export const App = () => (
  <>
    <Layout style={layoutStyle}>
      <MainHeader/>
      <TopMenu/>
      <Layout style={innerLayout}>
        <div style={column}>
          <h2>Todo</h2>
          <div style={cardWrapper}>
            <CardItem/>
            <CardItem/>
          </div>
          <DashedButton/>
        </div>
        <div style={column}>
          <h2>In progress</h2>
          <div style={cardWrapper}>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
          </div>
        </div>

        <div style={column}>
          <h2>Done</h2>
          <div style={cardWrapper}>
            <CardItem/>
            <CardItem/>
          </div>
        </div>
      </Layout>
    </Layout>
  </>
);
