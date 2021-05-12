import GlobalStyles from '../src/components/GlobalStyles';
import styled from 'styled-components'

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <GlobalStyles />
      <Component {...pageProps} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
`