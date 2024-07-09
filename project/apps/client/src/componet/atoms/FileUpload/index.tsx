import React, { useEffect } from "react";
import "./file.css"
import { Icon, IconKey } from "../icons";
// import ImgPreview, { IconPreview } from "./ImagePreview";
import { uploadImage } from "../../../feature/apiClient/Common";
import { RowContainer } from "../Container/FlexContainer";
import { EFileIcons } from "./FileIcon";
import { IconPreview } from "./ImagePreview";

const FileUpload = (props:{onChange:(img:[string])=>any,value?:[{url:string}],onFinshed:(message:string,isError:boolean)=>any}) => {

    const inputRef = React.useRef<React.LegacyRef<HTMLInputElement>| any>(null);
    const [dragActive, setDragActive] = React.useState(false);
    const [files,setFile] = React.useState<any[]>([])
    const [isUploading,setLoading] = React.useState(false)
    const [iconName,setIconName] = React.useState<EFileIcons>(EFileIcons.other)

    useEffect(()=>{
       if(props.value && props.value[0]) {
        setFile([props.value[0].url])
       }
    },[props.value])

  
    // handle drag events
    const handleDrag = function(e:any) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };


    // triggers when file is dropped
    const handleDrop = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // handleFiles(e.dataTransfer.files);

        handleFiles(e.dataTransfer.files)
        }
    };


    const handleFiles = async (data:{length:number,0:any}) => {
        for (let index = 0; index < data.length; index++) {
            //@ts-ignore
            const element = data[index];
            const elementArr= String(element.type).split("/")
            const fileNameArr= String(element.name).split(".")

            let icon:EFileIcons = EFileIcons.other

            //@ts-ignore
            if(fileNameArr[fileNameArr.length -1] && EFileIcons[fileNameArr[fileNameArr.length -1]])  icon = fileNameArr[fileNameArr.length -1]
            //@ts-ignore
            else if(elementArr[1] && EFileIcons[elementArr[1]]) icon = elementArr[1]
            //@ts-ignore
            else if(elementArr[0] && EFileIcons[elementArr[0]]) icon = elementArr[0]

            setIconName(icon)

            console.log("DATA",fileNameArr,icon)

            const formData = new FormData();
            formData.append("file", element);
            formData.append("path", "operation");
            formData.append("type", element.type);
            formData.append("key", Date.now()+"."+String(element.type).split("/")[1]);

            setLoading(true);
            setFile([])
            uploadImage(formData).then(data=>{
                props.onChange(data)
                setPreviewImage(element);
                setLoading(false)
            })
        }
    }

    // triggers when file is selected with click
    const handleChange = function(e:any) {
        e.preventDefault();
        console.warn("Hello")
        if (e.target.files && e.target.files[0]) {
        // at least one file has been selected so do something
        handleFiles(e.target.files);
        }
    };

    const setPreviewImage = (file:any) => {
        return new Promise((resolve,reject)=>{
            var reader = new FileReader();
            reader.onload = (e) => {
                // addImage(e.target?.result);
                setFile([e.target?.result])
                resolve(true)
                props.onFinshed("Successfully Uploaded",false)
            }
            reader.onerror = () => {
                props.onFinshed("Failed Upload",true)
                reject(false)
            } 
        reader.readAsDataURL(file);
        })
    }

    // const onRemoveImage = (delIndex:number) => {
    //     let temp:any[] = [];
    //     files.map((img,index)=>{
    //         if(index !== delIndex) temp.push(img)
    //     })
    //     setFile(temp)
    // }
  
    
    return (
        <div className="flex flex-1">
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={(e)=>handleChange(e)} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                    <Icon icon={IconKey.addIcon} active />
                </label>
                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form> 
            {
                files.map(()=>(
                    <IconPreview name={iconName} />
                    // <FileIcon name={iconName} />
                    //  <ImgPreview key={index}  url={url} onDelete={() => onRemoveImage(index)} />
                ))
            }
            {
                isUploading && (
                    <div id="form-file-upload">
                        <RowContainer className="justify-center items-center h-full border-2 rounded-xl">
                            <span className="loading loading-spinner loading-lg text-slate-500"></span>
                        </RowContainer>
                    </div>
                )
            }

        </div>
    )
}

export default FileUpload