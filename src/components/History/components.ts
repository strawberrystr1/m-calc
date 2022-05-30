import styled from 'styled-components'

export const List = styled.ul`
  width: 100%;
  list-style: none;
  margin-top: 30px;
  overflow: auto;
  color: ${({ theme }) => theme.fontColor};

  & li {
    margin: 10px 0;
    font-weight: 600;
  }
`

export const Heading = styled.h4`
  color: ${({ theme }) => theme.fontColor};
`
