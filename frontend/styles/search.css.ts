import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const searchPage = style({
  padding: '40px',
  minHeight: '100vh',
  background: '#ededed',
});

export const searchLayout = style({
  display: 'flex',
  gap: '30px',
  maxWidth: '1200px',
});

export const resultsContainer = style({
  minWidth: '582px',
  padding: '30px',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.greyBorder}`,
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(132, 132, 132, 0.75)',
});

export const resultsTitle = style({
  fontFamily: vars.font.montserrat,
  fontSize: '18px',
  fontWeight: 700,
  margin: '0 0 24px 0',
  paddingBottom: '24px',
  borderBottom: `1px solid ${vars.color.pinkishGrey}`,
  color: vars.color.black,
});

export const resultItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  borderBottom: `1px solid ${vars.color.greyBorder}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const title = style({
  fontFamily: vars.font.montserrat,
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.black,
});

export const btn = style({
  background: vars.color.greenTeal,
  color: vars.color.white,
  border: `1px solid ${vars.color.greenTeal}`,
  padding: '10px 24px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '14px',
  textTransform: 'uppercase',
  fontFamily: vars.font.montserrat,
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      opacity: 0.9,
    },
  },
});

export const smallMuted = style({
  color: vars.color.muted,
  fontSize: '14px',
  fontFamily: vars.font.montserrat,
});
