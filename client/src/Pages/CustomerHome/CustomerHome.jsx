import styles from './CustomerHome.module.css'

function CustomerHome() {
  return (
    <div className="page-container">
      <h1>Select your service</h1>
      <div className={styles.serviceList}></div>
    </div>
  )
}

export default CustomerHome
