const Notifications = ({ message,errorStyle,successStyle }) => {
  return (
    <>
      <span style={(message && message.type === 'error') ? errorStyle : successStyle}>
        {message !== null ? message.message : null
        }</span>

    </>
  )
}
export default Notifications