import SinglePerson from './SinglePerson'

const Persons = ({ persons,regex,deleteUser,message }) => {
    return (


        <div>
            <h3>
                Info
            </h3>
            {
                persons.filter(item => regex.test(item.name))
                        .map(item => <div key={item.id}><SinglePerson  contact={item} />
                        <button onClick={() => deleteUser(item.id,item.name)}>delete</button>
                        </div>
                        )

            }
            {
                message && (<p>{message}</p>) 
            }

        </div>
    )
}
export default Persons;