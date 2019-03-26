import * as React from 'react';
import { contextWrapper } from '../../../TemplateContext';
import * as templateState from '../../../../../app/redux/state';
import * as templateActions from "../../../redux/actions";

import AddAnnotationModal from "./AddAnnotationModal";
import CreateAnnotationModal from "./CreateAnnotationModal";
import { Icon } from 'semantic-ui-react';
import {
  TabBody,
  AnnotationHeader,
  NoAnnotationsSegment,
  AnnotationSegment,
  AnnotationSegmentHeader,
  AnnotationSegmentDetail,
  AnnotationTag,
  DeleteButton,
  SemanticButton

} from './SidebarAnnotations.style';

export interface IAnnotationDataModel {
  id: string;
  tagName: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface IPayloadData {
  id: string;
  creator: string;
  created: string;
  tag_id: string;
  text_segment_uuid: string;
}

export interface IAnnotationsProps {
  activeSegId: string;
  annotationCount: number;
  annotations: templateState.annotation[];
  tags: templateState.tag[];
  tagColors: templateState.tagColor[];
  templateDispatch: React.Dispatch<any>;
  appDispatch: React.Dispatch<any>;
  // postAddAnnotation: (payload) => React.Dispatch<any>;
  // postCreateAnnotation: (payload) => React.Dispatch<any>;


}

export interface IAnnotationsState {
  addModal: boolean
  selectedSegment: string | null;
  tagLabels: IAnnotationDataModel[];
  modalListData: IAnnotationDataModel[];
  modalSelection: string[];
  modalSearchValue: string;
  defaultNameValue: string;
  showCreateModal: boolean;
  fakeAnnotationData: templateState.annotation[];
  fakeTags: templateState.tag[];
}

class SidebarAnnotations extends React.Component<IAnnotationsProps, IAnnotationsState> {
  constructor(props: IAnnotationsProps) {
    super(props);

    this.state = {
      addModal: false,
      selectedSegment: null,
      tagLabels: this.formatTags(this.props.tags),
      modalListData: this.formatTags(this.props.tags),
      modalSelection: [],
      modalSearchValue: '',
      defaultNameValue: '',
      showCreateModal: false,
      fakeAnnotationData: this.props.annotations,
      fakeTags: this.props.tags
    }
  }

  public componentDidUpdate(prevProps) {
    const { tags } = this.props
    if (prevProps.tags !== tags) {
      this.setState({ modalListData: this.formatTags(tags), tagLabels: this.formatTags(tags) });
    }
  }

  public handleModalOpen = () => { this.setState({ addModal: true, showCreateModal: false }); };

  public handleModalClose = () => {
    this.setState({
      addModal: false,
      modalSelection: [],
      modalSearchValue: '',
      modalListData: this.state.tagLabels
    });
  }

  public handleToggleModal = () => {
    this.setState({
      addModal: !this.state.addModal,
      modalSelection: [],
      modalSearchValue: '',
      modalListData: this.state.tagLabels
    });
  }

  public handleModalSearch = (value) => {
    const { tagLabels } = this.state;
    let newData = [...tagLabels];
    if (!!value.length) {
      newData = tagLabels.filter(item => item.tagName.toLowerCase().includes(value.toLowerCase()))
    }
    this.setState({ modalListData: newData, modalSearchValue: value, defaultNameValue: value });
  }

  public handleModalSelection = (id) => {
    const tempData = [...this.state.modalSelection];
    const inSelection = tempData.indexOf(id)
    if (inSelection !== -1) {
      tempData.splice(inSelection, 1)
    } else {
      tempData.push(id)
    }
    this.setState({ modalSelection: tempData });
  }

  public handleCreateModalOpen = () => {
    this.handleModalClose()
    this.setState({ showCreateModal: true });
  };

  public handleCreateModalClose = () => { this.setState({ showCreateModal: false, defaultNameValue: '' }); }


  public handleOnHover = id => { this.setState({ selectedSegment: id }); }

  public handleOffHover = () => { this.setState({ selectedSegment: null }); }

