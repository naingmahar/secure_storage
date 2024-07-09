import { useEffect, useState } from "react";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";
import "./styles.css";
import { fetchFiles, fetchKey, fetchLogin, fetchRegister } from "../../../feature/apiClient/storage/Auth";
import IUser from "@repo/common";
import { ColumnContainer, RowContainer } from "../../../componet/atoms/Container/FlexContainer";
import FileUpload from "../../../componet/atoms/FileUpload";
import { RemiderAlert } from "../../../componet/atoms/Alert";
import { getAllKey, isAuthUser, storeAuth, storeData } from "./terminal_support/checkAuth";
import { FileListUi } from "./terminal_support/file_list";
import { IFile } from "../../../types/models/Storage/Files";

export function Terminal() {

  const [state,setState] = useState<{name?:string,email?:string}>(); 
  const [showUpload,setShowUpload] = useState(false); 
  const [showFiles,setShowFiles] = useState(false); 
  const [files,setFiles] = useState<IFile[]>([]); 
  const [reminderAlert,setReminderAlert] = useState<{message:string,isError:boolean,show:boolean}>({isError:false,message:'',show:false}); 

  const showReminder = (message:string,isError:boolean) => {
    setReminderAlert({message,isError,show:true})
    setTimeout(()=>{
      setReminderAlert({isError:false,message:'',show:false})
    },3000)
  }

  let interval:any; 
  let componetKey:string;
  function createLoading(label:string){
    componetKey = "loading_"+Math.floor(Math.random()*1200000)
    interval = setInterval(()=>{
      const loopTag = document.getElementById(componetKey)
      loopTag?.append(".")
    },100)
    return <span id={componetKey} className="loop_text">{`>>> ${label} ...`}</span>
  }


  function stopLoading(message:string){
    clearInterval(interval)
    const loopTag = document.getElementById(componetKey)
    setTimeout(()=>{
      /** @ts-ignore */
      loopTag.innerHTML = `>>> ${message} !`
    },1000)
  }


  function createKey(){
    fetchKey()
        .then((data)=>{
          storeData(data.data.data)
        })
        .catch(err=>"Error "+err)
  }

  function _login(username:string,cb:(message:string)=>void){
    fetchLogin({username,password:getAllKey().keys.publicKey})
        .then((data)=>{
          storeAuth(data.data.data.access_token)
          cb("Login Success");
        })
        .catch(err=>{cb(err)})
  }

  function fileList(cb:(message:string)=>void){
    fetchFiles()
        .then((data)=>{
          setFiles(data.data.data)
          cb("Login Success");
        })
        .catch(err=>{cb(err)})
  }

  function createUser(state:{name:string,email:string},cb:()=>any){
    if(state?.email && state.name){
      let user:IUser = {email:state.email,name:state.name,publicKey:getAllKey().keys.publicKey}
      fetchRegister(user)
        .then(()=>{cb()})
        .catch(err=>"Error "+err)
    }else{
      cb()
    }
  }


  useEffect(()=>{
    if(!getAllKey().status) {
      createKey()
    }
  },[])

  // Define commands here
  const commands = {

    name: (prompt:string) => {
      setState((oldState)=>({...oldState,...{name:prompt}}))
      return `Who is your email/phone? (eg. username something)?`
    },
    username: (prompt:string) => {
      let param = {name:state?.name||"",email:prompt} 
      setState(param)
      createUser(param,()=>stopLoading("Successfully created your account"))
      return createLoading("Creating User");
    },

    login:(username:string)=>{
      _login(username,(msg)=>stopLoading(msg))
      return createLoading("Authenticating");
    },
    hide_files:()=>{
      setShowFiles(false)
    },
    hide_upload:()=>{
      setShowUpload(false)
    },
    show_upload:()=>{
      if(isAuthUser()) {
        setShowUpload(true)
        return `>>>Okay sir`
      }else{
        return `>>>Sorry, you can't access!`
      }
    },

    show_files:()=>{
      if(isAuthUser()) {
        setShowFiles(true)
        fileList(()=>stopLoading("Successfully fetch your files"))
        return createLoading("Fetching Files")
      }else{
        return `>>>Sorry, you can't access!`
      }
    }
  };

  const welcomeMessage = (
    <span>
      <img src="https://cdn-icons-png.flaticon.com/512/9963/9963180.png" width={300} height={"auto"} /> 
      <br />
      I am Ocean Storage, Secure Storage and Easy Share System. Thanks for using.<br /><br />
      {
        // getAllKey().status ? "Please set security key (Use req)" : 
        "Please type your name  (Use name **** ) Or Login (Use login)"
      }
      <br />
    </span>
  );


  return (
    <div className="w-screen h-screen p-5">
      
    {reminderAlert.show && <RemiderAlert isError={reminderAlert.isError} message={reminderAlert.message} />}

        <RowContainer className="justify-center">
          <TerminalContextProvider>
              <ReactTerminal
                  commands={commands}
                  showControlBar
                  welcomeMessage={welcomeMessage}
                  themes={{
                      "my-custom-theme": {
                      themeBGColor: "#272B36",
                      themeToolbarColor: "#DBDBDB",
                      themeColor: "#17a92d",
                      themePromptColor: "#17a92d"
                      }
                  }}
                  defaultHandler={(command:string, commandArguments:string) => {
                      return `${command} passed on to default handler with arguments ${commandArguments}`;
                    }}
                  
                  theme="my-custom-theme"
                  />
          </TerminalContextProvider>
          {
            showUpload && 
            <ColumnContainer className="items-center justify-center  pt-10 mt-20">
              <div className="mb-10">
                <FileUpload onChange={()=>{}} onFinshed={(message,isError)=>showReminder(message,isError)}  />
              </div>
              <p className="label-text"><b>Click to upload</b> or drag and drop</p>
            </ColumnContainer>
          }
          {
            showFiles && <FileListUi param={files}  />
          }
        </RowContainer>
    </div>
  );
}