import React, { useEffect, useState } from 'react'
const diceKeys=[[5],[3,7],[3,5,7],[1,3,7,9],[1,3,5,7,9],[1,2,3,7,8,9]];

function Dice({randomNumber}) {
   

  return (
    <div className="dice">
        {diceKeys[randomNumber-1].map(key=>(<div className={`dicecircle circle${key}`}></div>))}
    </div>
  )
}

export default Dice