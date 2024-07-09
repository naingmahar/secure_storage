import { IconType } from "react-icons";
import{FaBilibili,FaFileExcel,FaFileWord,FaFilePdf,FaFilePowerpoint,FaRegFileImage,FaFileVideo,FaFileAudio,FaFileCsv,FaAndroid,FaFileZipper}from"react-icons/fa6";
import{RiFileTextFill}from"react-icons/ri";

export const FileIcons:Record<EFileIcons,any>={
xlsx:FaFileExcel,
doc:FaFileWord,
docx:FaFileWord,
pdf:FaFilePdf,
pptx:FaFilePowerpoint,
image:FaRegFileImage,
video:FaFileVideo,
audio:FaFileAudio,
csv:FaFileCsv,
txt:RiFileTextFill,
text:RiFileTextFill,
application:FaAndroid,
zip:FaFileZipper,
rar:FaFileZipper,
gzip:FaFileZipper,
"7z":FaFileZipper,
other:FaBilibili
}



export enum EFileIcons{
    xlsx="xlsx",
    doc="doc",
    docx="docx",
    pdf="pdf",
    pptx="pptx",
    image="image",
    video="video",
    audio="audio",
    csv="csv",
    txt="txt",
    text="text",
    application="application",
    zip="zip",
    rar="rar",
    gzip="gzip",
    "7z"="7z",
    other="other"
}


// export const FileIcon = ({name}:{name:EFileIcons}) => {
//     return <FaFileExcel size={80} />
// }

type params = {
    name: EFileIcons;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
  };
  
  export const FileIcon = (params: params): JSX.Element => {
    const size = params.size || 80;
    const color = params.color || "black";
    const Icon: IconType = FileIcons[params.name];
    return (
      <Icon
        className={params.className}
        size={size}
        color={color}
        style={params.style}
      />
    );
  };