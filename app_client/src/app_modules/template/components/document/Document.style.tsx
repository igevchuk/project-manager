import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import * as templateState from '../../../../app/redux/state';

type IArticleProps = {
  background?: string;
  isTitle?: boolean;
};

type IRunProps = {
  properties?: {
    b?: boolean;
    i?: boolean;
    u?: boolean;
    strike?: boolean;
    vertAlign?: string;
  };
};

export const TextNode = styled.span<IRunProps>``;

const articlePadding = '4em';
const sectionPadding = '1em';
const mormalSecitonPadding = '1em';
export const ArticleAndSectonNode = styled.section<IArticleProps>`
  text-align: ${props => (props.isTitle ? 'center' : null)};
  padding: ${props => (props.isTitle ? articlePadding : sectionPadding)};
  background: ${props => props.background};
`;

export const NormalSectonNode = styled.section<IArticleProps>`
  padding: ${mormalSecitonPadding};
  background: ${props => props.background};
`;

export const SegmentHover = styled.span`
  position: relative;
  &:hover {
    outline: 2px solid orange;
    background-color: rgb(255, 252, 220);
    cursor: pointer;
    .text-hover-feat {
      display: block;
    }
  }
  &:hover + .variant-count {
    display: inline-flex;
  }
`;

export const SegmentHoverFeature = styled.span`
  background-color: orange;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: none;
  left: -2px;
  line-height: 1.2em;
  padding: 0 10px;
  position: absolute;
  text-align: center;
  top: -16px;
  & .icon {
    color: #ffffff;
    height: auto;
    margin: 0;
    width: auto;
  }
`;

////////////////////////////////

const padding = '1em';

export const Section = styled.section<{ background?: string }>`
  // color: white;
  text-align: center;
  /* Pass variables as inputs */
  padding: ${padding};

  /* Adjust the background from the properties */
  background: ${props => props.background};
`;

export const TextNode02 = styled.div<{ color?: string; border?: number }>`
  display: flex;
  align-items: center;
  color: ${props => (props.color ? 'red' : 'blue')};
  border: ${props => props.border || '4px'} solid 'black';
`;

export const SegmentNode = styled.span<{}>``;

export const TitleNode2 = styled.section<{
  color?: string;
  border?: number;
  background?: string;
}>`
  display: flex;
  // align-items: center;
  text-align: center;

  &:hover {
    outline: 2px solid orange;
    background-color: rgb(255, 252, 220);
    cursor: pointer;
    .text-hover-feat {
      display: block;
    }
  }

  color: ${props => (props.color ? 'orange' : 'blue')};
  border: ${props => props.border || '4px'} solid 'black';

  padding: ${padding};

  background: ${props => props.background};
`;

export const SectionNode = styled.div<{ color: string; border?: number }>`
  color: ${props => (props.color ? props.color : 'blue')};
  border: ${props => props.border || '4px'} solid 'black';
`;

export const SebSectionNode = styled.span<{ color?: string; border?: number }>`
  color: ${props => (props.color ? 'red' : 'blue')};
  border: ${props => props.border || '4px'} solid 'black';
`;

export const ClauseNode = styled.span<{ color?: string; border?: number }>`
  color: ${props => (props.color ? 'red' : 'blue')};
  border: ${props => props.border || '4px'} solid 'black';
`;

export const SubClauseNode = styled.span<{ color?: string; border?: number }>`
  color: ${props => (props.color ? 'red' : 'blue')};
  border: ${props => props.border || '4px'} solid 'black';
`;

//
//
//
export const StyledDocument = styled(Grid.Column)`
  margin: 50px 5vmax;
  padding: 1em;
`;

export const TextHover = styled.span`
  position: relative;
  &:hover {
    outline: 2px solid orange;
    background-color: rgb(255, 252, 220);
    cursor: pointer;
    .text-hover-feat {
      display: block;
    }
  }
  &:hover + .variant-count {
    display: inline-flex;
  }
`;

export const TextHoverFeature = styled.span`
  background-color: orange;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: none;
  left: -2px;
  line-height: 1.2em;
  padding: 0 10px;
  position: absolute;
  text-align: center;
  top: -16px;
  & .icon {
    color: #ffffff;
    height: auto;
    margin: 0;
    width: auto;
  }
`;

export const VariantCount = styled.span`
  align-items: center;
  background: rgb(255, 252, 220);
  border: 1px solid orange;
  border-radius: 3px;
  color: orange;
  display: none;
  font-weight: bold;
  padding: 0 0.5em;
  position: absolute;
  left: 1.5vmax;
  & svg {
    font-size: 20px;
  }
`;
