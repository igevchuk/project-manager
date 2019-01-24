import * as React from "react";
import styled from 'styled-components';
import * as moment from 'moment';

import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';
import FloatingActionButton from '../../../app/_styled_components/FloatingActionButton';
import Button from '../../../app/_styled_components/Button';
import ToolbarComponent from './Toolbar.style';

interface IToolbarProps { 
  currentTemplate?: any;
  isCheckedOut?: boolean;
  hasLock?: boolean;
  status?: string;
  templateId?: string;
  variantId?: string;
  user?: any;
}

const AdminNavButton = ({currentTemplate, status, ...props}) => {
  if (status === 'loading') {
    return <div />
  } else if (currentTemplate.approval_required) {
    return (
      <div>
        <Button
          disabled={true}
          style={{color:'black'}}
        >
          SENT FOR REVIEW
        </Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button 
          onClick={() => props.openDialog('checkin-dialog')} 
          // disabled={props.mode === 'running' ? true : false}
          // primary='primary'
          // raised='raised'
          // key="checkin"
        >
          <Icon name='lock' />
          Check In
        </Button>
        <Button 
          onClick={() => props.openReviewDialog()} 
          // disabled={props.mode === 'running'}
          // secondary='secondary' 
          // raised='raised'
          // key="publish"
        >
          SEND FOR REVIEW
        </Button>
      </div>
    )
  }
}

const PMNavButton = ({currentTemplate, status, ...props}) => {
  const approvalStatus = status === 'published' ? 'TEMPLATE PUBLISHED' : (status === 'rejected' ? 'TEMPLATE REJECTED' : null);
  if (status === 'loading'){
    return <div />
  } else if (currentTemplate.approval_required && status !== 'published' && status !== 'rejected' ) {
    return (
      <div>
        <Button 
          onClick={props.onReject}
          // disabled={props.mode === 'running'}
          // raised='raised'
          // key="REJECT"
          // style={{background:'#f44336', color:'white'}}
        >
          REJECT
        </Button>
        <Button 
          onClick={props.onPublish} 
          // disabled={props.mode === 'running'}
          // secondary='true' 
          // raised='raised'
          // key="APPROVE"
        >
          APPROVE
        </Button>
      </div>
    )
  } else {
    return <span>{ approvalStatus }</span>;
  }
}

const Toolbar: React.SFC<IToolbarProps> = ({ currentTemplate, templateId, variantId, isCheckedOut, hasLock, status, user, ...props }) => {
  const formatDate = (timestamp) => {
    if (!!timestamp) {
      const date = moment(timestamp);

      return moment(date).isValid() ? `${date.format('LL')} at ${date.format('h:mm A')}` : '';
    }
  }

  const getUpdateInfo = () => {
    if(!currentTemplate) {
      return null;
    }

    let text = '';
    const { last_published, publisher, published } = currentTemplate;
    if(published) {
      text = `Last published `;
      text += formatDate(last_published);
      text += ` by ${publisher}`;
    }

    return text;
  }

  const getCheckedOutLabel = (data: any, user: any): string => {
    if(!data || !user || user.first_name === 'Legal') {
      return '';
    }
    const { updaterid, updateremail, updater, creatorid } = data;
    if((!updateremail.trim() && creatorid === user.id) || updaterid === user.id) {
      return `Checked out by you`
    } else {
      return `Checked out by ${updater}`
    }
  }

  const DropdownTrigger = () => (
    <FloatingActionButton mini={true}>
      <Icon name='ellipsis vertical' />
    </FloatingActionButton>
  )

  const getApproverNav = () => {
    return <PMNavButton {...props} status={status} currentTemplate={currentTemplate} />
  }
  return (
    <ToolbarComponent>
      <div className="col">
        <Link to='/templates' className='arrow-left'><Icon name='chevron left' /></Link>

        <div>
          { !!currentTemplate && <h2>{ currentTemplate.value }</h2> }

          <span>{ getUpdateInfo() }</span>
        </div>
      </div>
      
      <div className="col">
        { !!user && user.first_name === "Legal" ? getApproverNav() :
         isCheckedOut ? (
          <React.Fragment>
            {
              !!user && user.first_name !== 'Legal' && (
                <React.Fragment>
                  <Icon name='pencil' />
                  <span className="col-info">
                    Editing mode
                    <small>{ getCheckedOutLabel(currentTemplate, user) }</small>
                  </span>
                </React.Fragment>
              )
            }

            {
              status === 'draft' && (
                <Button 
                  // onClick={props.saveDraft} 
                  // disabled={props.mode === 'running'}
                  primary={true}
                  raised={true}
                  key="draft"
                >
                  <Icon name='save' />
                  Save Draft
                </Button>
              )
            }
      
            {
              <React.Fragment>
                { (!hasLock && !!user && user.first_name === "Admin") && <AdminNavButton {...props} status={status} currentTemplate={currentTemplate} /> }
              </React.Fragment>
            }
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Icon name='lock' />
            <span className="col-info">View only mode</span>
            { (!!user && user.first_name === "Admin") &&
              currentTemplate.approval_required === true ?
              <Button
                disabled={true}
                style={{color:'black'}}
              >
                SENT FOR REVIEW
              </Button> :
              <Button 
                // disabled={props.mode === 'running' || hasLock}
                // onClick={props.handleCheckOut} 
                // primary={true} 
                // raise={true}
              >
                <Icon name='pencil' />
                Check Out
              </Button>
            }
          </React.Fragment>
        )}

        <Dropdown floating={true} trigger={<DropdownTrigger/>} direction='left' icon={null} upward={false}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={{
                pathname: `/template-history/${templateId}/variants/${variantId}/`,
                state: { referrer: location.pathname }
              }}>
                <Icon name='clock outline' />
                View Version History
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </ToolbarComponent>
  );
}

export default Toolbar;
