import { Icon, IconKey, IconsSize } from "../icons";
import { EFileIcons, FileIcon } from "./FileIcon";
import "./file.css"

const ImgPreview = (props:{url:string,onDelete:()=>void}) => {
    return(
        <div id="form-file-upload">
            <img src={props.url} className="w-full h-full rounded-lg relative" />
            <div onClick={() => props.onDelete()}>
                <Icon icon={IconKey.cross} size={IconsSize.sm} className="absolute top-1 right-1 text-cyan-50 bg-black bg-opacity-10 rounded-full" />
            </div>
        </div>
    )
}


export const IconPreview = (props:{name:EFileIcons}) => {
    return(
        <div id="form-file-upload" className="flex justify-center items-center">
            <FileIcon name={props.name} />
        </div>
    )
}



export default ImgPreview;