import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  const [usuario, setUsuario] = useState(() => {
    return localStorage.getItem('usuario') || ''
  })

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, usuario, setUsuario }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
