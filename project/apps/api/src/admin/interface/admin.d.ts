interface IAdmin{
    id?:number,
    name:string,
    email:string,
    password:string,
    isAdmin:boolean
}

interface IAdminLogin{
    id?:number,
    name:string,
    email:string,
    isAdmin:boolean
}



export  {IAdmin,IAdminLogin}