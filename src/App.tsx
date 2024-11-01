import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Card, { CardSuit } from './components/Card'
import Droppable from './components/Droppable'
import { useEffect, useState } from 'react'

type CardDataType = {
  id: number,
  pip: string | number,
  suit: CardSuit,
  index?: number
}

const cardDataList: CardDataType[] = [
  {
    id: 1,
    suit: CardSuit.CLUBS,
    pip: '9'
  }, 
  {
    id: 2,
    suit: CardSuit.SPADES,
    pip: '8'
  },  
  {
    id: 3,
    suit: CardSuit.DIAMONS,
    pip: '7'
  },
  {
    id: 4,
    suit: CardSuit.HEARTS,
    pip: '6'
  },
  {
    id: 5,
    suit: CardSuit.DIAMONS,
    pip: '3'
  }
]

function App() {
  const [isDropped, setIsDropped] = useState(false)
  const [dropCards, setDropCards] = useState<CardDataType[]>([])
  const [onHandCards, setOnHandCards] = useState<CardDataType[]>(cardDataList)
  
  // setOnHandCards(cardDataList)
  
  useEffect(() => {
    console.log(onHandCards);
    
  }, [onHandCards])
   
  const handleDragEnd = (e: DragEndEvent) => {
    setIsDropped(true) 
    const newData = e.active.data.current
    const filteredOnHands = onHandCards.filter(i => i.id !== e.active.data.current?.id)
    console.log({
      filteredOnHands,
      e,
      data: e.active.data.current
    })
    setOnHandCards(filteredOnHands)
    setDropCards([...dropCards, newData])
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable>
            <div className='relative h-[200px] p-4 bg-slate-50 mt-2'>
              {isDropped ? dropCards?.map((card, dIndex) => (<Card key={`card-${dIndex}`} pip={card.pip} suit={card.suit} index={dIndex+1} id={card.id} />)) : undefined}
            </div>
          </Droppable> 
          <div className='relative h-[200px] p-4 bg-slate-50 mt-2'>
            {onHandCards.map((item, index) => (<Card key={`card-${index}`} pip={item.pip} suit={item.suit} index={index} id={item.id} />))} 
          </div>
          <pre className='max-h-[140px] overflow-scroll bg-green-50'>
            {dropCards.length > 0 ? JSON.stringify(dropCards, null, 2) : ''}
          </pre>
        </DndContext>
      </div>
    </>
  )
}

export default App
