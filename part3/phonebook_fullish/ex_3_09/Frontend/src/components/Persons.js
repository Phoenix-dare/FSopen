import SinglePerson from './SinglePerson'
import Notifications from './Notifications'

const Persons = ({ persons, regex, deleteUser, message, errorStatus }) => {
    return (


        <div>
            <h3>
                Info
            </h3>
            {
                persons.filter(item => regex.test(item.name))
                    .map(item => <div key={item.id}><SinglePerson contact={item} />
                        <button onClick={() => deleteUser(item.id, item.name)}>delete</button>
                    </div>
                    )

            }
            <Notifications message={message} errorStatus={errorStatus} />

        </div>
    )
}
export default Persons;