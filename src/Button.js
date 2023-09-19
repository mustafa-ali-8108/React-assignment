import React from 'react';
import Button from '@mui/material/Button';

const ButtonComponent = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Generate Rows
    </Button>
  );
};

export default ButtonComponent;
