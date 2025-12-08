import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const detailsContainer = style({
  maxWidth: '804px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: 'white',
  border: `1px solid ${vars.color.greyBorder}`,
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(132, 132, 132, 0.75)',
});

export const detailsTitle = style({
  fontFamily: vars.font.montserrat,
  fontSize: '18px',
  fontWeight: 700,
  color: vars.color.black,
  marginBottom: '52px',
});

export const detailsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '30px',
  marginBottom: '36px',
});

export const detailsSection = style({
  display: 'flex',
  flexDirection: 'column',
});

export const sectionTitle = style({
  fontFamily: vars.font.montserrat,
  fontSize: '16px',
  fontWeight: 700,
  color: vars.color.black,
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: `1px solid ${vars.color.pinkishGrey}`,
});

export const sectionContent = style({
  fontFamily: vars.font.montserrat,
  fontSize: '14px',
  fontWeight: 400,
  color: vars.color.black,
  lineHeight: '1.6',
  whiteSpace: 'pre-line',
});

export const linkList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const link = style({
  fontFamily: vars.font.montserrat,
  fontSize: '14px',
  fontWeight: 400,
  color: vars.color.emerald,
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const backButton = style({
  width: '187px',
  height: '34px',
  backgroundColor: vars.color.greenTeal,
  border: `1px solid ${vars.color.greenTeal}`,
  borderRadius: '17px',
  fontFamily: vars.font.montserrat,
  fontSize: '14px',
  fontWeight: 700,
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  ':hover': {
    backgroundColor: 'rgb(8, 153, 84)',
  },
});
