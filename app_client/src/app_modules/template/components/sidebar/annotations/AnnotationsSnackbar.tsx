import * as React from 'react';
import { contextWrapper } from '../../../TemplateContext';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from '@material-ui/icons/Close';
import { IState as segmentState } from '../../../redux/state';
import * as actions from '../../../redux/actions';


interface IProps {
  subState: segmentState;
  templateDispatch: React.Dispatch<any>;
  appDispatch: React.Dispatch<any>;
}

const snackbarIconStyle = {
  display: 'flex',
  lineHeight: '26px'
}

const AnnotationSnackbar: React.FunctionComponent<IProps> = (props) => {
  const { subState } = props;
  const { templateDispatch, appDispatch } = props;

  const open = subState.annotationStatus === 'success';
  const handleClose = () => templateDispatch(actions.closeAnnotationSnackbar());
  const description = "The selected annotations have been applied.";
  const handleUndo = () => appDispatch(actions.undoAnnotation(subState.recentAnnotations));   

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        <span id="message-id" style={snackbarIconStyle}>
          <InfoIcon style={{ marginRight: '15px' }} />
          {description}
        </span>
      }
      autoHideDuration={4000}
      action={[
        <Button 
          key="undo" 
          color="secondary" 
          size="small" 
          onClick={handleUndo}>
          UNDO
        </Button>,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
        >
          {/* <CloseIcon /> */}
        </IconButton>,
      ]}
    />
  );
};

export default contextWrapper(AnnotationSnackbar);