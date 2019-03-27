import * as React from 'react';
import { Modal, Icon, Button, Form, Segment, Label, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { AnnotationTag } from "../sidebar/annotations/SidebarAnnotations.style";
import { template } from "../../../../app/redux/state";
import {
  StyledAnnotationLabel,
  StyledDropdown,
  StyledDropdownBody
} from "./AnnotationDropDown.style"

interface IProps {
  template: template;
}

const AnnotationDropDown: React.FunctionComponent<IProps> = props => {
  const [open, setOpen] = React.useState(false);
  const { template: { annotations } } = props;


  const handleToggleDropdown = () => setOpen(!open);
  const handleCloseDropdown = () => setOpen(false);

  // Needs to be in utils file
  const formatTags = () => {
    const { template: { tagColors, tags } } = props;
    const newAnnotations: any = [];
    tags.map((item, index) => {
      const getTagColour = tagColors.find(element => element.id === item.colour_id);
      if (getTagColour === undefined) { return }
      const [primaryColor, secondaryColor] = getTagColour.value.split('|');
      const annotation = {
        id: item.id,
        tagName: item.name,
        primaryColor,
        secondaryColor
      }
      newAnnotations.push(annotation);
    });
    return newAnnotations;
  }

  const formatAnnotations = () => {
    const { template: { annotations } } = props;
    const newAnnotations: any = {};
    annotations.map(item =>
      newAnnotations[item.tag_id] = item.tag_id in newAnnotations ?
        newAnnotations[item.tag_id] + 1 : 1
    )
    return newAnnotations;
  }

  const renderAnnotations = () => {
    const annotationsList: any = []
    const formattedAnnotations = formatAnnotations();
    const annotationTags = formatTags();
    Object.keys(formattedAnnotations).forEach((tagID, index) => {
      const annotationCount = String(formattedAnnotations[tagID])
      const getTag = annotationTags.find(element => element.id === tagID)
      if (getTag === undefined) { return }
      annotationsList.push(
        {
          id: tagID,
          tagName: getTag.tagName,
          primaryColor: getTag.primaryColor,
          secondaryColor: getTag.secondaryColor,
          count: annotationCount
        }
      )
    })
    annotationsList.sort((cur, next) => {
      const nameA = cur.tagName.toUpperCase();
      const nameB = next.tagName.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    })
    const annatations = annotationsList.map(annotation => {
      const handleClick = () => console.log(annotation.id)
      return (
        <div className="tag-row" key={annotation.id} onClick={handleClick}>
          <AnnotationTag basecolor={annotation.primaryColor} subcolor={annotation.secondaryColor}>{annotation.tagName}</AnnotationTag>
          <p>{annotation.count}</p>
        </div>
      )
    })
    return annatations;
  }

  const annotationList = renderAnnotations();
  const annotationButton = (
    <StyledAnnotationLabel onClick={handleToggleDropdown}>
      <Icon name='tag' /><p>{annotations.length}</p>
    </StyledAnnotationLabel>
  )

  const mainBody = (
    <StyledDropdown
      open={open}
      closeOnChange={false}
      icon={null}
      trigger={annotationButton}
      pointing="top left"
      onClose={handleCloseDropdown}
    >
      <StyledDropdownBody>
        <div className='main-body'>
          <div className='tag-header'>
            <p className='title'>{annotations.length} Annotated Segments in this Template</p>
            <p className='sub-title'>Select an annotation to see where it’s been applied in the template.</p>
          </div>
          <div className="tag-list">
            {annotationList}
          </div>
        </div>
      </StyledDropdownBody>
    </StyledDropdown>
  )

  return mainBody;
}

export default AnnotationDropDown;