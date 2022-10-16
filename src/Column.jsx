import React from 'react'

export default function Column(props){
    let dices=props.values
    //let dices
    let size=props.size

    //console.log(dices)
    function diceSlot(baba){
        let elements=[]
        for (let i=0;i<size;i++){
            
            
            if (baba[i]){
                elements.push(<div className='flexDice' key={i}>{baba[i]}</div>)

            }
            else{
                elements.push(<div className='flexDice' key={i}> </div>)
            }
        }
        return elements
    }

    dices=diceSlot(dices)
    return (
        <div onClick={props.onClick}className='column'>
            {dices}
        </div>
    )
}