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
              course.map(part => <Part key={part.id} parts={part.name} exercises={part.exercises} />)

          }
      </>

  )

}


const Total = ({ parts }) => {
  
  const total = parts.reduce((acc, item) => acc + item.exercises, 0)
  return (
      <p>total of {total} excercises </p>
  )
}

const Course = ({ courses }) => {
  
  return (
      <>
          {

              courses.map(course =>

                  <div key={course.id}>
                      <Header  heading={course.name} />
                      <Content  course={course.parts} />
                      <Total  parts={course.parts} />
                  </div>

              )
          }

      </>





  )

}

const App = () => {
  const courses= [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App
