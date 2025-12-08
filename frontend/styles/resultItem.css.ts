import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const resultItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  borderBottom: `1px solid ${vars.color.pinkishGrey}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const itemTitle = style({
  fontFamily: vars.font.montserrat,
  fontSize: '16px',
  fontWeight: 700,
  color: vars.color.black,
  margin: 0,
});

export const detailsButton = style({
  minWidth: '134px',
  height: '34px',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.greenTeal,
  color: vars.color.white,
  border: 'none',
  borderRadius: '17px',
  fontFamily: vars.font.montserrat,
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      opacity: 0.9,
    },
  },
});
