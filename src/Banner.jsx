import { getFarewellText } from "./utils"
import { languages } from "./language"

export default function Banner(props){

    function banner(){
        if(!props.isGameOver) {
            if(props.langLost>=0 && !props.lastIncorrect){
                return <div className={`banner farewell`}>
                    <p>{getFarewellText(languages[props.langLost].name)}</p>
                </div>
            } else return
        }
        if(props.isGameWon){
            return <div className={`banner ${props.isGameWon?"won":""}` }>
                        <h1>You Win!</h1>
                        <p>Well done! 🎉</p>
                    </div>
        } if(props.isGameLost) {
            return <div className={`banner ${props.isGameLost?"lost":""}`}>
                        <h1>Game Over!</h1>
                        <p>You lose! Better start learning Assembly 😭</p>
                    </div> 
        }
    }

    return (
        <div aria-live="polite" role="status" className="banner-container">
            {banner()}
        </div>
    )
}