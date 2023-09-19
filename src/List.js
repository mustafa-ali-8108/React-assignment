import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Draggable from 'react-draggable';

const ListComponent = ({ items, targetList, onDrop }) => {
  return (
    <List onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, targetList)}>
      {items.map((item, index) => (
        <Draggable key={index} onStop={() => {}}>
          <div>
            <ListItem>
              <ListItemText primary={item} />
            </ListItem>
          </div>
        </Draggable>
      ))}
    </List>
  );
};

export default ListComponent;
