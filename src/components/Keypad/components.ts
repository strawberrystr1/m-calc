import styled from 'styled-components'

export const KeypadWrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 57px;
  justify-items: stretch;
  align-items: stretch;
  height: 100%;
`

export const KeyButton = styled.button`
  width: 100px;
  height: 100px;
  align-self: center;
  justify-self: center;
  font-size: 34px;
  border-radius: 30px;
  border: 0.5px solid black;
  cursor: pointer;
  background-color: #eee;
`
