import { RouterProvider } from "react-router-dom"
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { router } from "@/routes" // Import biến router vừa tạo

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Đây là cú pháp mới chuẩn theo link bạn gửi: */}
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App