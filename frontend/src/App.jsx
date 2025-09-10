import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './routes/ProtectedRoutes'

import WelcomePage from './pages/WelcomePage'
import HomePage from './pages/HomePage'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

import MainClient from './pages/client/MainClient'
import CreateClient from './pages/client/CreateClient'
import ViewClient from './pages/client/ViewClient'

import MainContract from './pages/contract/MainContract'
import CreateContract from './pages/contract/CreateContract'

import ServicesPage from './pages/ServicesPage'
import MainLayout from './components/layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />

        <Route path='/' element={<MainLayout />}>

          <Route path='home' element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          } />

          <Route path='clients' element={
            <ProtectedRoutes>
              <MainClient />
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

          <Route path='contracts' element={
            <ProtectedRoutes>
              <MainContract />
            </ProtectedRoutes>
          } />

          <Route path='contracts/new' element={
            <ProtectedRoutes>
              <CreateContract />
            </ProtectedRoutes>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
