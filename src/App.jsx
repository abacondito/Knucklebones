import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Column from './Column.jsx'

function App() {
  const [columns, setColumns] = 
    useState([[],[],[],[],[],[]])
  const [score,setScore]=useState({aiScore:0,playerScore:0})
  
  const size=3
  
  const [diceRoll,setDiceRoll]=useState(Math.floor(Math.random()*6)+1)

  function placeDice(i){
    if(checkEndGame(columns)){
      
      return
    }
    let newValue=[...columns]
    if (newValue[i].length<size){
      newValue[i].push(diceRoll)
    }
    else return

    newValue[i-3]=newValue[i-3].filter(value=>{if(value!=diceRoll){ return value}})
    if(!checkEndGame(newValue)){
      newValue=aiMove(newValue)
    }

    setColumns(newValue)
    console.log("placed dice")
    console.log(columns)
    setDiceRoll(Math.floor(Math.random()*6)+1)
    setScore(calculatePoints(newValue)) 
  }


  function aiPlace(selectedColumn,roll,gameState){
    const newValue=gameState
    if (newValue[selectedColumn].length<size){
      newValue[selectedColumn].push(roll)
    }
    //else return

    newValue[selectedColumn+3]=newValue[selectedColumn+3].filter(value=>{if(value!=roll){ return value}})
    //checkEndGame(newValue)
    //setColumns(newValue)
    console.log("AI placed dice")
    //console.log(columns)
    //setDiceRoll(Math.floor(Math.random()*6)+1)
    return gameState
  }

  function checkEndGame(gameState){
    let gameEnded=true

    for(let i=0;i<(gameState.length/2);i++){
      if(gameState[i].length<3){
        gameEnded=false
      }
    }

    if(gameEnded===true){
      return gameEnded
    }
    else{
      gameEnded=true
      for(let i=3;i<(gameState.length);i++){
        if(gameState[i].length<3){
          gameEnded=false
        }
      }
    }

    return gameEnded
    

    
  }

  //console.log(checkEndGame(columns))

  function aiMove(gameState){
    let aiRoll=Math.floor(Math.random()*6)+1
    let randomColumn=Math.floor(Math.random()*3)
    
    while (gameState[randomColumn].length===3 /*&&*/){
      randomColumn=Math.floor(Math.random()*3)
    }

    return aiPlace(randomColumn,aiRoll,gameState)

  }

  function calculatePoints(gameState){
    let aiPoints=0
    let playerPoints=0
    let multiplier=0
    
    
    for(let i=0;i<(gameState.length/2);i++){
      gameState[i].forEach(dice => {
        multiplier=0
        for(let j=0;j<gameState[i].length;j++){
          if(dice===gameState[i][j]){
            multiplier++
          }
        }
        aiPoints+=multiplier*dice
      });
    }

    for(let i=3;i<(gameState.length);i++){
      gameState[i].forEach(dice => {
        multiplier=0
        for(let j=0;j<gameState[i].length;j++){
          if(dice===gameState[i][j]){
            multiplier++
          }
        }
        playerPoints+=multiplier*dice
      });
    }

    return {aiScore:aiPoints,playerScore:playerPoints}
  
  }




  return (
    <div className="App">
      <div className='score'>{"Ai score: "+score.aiScore}</div>
      <div className="field" id="cpu">
        <Column size={3} values={columns[0]} />
        <Column size={3} values={columns[1]} />
        <Column size={3} values={columns[2]} />
      </div>
      
      <div className="field" id="player">
        <Column onClick={()=>placeDice(3)} size={size} values={columns[3]} />
        <Column onClick={()=>placeDice(4)} size={size} values={columns[4]} />
        <Column onClick={()=>placeDice(5)} size={size} values={columns[5]} />
      </div>
      <div className='score'>{"Player score: "+score.playerScore}</div>

      <div className='roll'>Dice: {diceRoll}</div>
      
    </div>
  )
}

export default App
