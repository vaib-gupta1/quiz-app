import React, { useState, useEffect, useRef } from "react"

export default function Card({ card }) {
  
  const [height, setHeight] = useState('initial')
  const [flip, setFlip] = useState(false)  
  
  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() { 
    const frontHeight = frontEl.current.clientHeight
    const backHeight = backEl.current.clientHeight
    setHeight(Math.max(100, frontHeight, backHeight))
  }
  
  useEffect(setMaxHeight,[card.question, card.answer, card.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  
  return ( 
    <div 
      className = { `card ${ flip ? 'flip' : '' }` } 
      style={{height: height}}
      onClick={() => {
       setFlip(!flip)
      }}
    >
      <div className="front" ref ={frontEl}>
        {card.question}
        <div className="card-options">
          {card.options.map(
            option => {
              return <div className="card-option">{option}</div>
            }
          )}
        </div>
      </div>      
      <div className="back" ref ={backEl}>
        {card.answer}  
      </div> 
    </div>
  )
}
