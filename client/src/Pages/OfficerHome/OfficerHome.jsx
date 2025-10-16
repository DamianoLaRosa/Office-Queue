import { useEffect, useState } from 'react'
import styles from './OfficerHome.module.css'
import { useParams } from 'react-router';
import API from '../../API/API.js';

function OfficerHome() {
  const [currentClient, setCurrentClient] = useState(null)
  const { officerId } = useParams();

  const getTickets = async () => {
    try {
      const ticket = await API.getNextTicketForCounter(officerId);
      setCurrentClient(ticket);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  };

  //useEffect(() => {
    //getTickets();
  //}, []);

  return (
    <div className="page-container">
      <h1>Officer Dashboard for Counter {officerId}</h1>
      <span>Current Client: {currentClient ? currentClient.ticket_id : "None"}</span>
      <button className="btn btn-primary" onClick={()=>getTickets()} >Next Client</button>
    </div>
  )
}

export default OfficerHome
