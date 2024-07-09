import { FC } from "react"
import { EFileIcons, FileIcon } from "../../../../componet/atoms/FileUpload/FileIcon"

export const FileListUi:FC<{param:{name:string,path:string}[]}> = (props)=> {
    
    const FILE_BASE_URL = "https://lclb.s3.ap-southeast-1.amazonaws.com/"

    function downFn(url:string) {
        const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!pattern.test(url)) {
            // errMsg.textContent = "Wrong URL Entered";
            // dBtn.innerText = "Download File";
            return;
        }
        // errMsg.textContent = "";
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network Problem");
                }
                return res.blob();
            })
            .then((file) => {
                const ex = extFn(url);
                let tUrl = URL.createObjectURL(file);
                const tmp1 = document.createElement("a");
                tmp1.href = tUrl;
                tmp1.download = `downloaded_file.${ex}`;
                document.body.appendChild(tmp1);
                tmp1.click();
                // dBtn.innerText = "Download File";
                URL.revokeObjectURL(tUrl);
                tmp1.remove();
            })
            .catch(() => {
                // errMsg.textContent =
                //     "Cannot Download Restricted Content!";
                // dBtn.innerText = "Download File";
            });
    }
    function extFn(url:string) {
        const match = url.match(/\.[0-9a-z]+$/i);
        return match ? match[0].slice(1) : "";
    }
    
    return(
        <div className="grid lg:px-5 lg:grid-cols-2 gap-4 sm:grid-cols-6 md:grid-cols-6 max-w-full">
            {
                props.param.map((row)=>(
                    <div onClick={()=>{downFn(FILE_BASE_URL+row.path+"/"+row.name)}} className="card bg-base-100 shadow-md p-5 mb-5 h-52 flex justify-center items-center">
                        <figure><FileIcon name={EFileIcons.other} /></figure>
                        <div className="card-body px-0 py-0">
                            <div className="bg-zinc-400 bg-opacity-10 px-5 py-2 my-2 rounded-lg">
                                <p>{row.name}</p>
                            </div>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    )
}