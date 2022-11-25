interface Results {
   periodLength: number,
   trainingDays: number,
   success: boolean,
   rating: number,
   ratingDescription: string,
   target: number,
   average: number
}

const calculateExercises = (arr: number[], hours: number): Results => {
   const periodLength: number = arr.length
   const trainingDays: number = arr.filter(num => num !== 0).length
   const average: number = arr.reduce((a, b) => a + b, 0) / periodLength
   const success: boolean = average >= hours

   const rating = (average: number, hours: number): number => {
      const deviation = average - hours

      if (deviation >= 1) {
         return 5
      } else if (deviation < 1 && deviation >= 0.5) {
         return 4
      } else if (deviation < 0.5 && deviation >= 0) {
         return 3
      } else if (deviation < 0 && deviation >= -0.5) {
         return 2
      } else {
         return 1
      }


   }

   const ratingDescription = (): string => {
      const getRating: number = rating(average, hours)
      if (getRating === 5) {
         return 'Wohoo..Keep going champ!'
      } else if (getRating === 4) {
         return 'Excellent! Keep it up'
      } else if (getRating === 3) {
         return 'Good! Lets push forward'
      } else if (getRating === 2) {
         return 'Come on! You can do better!'
      } else {
         return "No pain, No gain"
      }
   }




   return {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating(average, hours),
      ratingDescription: ratingDescription(),
      target: hours,
      average: average
   }
}

console.log(calculateExercises([0, 0, 0, 9, 5, 3, 3], 8));




