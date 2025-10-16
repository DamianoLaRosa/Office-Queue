import { Outlet, useNavigate } from 'react-router-dom';


function SelectionHome() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Select Officer or Customer</h1>
      <div>
        <button onClick={() => navigate('/selection/officer')} className="btn btn-primary">Go to Officers Page</button>
        <button onClick={() => navigate('/customer')} className="btn btn-primary" style={{ marginLeft: '10px' }}>Go to Customers Page</button>
      </div>
    </div>
  )
}

export default SelectionHome
