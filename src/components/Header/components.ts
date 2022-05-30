import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const HeaderWrapper = styled.header`
  display: flex;
  padding: 20px;
  background-color: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.headerFont};
  height: 80px;

  & p {
    font-size: 30px;
  }
`

export const NavLinkStyled = styled(NavLink)`
  color: ${({ theme }) => theme.headerFont};
  font-size: 22px;
  margin-right: 20px;
  text-decoration: none;

  &.active {
    text-decoration: underline;
  }
`
