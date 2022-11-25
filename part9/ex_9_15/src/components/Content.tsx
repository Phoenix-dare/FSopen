import Part from "./Part";
import { CoursePart } from "../types";


const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return(
<div>
{courseParts.map((course) =>(
<div key={course.name}>
<Part  course={course} />
</div>

)) 
}

</div>
   
  )
 
 
};

export default Content;
