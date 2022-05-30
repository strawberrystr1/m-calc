import styled from 'styled-components'

export const PageLayout = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  font-family: ${({ theme }) => theme.font};
`
export const FlexRowSB = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
