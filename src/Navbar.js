import React from 'react'

const Navbar = (props) => {
  return (
    <div>
        <header className='nav-bar'>
            <h1>Games</h1>
            <div className='nav-feature'>
              <input className="search" placeholder=' Search...' onChange={(event)=>{props.onChange(event)}} />
              <select className="sort" defaultValue={'DEFAULT'} onChange={(event) => props.handleSort(event)}>
                <option value="DEFAULT" disabled>Sort</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select> 
            </div>
        </header>
    </div>
  )
}

export default Navbar