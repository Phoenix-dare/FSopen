import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return (
        <>
          <h2>{course.name}</h2>
          <span>type : {course.type}</span>
          <p> {course.description}</p>
          <p>Number of excercises{course.exerciseCount} </p>
        </>
      );

    case "groupProject":
      return (
        <>
          <h2>{course.name}</h2>
          <span>type : {course.type}</span>
          <p>Group project count: {course.groupProjectCount}</p>
          <p>Number of excercises: {course.exerciseCount} </p>
        </>
      );

    case "submission":
      return (
        <>
          <h2>{course.name}</h2>
          <span>type : {course.type}</span>
          <p> {course.description}</p>
          <p>Number of excercises{course.exerciseCount} </p>
          <a href={course.exerciseSubmissionLink}>Submission Link</a>
        </>
      );
    case "special":
      return (
        <>
          <h2>{course.name}</h2>
          <span>type : {course.type}</span>
          <p> {course.description}</p>
          <p>Number of excercises{course.exerciseCount} </p>
          <p>{course.requirements[0]},{course.requirements[1]}</p>
        </>
      );

    default:
      return assertNever(course);
  }
};
export default Part;
