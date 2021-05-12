import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';


const TimeInput = ({ label, setHour, setMinute, ...delegated }) => {
  return (
    <Wrapper>
      <VisibleLabel>{label}</VisibleLabel>
      <InputWrapper>
        <HourInput
          placeholder="HH"
          maxLength="2"
          onChange={(ev) => setHour(ev.target.value)}
          required
        ></HourInput>
        <Colon>:</Colon>
        <MinuteInput
          placeholder="MM"
          maxLength="2"
          onChange={(ev) => setMinute(ev.target.value)}
          required
        ></MinuteInput>
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

const HourInput = styled(InputBase)`
  width: 32px;
  margin-right: 4px
`;

const MinuteInput = styled(InputBase)`
  width: 32px;
  margin-left: 14px;
`;

const Colon = styled.div`
  font-size: 1rem;
  border: none;
  margin-top: -1px;
  background: inherit;
  color: ${COLORS.gray[500]};
`;

export default TimeInput;
