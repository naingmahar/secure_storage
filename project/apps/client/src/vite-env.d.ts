/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_FILE_BASE_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }