import styled from "styled-components";

const Button = styled.button`
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 88px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 3px;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  background-color: rgb(67, 160, 71);

  &:active {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  /* icon selector */
  & [data-smc='icon'] {
    margin-right: 5px;
    height: 21px;
    display: inline-block;
    vertical-align: middle;
    fill: '#FFFFFF'};
  }
`;
export default Button
