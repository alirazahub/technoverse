import React from 'react'
import Login from './views/Login'
import Register from './views/Register'
import Layout from './components/Layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './auth/PrivateRoutes'
import ScrollToTop from './utils/ScrollToTop'
import Dashboard from './views/Dashboard'
import Education from './components/Education/Education'
import Home from './components/Home/Home'
import Community from './views/Community'

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/community' element={<Community />} />
            </Route>
            <Route exact path='/' element={<Home />} />
            <Route path='/education' element={<Education />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App
