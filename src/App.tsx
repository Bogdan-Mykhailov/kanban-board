import './AppStyle.ts'
import {CardItem} from "./components/Card/CardItem.tsx";
import {TopMenu} from "./components/TopMenu/TopMenu.tsx";
import Layout from "antd/lib/layout/layout";
import {MainHeader} from "./components/Header/Header.tsx";
import {cardWrapper, column, innerLayout, layoutStyle} from "./AppStyle.ts";
import {MainModal} from "./components/Modal/MainModal.tsx";

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
          <MainModal />
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
