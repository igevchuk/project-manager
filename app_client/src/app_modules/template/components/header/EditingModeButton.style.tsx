import styled, { css } from 'styled-components';

export const StyledEditingButton = styled.div`
  {
    cursor: pointer;
    margin: 0 1rem;
    font-size: 12px;
    line-height: 1.1em;
    padding-top: 8px;
    padding-bottom: 6px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 3px;
    user-select: none;

    .editing-mode-text {
      float: right;
      padding-left: 10px;
    }

    .small-text {
      font-size: 9px;
    }
    .caret-down {
      float: right;
    }
  }

  .view-only-text {
    float: right;
    padding-left: 10px;
    padding-top: 4px;
    height: 16px;
    color: #4A4A4A;	
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
  }

  :hover {
    background-color: rgba(0,0,0,0.1);
  }
`

export const StyledParentDiv = styled.div`
  position: relative;
`

export const StyledPopup = styled.div`
  {
    position: absolute;
    top: 45px;
    left: 15px;

    background: white;
    z-index: 2;
    vertical-align: middle
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.78);
    width: 312px;
    height: 80px;
    cursor: pointer;
    user-select: none;

    padding-top: 16px;
    padding-bottom: 12px;
    padding-right: 12px;

    svg {
      position: relative;
      top: 12px;
      left: 24px;
    }

    .dropdown-mode-text {
      float: right;
      padding-left: 10px;
      width: 240px;
      font-size: 14px;
      font-weight: bold;
      line-height: 16px;
      padding-bottom: 4px;
    }

    .small-text {
      font-size: 12px;
      line-height: 14px;
      color: #757575;
      font-weight: 100;
    }
  }
`