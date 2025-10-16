import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CustomerHome from './Pages/CustomerHome/CustomerHome'
import OfficerHome from './Pages/OfficerHome/OfficerHome'
import SelectionHome from './Pages/SelectionHome/SelectionHome'
import OfficerSelection from './Pages/SelectionHome/OfficerSelection'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/officer/:officerId" element={<OfficerHome />} />
        <Route path="/" element={<SelectionHome />}/> 
        <Route path="/selection/officer" element={<OfficerSelection />} />
      </Routes>
    </Router>
  )
}

export default App
