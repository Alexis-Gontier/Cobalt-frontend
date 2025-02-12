import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<h1 className="text-red-500">Home</h1>}/>
        <Route path="*" element={<h1>NotFound</h1>} />

      </Routes>
    </BrowserRouter>
  )
}
