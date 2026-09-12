import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Project from './pages/Project'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/:slug" element={<Project />} />
        <Route path="*" element={<Project />} />
      </Route>
    </Routes>
  )
}

export default App
