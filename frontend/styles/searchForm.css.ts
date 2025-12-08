import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const SearchContainer = style({
  width: '410px',
  height: '230px',
  padding: '30px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(132, 132, 132, 0.75)',
  border: `1px solid ${vars.color.greyBorder}`,
  backgroundColor: vars.color.white,
});

export const WhatAreYouSearchingFor = style({
  margin: '0 0 20px 0',
  fontFamily: vars.font.montserrat,
  fontSize: '14px',
  fontWeight: 600,
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  color: vars.color.darkGrey56,
});

export const radioGroup = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
});

export const radioLabel = style({
  display: 'flex',
  alignItems: 'center',
  margin: '0 20px 0 0',
  fontFamily: vars.font.montserrat,
  fontSize: '14px',
  fontWeight: 600,
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  color: vars.color.black,
  cursor: 'pointer',
});

export const customRadio = style({
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  width: '14px',
  height: '14px',
  margin: '0 8px 0 0',
  borderRadius: '50%',
  border: `2px solid #ccc`,
  cursor: 'pointer',
  position: 'relative',
  outline: 'none',
  transition: 'all 0.2s ease',
  selectors: {
    '&:checked': {
      backgroundColor: vars.color.emerald,
      borderColor: vars.color.emerald,
    },
    '&:focus': {
      outline: 'none',
    },
  },
});

export const input = style({
  display: 'block',
  width: '100%',
  height: '40px',
  padding: '0 12px',
  border: `1px solid ${vars.color.pinkishGrey}`,
  borderRadius: '4px',
  fontSize: '14px',
  marginBottom: '20px',
  backgroundColor: vars.color.white,
  boxShadow: 'inset 0 1px 3px 0 rgba(132, 132, 132, 0.75)',
  fontFamily: vars.font.montserrat,
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.greenTeal,
    },
    '&::placeholder': {
      color: vars.color.pinkishGrey,
    },
  },
});

export const btn = style({
  background: vars.color.greenTeal,
  color: vars.color.white,
  border: `1px solid ${vars.color.greenTeal}`,
  padding: '0',
  height: '34px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontWeight: 700,
  width: '100%',
  fontSize: '14px',
  textTransform: 'uppercase',
  fontFamily: vars.font.montserrat,
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      opacity: 0.9,
    },
    '&:disabled': {
      opacity: 1,
      cursor: 'not-allowed',
      backgroundColor: vars.color.pinkishGrey,
      borderColor: vars.color.pinkishGrey,
    },
  },
});
