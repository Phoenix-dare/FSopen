import { useSelector } from 'react-redux'

const Notifications = ({ errorStyle, successStyle }) => {
    const message = useSelector((state) => state.notifications)
    return (
        <>
            <span
                className='message'
                style={
                    message && message.type === 'error'
                        ? errorStyle
                        : successStyle
                }
            >
                {message !== null ? message.message : null}
            </span>
        </>
    )
}
export default Notifications
