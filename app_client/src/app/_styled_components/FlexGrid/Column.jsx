import styled from 'styled-components';

export const Column = styled.div`
  padding-left: ${props => props.noGutters ? '0' : '15px'};
  padding-right: ${props => props.noGutters ? '0' : '15px'};
  flex: ${props => props.span || 1};
`;

// When i use flexbox, i always write it like that:

// display: -webkit-box;
// display: -moz-box;
// display: -ms-flexbox;
// display: -webkit-flex;
// display: flex;