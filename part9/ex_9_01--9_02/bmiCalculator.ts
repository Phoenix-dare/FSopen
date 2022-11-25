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

console.log('BMI',calculateBmi(166,65));