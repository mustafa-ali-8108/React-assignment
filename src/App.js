import React, { useState } from 'react';
import './App.css';
import InputField from './InputField';
import ButtonComponent from './Button';
import DraggableTable from './List';
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


  const onDragStart = (e, item, column) => {
    e.dataTransfer.setData('item', item);
    e.dataTransfer.setData('column', column);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetColumn) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('item');
    const sourceColumn = e.dataTransfer.getData('column');

    if (sourceColumn === targetColumn) return;

    let sourceList = sourceColumn === 'leftList' ? [...leftList] : [...rightList];
    let targetList = targetColumn === 'rightList' ? [...rightList] : [...leftList];

    if(sourceList.length === targetList.length) return;

    const itemIndex = sourceList.indexOf(item);

    // Move the last two elements from the target list if the destination list is having more elements
    if( targetList.length > sourceList.length ){
      sourceList = [...sourceList,targetList.pop(),targetList.pop()]

      // Add the dropped item to the target list
      if (itemIndex !== -1) {
        targetList = [...targetList,sourceList.splice(itemIndex, 1)]

        // Make both lists equal by removing extra elements
        const minLength = Math.min(sourceList.length, targetList.length);
        sourceList = sourceList.slice(0, minLength);
        targetList = targetList.slice(0, minLength);

      }
    }
    else{

      // Add the dropped item to the target list
      if (itemIndex !== -1) {
        targetList = [...targetList,sourceList.splice(itemIndex, 1)]

      }

    }
    
    if (sourceColumn === 'leftList') {
      setLeftList(sourceList);
      setRightList(targetList);
    } else {
      setLeftList(targetList);
      setRightList(sourceList);
    }
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
        <DraggableTable items={leftList} targetList="leftList" onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} />
        </Grid>
        <Grid item xs={6}>
        <DraggableTable items={rightList} targetList="rightList" onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} />
        </Grid>
      </Grid> 
    </div>
  );
};

export default App;
