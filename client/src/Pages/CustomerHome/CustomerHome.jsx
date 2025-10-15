import { useState, useEffect } from "react";
import styles from "./CustomerHome.module.css";
import API from "../../API/API.js";

function CustomerHome() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [createdTicket, setCreatedTicket] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await API.getServices();
        setServices(servicesData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = async (serviceId) => {
    try {
      const ticket = await API.createTicket(serviceId);
      console.log(ticket);
      setCreatedTicket(ticket);
      setNotification(null); // Clear any existing notifications
    } catch (err) {
      setNotification({
        type: "error",
        message: `Failed to create ticket: ${err.message}`,
      });
      // Auto-hide error notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
      console.error("Failed to create ticket:", err);
    }
  };

  const handleBackToServices = () => {
    setCreatedTicket(null);
    setNotification(null);
  };

  // Show ticket display if ticket was created
  if (createdTicket) {
    return (
      <div className={styles.ticketDisplay}>
        <div className={styles.ticketContainer}>
          <h1 className={styles.ticketTitle}>Your Ticket</h1>
          <div className={styles.ticketNumber}>{createdTicket.ticket_id}</div>
          <button className="btn btn-primary" onClick={handleBackToServices}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <h1>Select your service</h1>
        <div className={styles.serviceList}>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Select your service</h1>
        <div className={styles.serviceList}>
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Available Services</h1>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <span className={styles.notificationMessage}>
            {notification.message}
          </span>
          <button
            className={styles.closeButton}
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.serviceList}>
        {services.map((service) => (
          <div
            key={service.service_id}
            className={styles.serviceCard}
            onClick={() => handleServiceSelect(service.service_id)}
          >
            <div className={styles.serviceInfo}>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceTime}>
                Average time: {service.avg_service_time} minutes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;
