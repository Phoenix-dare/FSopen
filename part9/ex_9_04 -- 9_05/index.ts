import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});
app.get('/bmi', (_req, res) => {
  
  const { height,weight } = _req.query

  if(isNaN(Number(height)) || isNaN(Number(weight)) ){
    res.status(404).json('request failed:invalid arguments')

  }else if (height && weight){
    const BMI = calculateBmi(Number(height),Number(weight))
    res.status(200).json(BMI);
  }
  

  });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});