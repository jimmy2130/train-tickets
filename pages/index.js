import { useState} from 'react'
import styled from 'styled-components'
import Select from '../src/components/Select'
import DateInput from '../src/components/DateInput'
import TimeInput from '../src/components/TimeInput'
import Result from '../src/components/Result'
import Spacer from '../src/components/Spacer'
import { COLORS, WEIGHTS, STATIONS } from '../src/constants'

export default function Home() {
  const [dTime, setDTime] = useState([])
  const fetchDepartureTime = async (event) => {
    event.preventDefault()

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
    setDTime(result.dTime);
  }

  const [start, setStart] = useState(STATIONS.taipei);
  const [end, setEnd] = useState(STATIONS.kaohsiung);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  return (
    <Wrapper>
      <FormWrapper>
        <Form onSubmit={fetchDepartureTime}>
          <Select
            label="出發站"
            value={start}
            onChange={(ev) => setStart(ev.target.value)}
          >
              <option value={STATIONS.taipei}>台北</option>
              <option value={STATIONS.hsincue}>新竹</option>
              <option value={STATIONS.taichung}>台中</option>
              <option value={STATIONS.tainan}>台南</option>
              <option value={STATIONS.kaohsiung}>高雄</option>
          </Select>
          <Spacer size={16} />
          <Select
            label="抵達站"
            value={end}
            onChange={(ev) => setEnd(ev.target.value)}
          >
              <option value={STATIONS.taipei}>台北</option>
              <option value={STATIONS.hsincue}>新竹</option>
              <option value={STATIONS.taichung}>台中</option>
              <option value={STATIONS.tainan}>台南</option>
              <option value={STATIONS.kaohsiung}>高雄</option>
          </Select>
          <Spacer size={16} />
          <DateInput
            label="日期"
            setYear={setYear}
            setMonth={setMonth}
            setDay={setDay}
          >
          </DateInput>
          <Spacer size={16} />
          <TimeInput
            label="出發時間"
            setHour={setHour}
            setMinute={setMinute}
          >
          </TimeInput>
          <Spacer size={40} />
          <SubmitButton type="submit">送出</SubmitButton>
        </Form>
      </FormWrapper>
      <ResultWrapper>
        <Result dTime={dTime} />       
      </ResultWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;

  @media(max-width: 1100px) {
    flex-direction: column;
  }
`

const FormWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  border: 2px solid ${COLORS.primary};
  width: clamp(300px, 75%, 450px);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
`

const SubmitButton = styled.button`
  border: none;
  padding: 12px;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: ${WEIGHTS.medium};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: ${COLORS.darkerPrimary};
  }
`
const ResultWrapper = styled.div`
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.gray[100]};
`



