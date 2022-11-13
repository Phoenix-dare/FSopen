import { Link } from 'react-router-dom'

const Users = ({ allUsers }) => {
    return (
        <div className='flex flex-col items-center bg-cyan-200 py-2 mt-2 mb-2 border-amber-100 border-4 shadow-md shadow-emerald-300 rounded-md divide-neutral-400'>
            <h2 className='text-2xl font-bold'>Users</h2>
            <h4 className='text-xl'>
                user&nbsp;&nbsp;&nbsp;&nbsp;blogs created
            </h4>

            {allUsers &&
                allUsers.map((user) => (
                    <div key={user.id} className='flex flex-row'>
                        <li>
                            <Link
                                to={`/user/${user.id}`}
                                className='text-xl underline'
                            >
                                {user.name}{' '}
                            </Link>
                            &nbsp; {user.blogs.length}
                        </li>
                    </div>
                ))}
        </div>
    )
}

export default Users
