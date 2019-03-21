import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import * as templateState from '../../../../app/redux/state';

type IArticleProps = {
  background?: string;
};

type ITitleProps = {
  background?: string;
  isTitle?: boolean;
};

type ISectionProps = {
  background?: string;
  indLevel?: number;
};

type IRunProps = {
  showBackground?: boolean;
  properties?: {
    b?: boolean;
    i?: boolean;
    u?: boolean;
    strike?: boolean;
    vertAlign?: string;
  };
};

export const TextNode = styled.span<IRunProps>``;

const articlePadding = '0em';
const titlePadding = '1em';
const sectionPadding = '1em';
const mormalSecitonPadding = '1em';

export const StyledDocument = styled(Grid.Column)`
  margin: 0px 5vmax;
  padding: 1em;
`;

// article
export const ArticleNode = styled.div<IArticleProps>`
  // padding: ${articlePadding};
  // background: ${props => props.background};
  // counter-reset: section 0;
`;

export const TitleNode = styled.section<ITitleProps>`
  font-weight: bold;
  font-style: normal;
  font-size: 14px;

  text-align: ${props => (props.isTitle ? 'center' : null)};
  padding: ${titlePadding};
  // background: ${props => props.background};
`;

export const SectionNode = styled.section<ISectionProps>`
  font-weight: bold;
  font-style: normal;
  font-size: 14px;

  padding: ${sectionPadding};
  // background: ${props => props.background};
  &::before {
    content: counter(section, decimal) '.';
    counter-increment: section 1;
  }
`;

// export const SectionNode = styled.div<{ color: string; border?: number }>`
//   color: ${props => (props.color ? props.color : 'blue')};
//   border: ${props => props.border || '4px'} solid 'black';
// `;

export const SegmentsNode = styled.section<ISectionProps>`
  padding: ${mormalSecitonPadding};
  // background: ${props => props.background};
  // text-indent: 20em; ✨
  // padding-left: 2em;
  margin-left: ${props => props.indLevel || 2}em;
`;

export const SegmentHover = styled.span<{ showBackground?: boolean }>`
  background: ${props => (props.showBackground ? 'yellow' : '')};
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

export const SegmentNode = styled.span<{
  variantIsDefault?: boolean;
  key?: string;
  onClick?: (e: any) => void;
}>`
  display: ${props => (props.variantIsDefault ? 'inline' : 'none')};
`;

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
// export const StyledDocument = styled(Grid.Column)`
//   margin: 50px 5vmax;
//   padding: 1em;
// `;

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
  left: -2.4vmax;
  & svg {
    font-size: 20px;
  }
`;
