const Header = ({ heading }) => {
  return (
      <h1>{heading}</h1>
  )
}

const Part = ({ parts, exercises }) => {
  return (
      <>
          <p>
              {parts} {exercises}
          </p>

      </>
  )
}
const Content = ({ course }) => {

  return (
      <>
          {
              course.parts.map(part => <Part key={part.id} parts={part.name} exercises={part.exercises} />)

          }
      </>

  )

}




const Course = ({ course }) => {
  
  return (
      <>
          <Header heading={course.name} />
          <Content course={course} />

      </>


  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      ]
  }

  return <Course course={course} />
}

export default App
