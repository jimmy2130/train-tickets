import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';


const DateInput = ({ label, onYearChange, onMonthChange, onDayChange }) => {
  return (
    <Wrapper>
      <VisibleLabel>{label}</VisibleLabel>
      <InputWrapper>
        <YearInput
          placeholder="YYYY"
          maxLength="4"
          onChange={onYearChange}
          required
        ></YearInput>
        <Slash>/</Slash>
        <MonthInput
          placeholder="MM"
          maxLength="2"
          onChange={onMonthChange}
          required
        ></MonthInput>
        <Slash>/</Slash>
        <DayInput
          placeholder="DD"
          maxLength="2"
          onChange={onDayChange}
          required
        ></DayInput>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
`;

const VisibleLabel = styled.span`
  color: ${COLORS.gray[700]};
  margin-left: 16px;
  margin-bottom: 4px;
  font-size: calc(12 / 16 * 1rem);
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${COLORS.gray[100]};
  color: ${COLORS.gray[900]};
  &:hover {
    background: ${COLORS.darkergray100};
  }
`;

const InputBase = styled.input`
  border: none;
  background: inherit;
  color: inherit;
  height: 24px;
  font-weight: ${WEIGHTS.medium};
  font-size: 1rem;
  color: ${COLORS.gray[900]};
  &::placeholder {
    font-weight: ${WEIGHTS.normal};
    color: ${COLORS.gray[500]};
  }
`;

const YearInput = styled(InputBase)`
  width: 48px;
  margin-right: 4px;
`;

const MonthInput = styled(InputBase)`
  width: 32px;
  margin-left: 10px;
  margin-right: 4px;
`;

const DayInput = styled(InputBase)`
  width: 32px;
  margin-left: 10px;
`;

const Slash = styled.div`
  font-size: 0.8rem;
  border: none;
  margin-top: 3px;
  background: inherit;
  color: ${COLORS.gray[500]};
`;

export default DateInput;
