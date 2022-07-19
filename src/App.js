import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'


function App() {

  const [data, setData] = useState([]); 
  const [sortState, setSortState] = useState("none");
  const dataUrl="https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json";
  
  useEffect(()=>{
    async function getData(){
      const response = await fetch(dataUrl);
      const actualdata = await response.json();
      
      actualdata.shift(); 
      setData(actualdata)
    }
    getData();
  },[])

  // STORING SEARCHDATA INTO A STATE VARIABLE
  const [searchData, setSearchData] = useState("");
  const handleChange = (event)=>{
    setSearchData(event.target.value.toLowerCase());
  }
  //filter the searched data
  const filteredData = data.filter((ele, index)=>{
    const {title} = ele;
    if(searchData === ""){
      return ele;
    }
    else{
      return (title.toLowerCase().includes(searchData))  
    }
  })

    //sorting
    const handleSort = (event)=>{
      setSortState(event.target.value);
    }
    const sortMethods = {
      none: { method: undefined },
      ascending: { method: (a, b) => (a.score - b.score) },
      descending: { method: (a, b) => (b.score - a.score) },
    };

  return (
    <>
      <Navbar onChange={handleChange} handleSort={handleSort}/>
      <main>       
        <div className="album py-5 bg-light" >
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              { 
                
                filteredData.sort(sortMethods[sortState].method).map((ele,index)=>{
                  const {title, platform, score, genre, editors_choice}=ele;
                  
                  //function for showing editor's choice
                  const editorChoice = ()=>{
                    if(editors_choice === 'Y')
                      return "Editor's Choice"
                    else
                      return ""
                  }

                    return (
                          <div className="col" key={index}>
                            <div className="card shadow-sm">
                              <img src='/images/game.jpeg' className='game-img' alt="game-img" />
                              <div className='title'><strong>{title}</strong></div>
                              <div className="card-body">
                                <p className="card-text"><b>Platform : </b>{platform}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="btn-group">
                                    <button className="btn btn-sm btn-outline-secondary"><b>Genre</b>: {genre}</button>
                                    <button className="btn btn-sm btn-outline-secondary"><b>score</b>: {score}</button>
                                  </div>
                                  <small className="text-muted"><b>{editorChoice()}</b></small>
                                </div>
                              </div>
                            </div>
                          </div>
                    )
                })
              }
            </div>
          </div>
        </div>
      
      </main>

      <footer className="footer">
        <p>@tusharC6</p>
      </footer>
    </>
  );
}

export default App;