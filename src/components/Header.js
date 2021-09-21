import React, {useContext} from 'react'
import { HeaderContext } from './App'

export default function Header() {
  const {
    handleSubmit,
    categories,
    categoryEl,
    amountEl
  } = useContext(HeaderContext)


  return (
    <>
      <form className="header" onSubmit={handleSubmit}> 
        <div className="form-group">
          <label htmlFor ="category"> Category </label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor ="amount"> Number of Questions </label> 
          <input type="number" id="amount" min="1" defaultValue="10" step="1" ref={amountEl}></input>
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>     
    </>
  )

}
