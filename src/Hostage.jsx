import { languages } from "./language"
import { clsx } from "clsx"
export default function Hostage(props){
    const langEls = languages.map((lang,index)=> {
        const className = clsx({lang:true,lost:index<props.wrongs})
        return <div key={lang.name} 
                className={className}
                style={{backgroundColor:lang.backgroundColor,
                color:lang.color}}
            >
                {lang.name}
            </div>
    })
    return (
        <div className="flex">
            {langEls}
        </div>
    )
}