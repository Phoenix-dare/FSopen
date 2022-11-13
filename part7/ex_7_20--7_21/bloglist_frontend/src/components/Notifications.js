import { useSelector } from 'react-redux'

const Notifications = () => {
    const message = useSelector((state) => state.notifications)
    return (
        <div
            className={
                message && message.type === 'error'
                    ? 'message bg-red-500'
                    : 'message bg-lime-400'
            }
        >
            <span className=' py-2 message'>
                {message !== null ? message.message : null}
            </span>
        </div>
    )
}
export default Notifications
