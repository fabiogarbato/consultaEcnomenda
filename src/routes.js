import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './View/Home'
import DHL from './View/DHLConsulta'
import { AuthProvider } from './AuthProvider'

function RoutesApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DHL" element={<DHL />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default RoutesApp
