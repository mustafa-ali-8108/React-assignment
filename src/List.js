import React from 'react';

const DraggableTable = ({items, targetList, onDrop, onDragOver, onDragStart}) => {

      return (
      <>
        <p>{targetList}</p>
        <div
          className='giveStyle'
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, targetList)}>

          {items.map((item, index) => (
            <div
              key={`item_${index}`}
              draggable
              onDragStart={(e) => onDragStart(e, item, targetList)}
            >
              <p>{item}</p>
            </div>
          ))}

        </div>
      </>
    );
};

export default DraggableTable;

