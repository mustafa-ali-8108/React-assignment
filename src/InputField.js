import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ onInput }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onInput(inputValue);
  };

  return (
    <TextField
      type="number"
      label="Number of Rows Needed"
      value={value}
      onChange={handleInputChange}
      fullWidth
    />
  );
};

export default InputField;
