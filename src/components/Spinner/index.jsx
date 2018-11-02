import styled, { keyframes } from "styled-components"

const SpinnerKeyframes = keyframes`
to {
  transform: rotate(1turn);
}
`

export default styled.div`
  animation: ${SpinnerKeyframes} ${({ speed }) => speed || 0.6}s infinite linear;
  width: ${({ size }) => size || 16}px;
  height: ${({ size }) => size || 16}px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-right-color: #333;
  display: inline-block;
`
