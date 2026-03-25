import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/s3-proxy': {
        target: 'https://optics-management-storage.s3.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3-proxy/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Nhóm 1: Core React & Router
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Nhóm 2: Quản lý State & Fetching API
          'vendor-state': ['@tanstack/react-query', 'zustand', 'axios'],

          // Nhóm 3: Xử lý Form & Validation
          'vendor-form': ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Nhóm 4: Thư viện vẽ biểu đồ (Rất nặng)
          'vendor-charts': ['recharts'],

          // Nhóm 5: Thư viện AI / Computer Vision (Rất nặng)
          'vendor-mediapipe': [
            '@mediapipe/camera_utils',
            '@mediapipe/face_mesh',
            '@mediapipe/tasks-vision',
          ],

          // Nhóm 6: Các component UI từ Radix
          'vendor-radix': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
          ],

          // Nhóm 7: Three.js 3D rendering
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],

          // Nhóm 8: Icons và Utils nhỏ lẻ
          'vendor-ui': [
            'lucide-react',
            'sonner',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
        },
      },
    },
  },
});
