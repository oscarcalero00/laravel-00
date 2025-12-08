import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const header = style({
  width: '100%',
  height: '50px',
  backgroundColor: vars.color.white,
  boxShadow: '0 2px 0 0 rgb(218, 218, 218)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 100,
});

export const container = style({
  width: '100%',
  maxWidth: '1440px',
  padding: '0 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  fontFamily: vars.font.montserrat,
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.greenTeal,
  margin: 0,
});
