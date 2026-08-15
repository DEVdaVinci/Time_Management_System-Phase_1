import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react()
    ],

    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT_NUMBER) || 5173,
      watch: {
        usePolling: true,
      },
    },
      
  }
})