import { FC, useEffect, useState } from "react"

export interface IPopupAlert {
    current:"show"|"close",
    type:"success"|"error",
    label:string
}
export const PopupAlert = (props:IPopupAlert) => {
    let [state,setState] = useState(false)

    useEffect(()=>{
        if(state){
            setTimeout(()=>{
                setState(false);
            },4000)
        }
    },[state])

    useEffect(()=>{
        if(props.current === "show") setState(true)
        if(props.current === "close") setState(false)
    },[props])
    
    if(props.type === "success"){
        return(
            <div>
                {
                    state && (
                    <div className="alert alert-success flex flex-1 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{props.label}</span>
                    </div>)
                }
            </div>
        )
    }

    if(props.type === "error"){
        return(
            <div>
                {
                    state && (
                    <div className="alert alert-warning flex flex-1 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>{props.label}</span>
                    </div>)
                }
            </div>
        )
    }
}


export const RemiderAlert:FC<{isError:boolean,message:string}> = (props) => {
    console.log("Props",props)
    return (
        <div className="m-5">
            <div className={`flex rounded-md items-center ${props.isError?"bg-red-500":"bg-green-500"} text-white text-sm font-bold px-4 py-3`} role="alert">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>{props.message}</p>
            </div>
        </div>
    )
}