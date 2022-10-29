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
export default Course;