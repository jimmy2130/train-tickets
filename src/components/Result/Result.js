import styled from 'styled-components'
import { COLORS, WEIGHTS } from '../../constants'

const Result = ({ dTime }) => {
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