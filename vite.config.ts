import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ecommerse-with-react.js-ts-/',
})

// import { defineConfig } from 'vite';

// export default defineConfig({
  // base: '/ecommerse-with-react.js-ts-/', // استبدل REPO_NAME باسم مستودع GitHub الخاص بك
// });
