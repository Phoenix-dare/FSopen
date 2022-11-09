import { filterBy } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = ( props ) => {
  

    const handleChange = (event) => {
      const filterInput=event.target.value
      props.filterBy(filterInput)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  const mapDispatchToProps = {
   filterBy, 
  }
  
  const ConnectedFilter = connect(null,mapDispatchToProps)(Filter)
  export default ConnectedFilter