import styles from '../styles/Home.module.css'
import { useState} from 'react';

export default function Form() {
  const [dTime, setDTime] = useState([])

  const fetchDepartureTime = async event => {
    // console.log(event.target)
    event.preventDefault()

    const res = await fetch('/api/departure', {
      body: JSON.stringify({
        spoint: event.target.spoint.value,
        epoint: event.target.epoint.value,
        date: event.target.date.value,
        time: event.target.time.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    // console.log(result.user);
    setDTime(result.dTime);
  }
  return (
    <>
      <form onSubmit={fetchDepartureTime}>
        <div>
          <label htmlFor="spoint">起點站</label>
          <select name="spoint">
            <option value="0">台北</option>
            <option value="1">新竹</option>
            <option value="2">台中</option>
            <option value="3">台南</option>
            <option value="4">高雄</option>
          </select>
        </div>
        <div>
          <label htmlFor="epoint">終點站</label>
          <select name="epoint">
            <option value="0">台北</option>
            <option value="1">新竹</option>
            <option value="2">台中</option>
            <option value="3">台南</option>
            <option value="4">高雄</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">日期</label>
          <input type="date" name="date" required/>
        </div>
        <div>
          <label htmlFor="time">出發時間</label>
          <input type="time" name="time" required/>
        </div>
        <input type="submit" value="Submit"/>
      </form>
      <div>{dTime.join(',')}</div>
    </>
  )
}
