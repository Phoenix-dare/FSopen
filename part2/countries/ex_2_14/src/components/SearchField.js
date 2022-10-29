
const SearchField = ({handleSearch}) => {
return(<div id="search">
        Find countries<input onChange={handleSearch} />
      </div>
)
}
export default SearchField;
