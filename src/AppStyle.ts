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

export const boardListWrapper: CSSProperties = {
  width: '100%',
  padding: 20,
  display: 'flex',
  flexWrap: 'wrap',
  height: '100%',
  gap: 10,
  overflow: 'scroll'
};

export const goBack: CSSProperties = {
  position: 'absolute',
  left: -50,
  top: 46,
  fontSize: '28px',
  color: '#1890ff'
}

export const menuWrapper: CSSProperties = {
  position: 'relative',
  width: '75%',
  display: 'flex',
  marginBottom: '40px'
}
