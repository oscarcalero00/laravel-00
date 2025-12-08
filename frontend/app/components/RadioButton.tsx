import React from 'react';
import * as styles from '../../styles/radioButton.css';

interface RadioButtonProps {
  checked?: boolean;
  onChange?: () => void;
  name?: string;
}

export default function RadioButton({ checked = false, onChange, name }: RadioButtonProps) {
  return (
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      className={styles.radioButton}
    />
  );
}
