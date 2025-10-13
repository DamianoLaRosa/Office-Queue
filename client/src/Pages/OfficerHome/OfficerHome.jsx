import { useState } from 'react'
import styles from './OfficerHome.module.css'

function OfficerHome() {
  const [currentClient, setCurrentClient] = useState(null)

  return (
    <div className="page-container">
      <h1>Officer Dashboard</h1>
      <span>Current Client: {currentClient}</span>
      <button className="btn btn-primary">Next Client</button>
    </div>
  )
}

export default OfficerHome
