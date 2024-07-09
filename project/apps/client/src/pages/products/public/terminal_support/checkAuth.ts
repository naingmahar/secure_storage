import { ISecurtiyKey } from "../../../../types/models/Storage/SecurityKey"

export const TOKEN_STORAGE_KEY = "@token"
export const PRIVATE_STORAGE_KEY = "@private"
export const PUBLIC_STORAGE_KEY = "@public"

export function storeData({privateKey,publicKey}:ISecurtiyKey){
    localStorage.setItem(PRIVATE_STORAGE_KEY,privateKey)
    localStorage.setItem(PUBLIC_STORAGE_KEY,publicKey)
}

export function getAllKey() {
    let privateKey= localStorage.getItem(PRIVATE_STORAGE_KEY)||""
    let publicKey =localStorage.getItem(PUBLIC_STORAGE_KEY)||""
    let keys:ISecurtiyKey ={
      id:0,
      privateKey,
      publicKey
    }
    return {keys,status:privateKey&&publicKey}
}


export function storeAuth(token:string){
    localStorage.setItem(TOKEN_STORAGE_KEY,token) 
}

export function isAuthUser(){
    return localStorage.getItem(TOKEN_STORAGE_KEY)
}