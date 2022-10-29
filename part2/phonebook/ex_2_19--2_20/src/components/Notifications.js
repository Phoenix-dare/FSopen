import './Notifications.css'
const Notifications = ({ message,errorStatus }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div  className={errorStatus ? 'error': 'success'}>
        {message}
      </div>
    )
  }
  export default Notifications;