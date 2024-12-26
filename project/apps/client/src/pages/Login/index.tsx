import { useState } from "react"
import { ELABELS } from "../../assets/static_string"
import BasicInput from "../../componet/atoms/Input/BasicInput"
import ResponsiveButton from "../../componet/atoms/button/responsiveButton"
import { useLogin } from "../../feature/query/login/Login"
import { useNavigate } from "react-router-dom"

const LoginPage = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // const [error,setError] = useState("");

    const navigate = useNavigate();

    const validate = () =>{
        if(!email)  {
            // setError("Email is empty.")
            return
        }
        if(!password){
            // setError("Invalid Password")
            return
        }
        return true
    }

    const { mutate, isLoading } = useLogin();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.warn({email,password})
        if(validate()) {
            mutate({email,password},{onSuccess:()=>{
                console.log("LOGIN ACTION ")
                navigate("/owner/quiz")
            }})
        };
    };



    return(
        <div className="flex flex-1 justify-center items-center min-h-screen">
            <div className="lg:w-5/12 w-11/12" >
                <div className="card w-full bg-base-100 shadow-xl lg:p-10 p-5 border-2" >
                    <article className="prose prose-slate">
                        <h2 className="text-center">Shwe Ywet Hla</h2>
                        <h5 className="text-center">Login with your admin credentials.</h5>
                        <BasicInput type="text" onChange={(val)=>{setEmail(val)}} label={ELABELS.email} placeholder={ELABELS.emailPlaceholder} />
                        <BasicInput type="password" onChange={(val)=>{setPassword(val)}} label={ELABELS.password} placeholder={ELABELS.passwordPlaceholder} />
                        <ResponsiveButton 
                            label={ELABELS.login} 
                            isLoading={isLoading}
                            onPress={(e)=>handleSubmit(e)} 
                            labelClass="text-white"
                            className='my-5 bg-primary' />
                        {/* <ResponsiveButton label={ELABELS.register} onPress={()=>{}}  /> */}
                    </article>
                </div>
            </div>
        </div>
    )
}

export default LoginPage