import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CustomerHome from './Pages/CustomerHome/CustomerHome'
import OfficerHome from './Pages/OfficerHome/OfficerHome'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/officer" element={<OfficerHome />} />
      </Routes>
    </Router>
  )
}

export default App
