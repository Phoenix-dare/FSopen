interface Values {
    height : number;
    weight : number;
  }
  
  const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  
  
  
const calculateBmi = (height:number,weight:number):string =>{
const BMI :number = weight*10000/(height*height)

    switch(true) {
        case BMI<18:
            return `Underweight - ${BMI.toFixed(2)}-(Seek medical help,eat healthy foods)`
        case BMI >= 18 && BMI <=25:
            return `Normal - ${BMI.toFixed(2)}-(Maintain healthy diet and lifestyle)`
        case BMI > 25 && BMI <=30:
            return `Overweight - ${BMI.toFixed(2)}-(Eat right,excercise and modify your lifestyle)`
        case BMI > 30:
            return `Obese - ${BMI.toFixed(2)}-(Seek medical help.Try restict calorie intake,excercise and follow healthy lifestyle)`

            default:
                return `Your BMI is -${BMI.toFixed()}`

    }
}



try {
    const {height,weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Try Again.Enter your height followed by weight separated by a space'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  } 