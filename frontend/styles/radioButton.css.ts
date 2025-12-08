import { style } from '@vanilla-extract/css';
import { vars } from './design-system.css';

export const radioButton = style({
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  border: `1px solid ${vars.color.pinkishGrey}`,
  backgroundColor: vars.color.white,
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.2s ease',
  margin: '0',
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
