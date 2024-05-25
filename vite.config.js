import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    base: '/react-firebase-app.io/', // Specify the correct base URL
    server: {
      port: 3000,
    },
    optimizeDeps: {
      include: ['react-helmet-async']
    }
  };
});
