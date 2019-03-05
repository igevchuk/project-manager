import styled from 'styled-components';

export default styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  width: ${(props => props.fluid ? '100%' : '1295px')};
`;