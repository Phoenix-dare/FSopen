import SinglePerson from './SinglePerson'

const Persons = ({ persons,regex }) => {
    return (


        <div>
            <h3>
                Info
            </h3>
            {
                persons.filter(item => regex.test(item.name))
                        .map(item => <SinglePerson key={item.name} contact={item}/>)

            }

        </div>
    )
}
export default Persons;