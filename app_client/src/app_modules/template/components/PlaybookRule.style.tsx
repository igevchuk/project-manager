
import styled, { css } from 'styled-components';
import { Segment } from 'semantic-ui-react';

const PlaybookRule = styled.section`
  
`;

export const PlaybookGroup = styled.section`
  border-bottom: 2px solid rgba(34,36,38,0.15);
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  &:last-child {
    border-bottom: none;
  }
`;

export const PlaybookHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    color: rgb(117, 117, 117);
    font-size: 18px;
    font-weight: normal;
    line-height: 22px;
    margin-bottom: 0;
  }
  & > .ui.button {
    background: none;
    color: ${props => props.theme.colorRoles.primary};
  }
`;

export const PlaybookCard = styled(Segment)`
  &.ui.segment {
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      margin-bottom: 0;
    }
  }
`;

export default PlaybookRule;

