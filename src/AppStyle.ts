import {CSSProperties} from "react";

export const innerLayout: CSSProperties = {
  borderRadius: 8,
  width: '75%',
  backgroundColor: "#f0f0f0",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "spaceBetween",
};

export const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  paddingBottom: '40px'
};

export const list: CSSProperties = {
  width: '300px',
  height: '100%'
};

export const listItem: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
};

export const boardListWrapper: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: "space-between"
};

export const goBack: CSSProperties = {
  position: 'absolute',
  left: 180,
  top: 110,
  fontSize: '28px',
  color: '#1890ff'
}
