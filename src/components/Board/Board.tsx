import Layout from "antd/lib/layout/layout";
import {cardWrapper, column, innerLayout, input} from "./BoardStyle.ts";
import {CardItem} from "../Card/CardItem.tsx";
import {MainModal} from "../Modal/MainModal.tsx";
import {Input} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useState} from "react";



export const Board = () => {
  const [value, setValue] = useState('');

  return (
    <Layout style={innerLayout}>
    <div style={column}>
      <h2>Todo</h2>

      <div style={cardWrapper}>
        <CardItem/>
        <CardItem/>
      </div>
      <MainModal title='Create Card'>
          <Input placeholder="Add title" style={input}/>

          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add description"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
      </MainModal>
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
  );
};
