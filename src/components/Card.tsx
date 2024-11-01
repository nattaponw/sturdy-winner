import { styled } from 'styled-components'
import { useDraggable } from '@dnd-kit/core'

export enum CardSuit {
  CLUBS = '♣️',
  SPADES = '♠️',
  HEARTS = '♥️',
  DIAMONS = '♦️'
}

type CardProp = {
  pip: string | number;
  suit: CardSuit;
  index: number;
  id: string | number;
}
const StackCard = styled.div<{ $index: number; }>`
  position: absolute; 
  left: ${props => props.$index * 30}px;
  
  &:hover {
    border-color: blue;
  }
`

function Card({ pip, suit, index, id }: CardProp) {
  const dragData = {
    pip,
    suit,
    index,
    id
  }
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: dragData }) 
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined;

    return (
      <StackCard 
        className="bg-slate-50 rounded-2xl w-[82px] h-[131px] p-2 shadow-md border-2 border-slate-300 card"
        $index={index}
        ref={setNodeRef} 
        style={style}
        {...listeners}
        {...attributes}
        >
        <div className="text-2xl font-semibold">{pip}</div>
        <div>{suit}</div>
      </StackCard>
    )
}

export default Card