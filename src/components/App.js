import React, { useState, useEffect, useRef, createContext } from 'react'
import CardList from './CardList'
import '../css/app.css'
import axios from 'axios'
import Header from './Header'

export const HeaderContext = createContext()

function App() { 
  const [cards, setCards] = useState([])
  const [categories, setCategories] = useState([])
  const categoryEl = useRef()
  const amountEl = useRef()

  const headerContextValue = {
    handleSubmit,
    categories,
    categoryEl,
    amountEl
  }

  useEffect(() => { 
    axios.get('https://opentdb.com/api_category.php')
    .then( res => setCategories(res.data.trivia_categories) ) 
  },[])
 
  
  useEffect( renderQuestion,[])

  function renderQuestion() {
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
      .then( res => {
        setCards(res.data.results.map(((eachQuestion, index) => { 
          const option = [ ...eachQuestion.incorrect_answers.map( a => decodeString(a) ) , decodeString(eachQuestion.correct_answer)] 
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(eachQuestion.question),
            answer: decodeString(eachQuestion.correct_answer),
            options: option.sort(() => Math.random() - 0.5 )  
          }
        })))
      })
  }

  function decodeString( str ) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) { 
    e.preventDefault()
    renderQuestion()
  }

  return ( 
    <HeaderContext.Provider value = {headerContextValue} >
      <Header /> 
      <div className="container">   
        <CardList cards={cards}/>
      </div>
      
    </HeaderContext.Provider>
  );
}
 
export default App;
