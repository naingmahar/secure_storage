import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:"127.0.0.1",
    cors:true,
    port:8088,
    origin:"http://127.0.0.1:8088"
  }
})
