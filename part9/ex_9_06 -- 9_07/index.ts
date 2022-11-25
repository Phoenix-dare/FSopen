import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});
app.get('/bmi', (_req, res) => {
  
  const { height,weight } = _req.query;

  if(isNaN(Number(height)) || isNaN(Number(weight)) ){
    res.status(404).json('request failed:invalid arguments');

  }else if (height && weight){
    const BMI = calculateBmi(Number(height),Number(weight));
    res.status(200).json(BMI);
  }
  

  });

  app.post('/exercises',(_req,res)=> {


    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyHours :number[] = _req.body.dailyHours;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target :number = _req.body.target;
    if(!dailyHours || !target){

      res.status(404).json({error:"Missing arguments"});

    }else if (dailyHours.every((item :number) => !isNaN(Number(item))) && typeof target=== 'number') {

    const report = calculateExercises(dailyHours,target);
    res.status(200).json(report);

    }else{
      res.status(404).json({error:"Invalid arguments:Arguments should be number"});

    }

  });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});