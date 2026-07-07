//improvements: remaining guesses left , anti-confetti/animation on losing , timer 

import Header from "./Header"
import Banner from "./Banner"
import Hostage from "./Hostage"
import { useState } from "react"
import { clsx } from 'clsx';
import { languages } from "./language";
import { getRandomWord } from "./utils";
import Confetti from "react-confetti"


function App() {
  const [guessLetter,setGuessLetter] = useState([])
  const [guess,setGuess] = useState(() => getRandomWord().split(''))

  const wrongGuessCount = 
        guessLetter.filter(letter => !guess.includes(letter)).length
  const isGameWon = guess.every(letter => guessLetter.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessLetter[guessLetter.length-1]

  const keys = "abcdefghijklmnopqrstuvwxyz"
  
  const keyEls = keys.split('').map(key => {
      const isGuessed = guessLetter.includes(key)
      const isCorrect = isGuessed && guess.includes(key)
      const isWrong = isGuessed && !guess.includes(key)
      const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
      return  <button onClick={() => handleGuess(key)} 
                      key={key} className={className}
                      disabled={isGameOver}
                      aria-disabled={guessLetter.includes(key)}
                      aria-label={`Letter ${key}`}
                    >
                    {key.toUpperCase()}
              </button>
  })

  const wordEls = guess.map((letter,index) => {
        const cname = clsx("word-letter",{"over":isGameLost && !guessLetter.includes(letter)})
        return <div key={index} className={cname}>
            {(guessLetter.includes(letter) || isGameOver)?letter:""}
        </div>
  }
      )
  
  function handleGuess(letter){
    setGuessLetter(prev => 
      prev.includes(letter) ? prev : [...prev,letter]
    )
  }

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
      <Header />
      <Banner lastIncorrect={guess.includes(lastGuessedLetter)} 
              langLost={wrongGuessCount-1} isGameOver={isGameOver} 
              isGameLost={isGameLost} 
              isGameWon={isGameWon}
      />
      <Hostage wrongs={wrongGuessCount}/>
      <div className='guess-word'>
        {wordEls}
      </div>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
                    {guess.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {languages.length-1-wrongGuessCount} attempts left.
                </p>
        <p>Current word: {guess.map(letter => 
                guessLetter.includes(letter) ? letter+"." : "blank.").join(" ")}</p>
      </section>
      <div className="keys">
        {keyEls}
      </div>
      <button onClick={() => {setGuess(getRandomWord().split(''));setGuessLetter([])}} style={{ visibility: isGameOver ? "visible" : "hidden" }} className="new-game">New Game</button>
    </>
  )
}

export default App