  public handleAddAnnotation = () => {
    const { modalSelection } = this.state;
    const { templateDispatch, appDispatch, tags, activeSegId } = this.props;
    const payloadData: IPayloadData[] = [];
    modalSelection.forEach(index => {
      const selectedTag = tags.find(item => item.id === index)
      if (selectedTag !== undefined) {
        const sendData: IPayloadData = {
          id: String(Math.random()),
          creator: 'Sarah Mohamed',
          created: '2019-01-21, 11:37am',
          tag_id: selectedTag.id,
          text_segment_uuid: activeSegId
        }
        payloadData.push(sendData)
      }
    })
    if (!payloadData.length) {
      return;
    }
    this.handleModalClose();
    appDispatch(templateActions.addAnnotation(payloadData));
    return templateDispatch(templateActions.addAnnotation(payloadData));// postAddAnnotation(payloadData);
  }

  public handleCreateAnnotation = (payload) => {
    const { activeSegId, templateDispatch, appDispatch } = this.props;
    const newAnnotation = {
      id: String(Math.random()),
      creator: 'Sarah Mohamed',
      created: '2019-01-21, 11:37am',
      tag_id: payload.id,
      text_segment_uuid: activeSegId
    }
    const payloadData = {
      tags: payload,
      annotations: newAnnotation
    }
    appDispatch(templateActions.createAnnotation(payloadData));
    this.setState({ showCreateModal: false });
    return templateDispatch(templateActions.createAnnotation(payloadData));// postCreateAnnotation(payloadData);
  }

  public formatTags = (tags) => {
    const { tagColors } = this.props;
    const newAnnotations: IAnnotationDataModel[] = [];
    tags.map((item, index) => {
      const getTagColour = tagColors.find(element => element.id === item.colour_id);
      if (getTagColour === undefined) { return }
      const [primaryColor, secondaryColor] = getTagColour.value.split('|');
      const annotation: IAnnotationDataModel = {
        id: item.id,
        tagName: item.name,
        primaryColor,
        secondaryColor
      }
      newAnnotations.push(annotation);
    });
    return newAnnotations;
  }


  public render() {
    const {
      addModal,
      modalListData,
      modalSelection,
      modalSearchValue,
      showCreateModal,
      defaultNameValue,
      tagLabels
    } = this.state;
    const { activeSegId, annotations, annotationCount, tags, tagColors } = this.props;
    const { appDispatch } = this.props;
    const annotationTags = this.formatTags(tags);

    const createAnnotationModal = (
      <CreateAnnotationModal
        defaultName={defaultNameValue}
        open={showCreateModal}
        handleClose={this.handleCreateModalClose}
        tagColors={tagColors}
        handleCreateAnnotation={this.handleCreateAnnotation}
      />
    )

    const addAnnotationModal = (
      <AddAnnotationModal
        open={addModal && !showCreateModal}
        data={modalListData}
        selection={modalSelection}
        searchValue={modalSearchValue}
        handleOnClose={this.handleModalClose}
        handleOnOpen={this.handleToggleModal}
        handleOnSearch={this.handleModalSearch}
        handleModalSelection={this.handleModalSelection}
        handleSubmit={this.handleAddAnnotation}
        handleShowCreate={this.handleCreateModalOpen}
      />
    )

    const annotationsList = (
      annotations.map((item, index) => {
        const handleHover = () => this.handleOnHover(item.id)
        const handleOnDelete = () => appDispatch(templateActions.deleteAnnotation(item.id))
        const getTag = annotationTags.find(element => element.id === item.tag_id)
        if (getTag === undefined) { return }
        return (
          <AnnotationSegment key={index} onMouseLeave={this.handleOffHover} onMouseEnter={handleHover}>
            <AnnotationSegmentHeader>
              <AnnotationTag basecolor={getTag.primaryColor} subcolor={getTag.secondaryColor}>{getTag.tagName}</AnnotationTag>
              <DeleteButton 
                hidden={this.state.selectedSegment !== item.id}
                onClick={handleOnDelete}
              >
                <Icon name="trash alternate outline" />
              </DeleteButton>
            </AnnotationSegmentHeader>
            <AnnotationSegmentDetail>
              <p>Annotated by <strong>{item.creator}</strong> · {item.created}</p>
            </AnnotationSegmentDetail>
          </AnnotationSegment>
        )
      })
    )

    return (
      <TabBody>
        <AnnotationHeader>
          <h3><Icon name="tag" />Annotations ({annotationCount}) </h3>
          {addAnnotationModal}
          {createAnnotationModal}
        </AnnotationHeader>
        {annotationsList}
        {!annotations.length && <NoAnnotationsSegment>No annotations have been applied</NoAnnotationsSegment>}
      </TabBody>
    );
  }
}

export default contextWrapper(SidebarAnnotations);
