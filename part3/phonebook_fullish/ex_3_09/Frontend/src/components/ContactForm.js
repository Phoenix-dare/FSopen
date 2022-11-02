const ContactForm = ({ addContact, inputName, inputNumber, newName, newNumber }) => {

    return (
        <>
            <form onSubmit={addContact}>
                <h3>Add new contact</h3>
                <div>
                    name: <input value={newName} onChange={inputName} />

                </div>
                <div>
                    number: <input value={newNumber} onChange={inputNumber} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

        </>



    )
}

export default ContactForm;
