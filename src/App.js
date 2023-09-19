import React, { useState } from 'react';
import './App.css';
import InputField from './InputField';
import ButtonComponent from './Button';
import ListComponent from './List';
import Grid from '@mui/material/Grid';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  const onInput = (value) => {
    setInputValue(value);
  };

  const generateLists = () => {
    // Parse input value as a positive integer
    const num = parseInt(inputValue);

    // Check if num is a positive integer
    if (Number.isInteger(num) && num > 0) {
      // Determine the number of elements for left and right columns based on the rules
      let leftCount, rightCount;

      if (leftList.length === 0) {
        leftCount = num % 2 === 0 ? num / 2 + 1 : Math.ceil(num / 2);
        rightCount = num - leftCount;
      } else {
        rightCount = num %2 === 0 ? num / 2 + 1 : Math.ceil(num / 2);
        leftCount = num - rightCount
      }

      const newLeftList = [...leftList];
      const newRightList = [...rightList];
        
      // Add new elements to the right column
      for (let i = 0; i < rightCount; i++) {
        newRightList.push(`Right Item ${rightList.length + i + 1}`);
      }

      // Add new elements to the left column
      for (let i = 0; i < leftCount; i++) {
        newLeftList.push(`Left Item ${leftList.length + i + 1}`);
      }
	  
      setLeftList(newLeftList);
      setRightList(newRightList);
    }
  };

  const onDrop = (e, targetList) => {
    e.preventDefault();
    const index = parseInt(e.dataTransfer.getData('text/plain'));

    // Move the last two elements from the target list if the destination list is having more elements
    if (targetList === 'left' && rightList.length > leftList.length) {
      setLeftList([...leftList, rightList.pop(), rightList.pop()]);
    } else if (targetList === 'right' && leftList.length > rightList.length) {
      setRightList([...rightList, leftList.pop(), leftList.pop()]);
    }

    // Add the dropped item to the target list
    if (targetList === 'left') {
      setLeftList([...leftList, leftList.splice(index, 1)[0]]);
    } else if (targetList === 'right') {
      setRightList([...rightList, rightList.splice(index, 1)[0]]);
    }

    // Make both lists equal by removing extra elements
    const maxLength = Math.max(leftList.length, rightList.length);
    setLeftList(leftList.slice(0, maxLength));
    setRightList(rightList.slice(0, maxLength));
  };

 
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputField onInput={onInput} />
        </Grid>
        <Grid item xs={1}>
          <ButtonComponent onClick={generateLists} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ListComponent items={leftList} targetList="left" onDrop={onDrop} />
        </Grid>
        <Grid item xs={6}>
          <ListComponent items={rightList} targetList="right" onDrop={onDrop} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
