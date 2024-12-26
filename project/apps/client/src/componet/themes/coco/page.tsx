import { FC } from "react"
import { ELABELS } from "../../../assets/static_string"
import PicoButton from "../../atoms/button/PicoButton"
import { Icon, IconKey, IconsSize } from "../../atoms/icons"
import { useNavigate } from "react-router-dom"

interface IProps {
    children: React.ReactNode,
    title:string,
    header?:React.ReactNode,
    isEmpty:boolean,
    icon:IconKey,
    buttonLabel:ELABELS,
    buttonRoute:string
}

const CocoPage:FC<IProps> = (props) => {
    let navigate = useNavigate();
    return(
        <div className="flex flex-1 flex-col px-3 lg:mx-20 lg:pt-36 pt-10 pb-24 justify-center items-center">
            <div className="flex flex-1 justify-between items-center w-full">
                <article className="prose prose-slate">
                    <h2>{props.title}</h2>
                </article>
                <PicoButton label={props.buttonLabel} onPress={()=>{navigate(props.buttonRoute)}} />
            </div>
            <div className="flex flex-1 justify-center items-center flex-col w-full mt-10">
                {props.isEmpty&&<Icon icon={props.icon} size={IconsSize.picture_lg} className="my-10" />}
                {props.children}
            </div>

        </div>
    )
}



export default CocoPage