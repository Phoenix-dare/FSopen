interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Parsed {
  arr: number[];
  target: number;
}

const parseValues = (args: string[]): Parsed => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 32) throw new Error("Too many arguments");

  const [, , ...val]: string[] = args;
  if (val.every((item) => !isNaN(Number(item)))) {
    const toNumber: number[] = val.map((item) => parseInt(item));
    const hour: number  = toNumber[toNumber.length -1];

    const [,...arr]: number[] = toNumber.reverse();
    return {
      arr: arr,
      target: hour,
    };
  } else {
    throw new Error("Invalid arguments : arguments must be number");
  }
};

const calculateExercises = (arr: number[], hours: number): Results => {
  const periodLength: number = arr.length;
  const trainingDays: number = arr.filter((num) => num !== 0).length;
  const average: number = arr.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= hours;

  const rating = (average: number, hours: number): number => {
    const deviation = average - hours;

    if (deviation >= 1) {
      return 5;
    } else if (deviation < 1 && deviation >= 0.5) {
      return 4;
    } else if (deviation < 0.5 && deviation >= 0) {
      return 3;
    } else if (deviation < 0 && deviation >= -0.5) {
      return 2;
    } else {
      return 1;
    }
  };

  const ratingDescription = (): string => {
    const getRating: number = rating(average, hours);
    if (getRating === 5) {
      return "Wohoo..Keep going champ!";
    } else if (getRating === 4) {
      return "Excellent! Keep it up";
    } else if (getRating === 3) {
      return "Good! Lets push forward";
    } else if (getRating === 2) {
      return "Come on! You can do better!";
    } else {
      return "No pain, No gain";
    }
  };

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating(average, hours),
    ratingDescription: ratingDescription(),
    target: hours,
    average: average,
  };
};

try {
  const { arr, target } = parseValues(process.argv);
  console.log(calculateExercises(arr, target));
} catch (error: unknown) {
  let errorMessage =
    "Try Again.Enter hours exercised each days  separated by space and your target as last argument";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;