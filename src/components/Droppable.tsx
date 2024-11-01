import {useDroppable} from '@dnd-kit/core';
import React from 'react';

type DroppableType = {
  children: React.ReactNode
}

function Droppable(props: DroppableType) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='h-[300px] bg-slate-50'>
      {props.children}
    </div>
  );
}

export default Droppable