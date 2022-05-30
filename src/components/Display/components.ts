import styled from 'styled-components'

export const DisplayWrapper = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  color: ${({ theme }) => theme.fontColor};
  padding: 0 50px;
  font-size: 26px;
  border-bottom: 2px solid;
  border-color: ${({ theme }) => theme.border};
  margin-left: 10px;

  & p:first-child {
    font-size: 20px;
    color: ${({ theme }) => theme.displayUpper};
  }
`
