import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './routes/ProtectedRoutes'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

import ClientPage from './pages/client/MainClient'
import CreateClient from './pages/client/CreateClient'
import ViewClient from './pages/client/ViewClient'

import ServicesPage from './pages/ServicesPage'
import SuppliersPage from './pages/SuppliersPage'
import MainLayout from './components/layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route index element={<LoginPage />} />

        <Route path='/' element={<MainLayout />}>

          <Route path='home' element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          } />

          <Route path='clients' element={
            <ProtectedRoutes>
              <ClientPage />
            </ProtectedRoutes>
          } />

          <Route path='clients/new' element={
            <ProtectedRoutes>
              <CreateClient />
            </ProtectedRoutes>
          } />


          <Route path='clients/view/' element={
            <ProtectedRoutes>
              <ViewClient />
            </ProtectedRoutes>
          } />

          <Route path='services' element={
            <ProtectedRoutes>
              <ServicesPage />
            </ProtectedRoutes>
          } />

          <Route path='suppliers' element={
            <ProtectedRoutes>
              <SuppliersPage />
            </ProtectedRoutes>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
