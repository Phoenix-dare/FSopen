const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts,exercises}) => {
  return (
    <>
      <p>
        {parts.part1} {exercises.exercises1}
      </p>
      <p>
        {parts.part2} {exercises.exercises2}
      </p>
      <p>
        {parts.part3} {exercises.exercises3}
      </p>
    </>

  )
}
const Total = ({exercises}) => {
  return (
    <>
      <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
    </>
  )
}




const App = () => {

  const course = 'Half Stack application development'
  const parts = {
    part1: 'Fundamentals of React',
    part2: 'Using props to pass data',
    part3: 'State of a component'
  }

  const exercises = {
    exercises1: 10,
    exercises2: 7,
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises}/>
    </div>
  )
}



export default App;
