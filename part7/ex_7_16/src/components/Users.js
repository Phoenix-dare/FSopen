import { Link } from 'react-router-dom'

const Users = ({ allUsers }) => {
    return (
        <div className='users'>
            <h2>Users</h2>
            <h4>user&nbsp;&nbsp;&nbsp;&nbsp;blogs created</h4>

            {allUsers &&
                allUsers.map((user) => (
                    <div key={user.id}>
                        <li>
                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                            &nbsp; {user.blogs.length}
                        </li>
                    </div>
                ))}
        </div>
    )
}

export default Users
