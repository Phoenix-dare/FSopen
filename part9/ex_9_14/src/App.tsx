const App = () => {
  interface CoursePart {
    name: string;
    exerciseCount: number;
  }
  interface CourseParts {
    courseParts: CoursePart[];
  }

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const Header = ({ courseName }: { courseName: string }) => (
    <h1>{courseName}</h1>
  );

  const Content = ({ courseParts }: CourseParts) => {
    return (
      <>
        {courseParts.map((course) => (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        ))}
      </>
    );
  };

const Total = ({courseParts}:CourseParts) => {
  return(
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )

}
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}/>
      
    </div>
  );
};

export default App;
