import styled from 'styled-components'

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`

export const HomeAside = styled.aside`
  width: 25%;
  padding: 20px;
  font-size: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: flex-start;
  border-left: 2px solid ${({ theme }) => theme.border};
  border-right: 2px solid ${({ theme }) => theme.border};
  transition: all 0.6s ease-in-out;

  &.hide {
    width: 0;
    padding: 0;
    border: 0;
  }
`

export const HomeMain = styled.section`
  width: 73%;
  height: 100%;
  border-left: 2px solid ${({ theme }) => theme.border};
  &.active {
    width: 100%;
    padding-right: 50px;
    border-right: 2px solid ${({ theme }) => theme.border};
  }
`

export const HistoryButton = styled.button`
  width: 70px;
  height: 50px;
  border-radius: 0 10px 10px 0;
  border: 0.3px solid black;
  font-size: 34px;
  position: absolute;
  left: -1px;
  top: 0;
  cursor: pointer;

  &.active {
    right: 0px;
    left: inherit;
    border-radius: 10px 0 0 10px;
  }
`
