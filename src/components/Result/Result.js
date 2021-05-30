import * as React from 'react'
import styled from 'styled-components'
import { COLORS, WEIGHTS } from '../../constants'

const Result = ({ input, submit, resetSubmit }) => {
  const {start, end, year, month, day, hour, minute} = input
  const [dTime, setDTime] = React.useState([])

  const fetchDepartureTime = async () => {
    const res = await fetch('/api/departure', {
      body: JSON.stringify({
        spoint: start,
        epoint: end,
        date: `${year}-${month}-${day}`,
        time: `${hour}:${minute}`
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    return result
  }

  React.useEffect(() => {
    if(submit) {
      resetSubmit()
      fetchDepartureTime().then(result => setDTime(result.dTime))
    }
  }, [submit])

  return(
    <>
      <FirstResult>{dTime[0]}</FirstResult>
      <OtherResultGroup>
      {
        dTime.slice(1).map((time, index) => {
          return (
            <Time key={index}>{time}</Time>
          )
        })
      }
      </OtherResultGroup>
    </>
  )
};

const FirstResult = styled.h1`
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.bold};
  font-size: 7rem;
`

const OtherResultGroup = styled.ul`
  display: flex;
`

const Time = styled.li`
  border: 2px solid ${COLORS.primary};
  border-radius: 4px;
  padding: 8px;
  margin-right: 4px;

  &:last-child {
    margin-right: 0;
  }
`

export default Result;