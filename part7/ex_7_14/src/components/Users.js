import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector((state) => state.users)
    return (
        <div className='users'>
            <h2>Users</h2>
            <h4>user&nbsp;&nbsp;&nbsp;&nbsp;blogs created</h4>

            {users &&
                users.map((user) => (
                    <div key={user.id}>
                        <p>
                            {user.name} &nbsp; {user.blogs.length}
                        </p>
                    </div>
                ))}
        </div>
    )
}

export default Users
