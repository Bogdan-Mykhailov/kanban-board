import {CSSProperties} from "react";

export const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  paddingBottom: '40px'
};

export const innerLayout: CSSProperties = {
  borderRadius: 8,
  width: '75%',
  backgroundColor: "#f0f0f0",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "spaceBetween",
};

export const column: CSSProperties = {
  width: '100%',
  flexDirection: "column",
  display: 'flex',
  alignItems: "center"
};

export const cardWrapper: CSSProperties = {
  overflow: 'scroll',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
