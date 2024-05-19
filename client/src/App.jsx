import React from 'react'
import Login from './views/Login'
import Register from './views/Register'
import Layout from './components/Layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './auth/PrivateRoutes'
import ScrollToTop from './utils/ScrollToTop'
import Dashboard from './views/Dashboard'
import EducationalHub from './components/EducationalHub/EducationalHub'
import Home from './components/Home/Home'
import ArticleDetails from './components/EducationalHub/ArticleDetails'

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/' element={<Home />} />
            <Route path='/educational-hub' element={<EducationalHub />} />
            <Route path='/article-details/:id' element={<ArticleDetails />} />
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
