import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({ text, value }) => {

  return (
    
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({ review }) => {

  const { good, neutral, bad } = review;
  const total = good + neutral + bad;
  const avg = parseFloat(((good * 1 + bad * -1) / total).toFixed(2))

  if (good > 0 || neutral > 0 || bad > 0) {
    return (

      <table border="2" >
        <thead>
          <tr>
            <th>Statistics</th>
          </tr>

        </thead>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={parseFloat((good / total * 100).toFixed(2)) + " %"} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <h4>No feedback given</h4>
    </div>
  )




}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>
        Give Feedback
      </h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics review={{ good, neutral, bad }} />

    </div>
  )
}

export default App