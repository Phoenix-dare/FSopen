const Filter = ({ inputSearch }) => {
    return (
        <div>
            <span>
                Filter by : <input onChange={inputSearch} />

            </span>
        </div>
    )
}
export default Filter;