import React, {useState, useEffect} from "react";
import API from "../../API/API.js";
import { useNavigate } from "react-router";



function OfficerSelection() {

  const navigate = useNavigate();

  const [counters, setCounters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCounters = async () => {
    try {
      setLoading(true);
      const countersData = await API.getCounters();
    setCounters(countersData);
    } catch (error) {
      setError(error);
      console.error("Failed to fetch counters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCounters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Officer Selection Page</h2>
      <p>Available counters:</p>
      <ul>
        {counters && counters.map(counter => (
            <button onClick={() => navigate(`/officer/${counter.counter_id}`)} key={counter.counter_id} className="btn btn-primary" style={{margin: '5px'}}>
                {counter.name}
            </button>
        ))}
      </ul>
    </div>
  );
}

export default OfficerSelection