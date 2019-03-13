import * as React from 'react'
import { StyledParentDiv, StyledEditingButton, StyledPopup } from './EditingModeButton.style'
import { Edit, ArrowDropDown, Lock} from '@material-ui/icons';

interface IEditingModeButtonState {
    showDropdown: boolean;
    checkedOut: boolean;
  }

const editMode = (
    <div>
        <Edit />
        <div className="caret-down"><ArrowDropDown /></div>
        <div className="editing-mode-text">
            Editing mode
            <div className="small-text">Checked out by you</div>
        </div>
    </div>
)

const viewOnlyMode = (checkedOut: boolean) => (
    <div>
        <Lock />
        <div className="caret-down"><ArrowDropDown /></div>
        <div className={checkedOut ? "editing-mode-text" : "view-only-text"}>
            View only mode
            {checkedOut && <div className="small-text">Checked out by NAME</div> }
        </div>
    </div>
)

class EditingModeButton extends React.Component<{}, IEditingModeButtonState> {

    constructor(props) {
        super(props);
        this.state = { showDropdown: false, checkedOut: false }
    }

    public handleOuterClick(event) {
        if (event.path.filter(record => record.id === "edit-dropdown").length === 0) {
            this.setState({showDropdown: false})
        }
    }

    public componentDidMount() {
        document.addEventListener('mousedown', this.handleOuterClick.bind(this), false);
    }

    public handleClick = () => {
        this.setState({ showDropdown: !this.state.showDropdown})
    }

    public handlePopupClick = () => {
        this.setState({checkedOut: !this.state.checkedOut, showDropdown: false})
    }

    public render() {
        return (
          <StyledParentDiv id="edit-dropdown">
            <StyledEditingButton onClick={this.handleClick}>
                {this.state.checkedOut ? editMode : viewOnlyMode(false)}
            </StyledEditingButton>
            {this.state.showDropdown &&
              <StyledPopup onClick={this.handlePopupClick}>
                  <Lock />
                  <div className="dropdown-mode-text">
                      {this.state.checkedOut ? 'Check in' : 'Checkout and Edit'}
                      <div className="small-text">
                          {this.state.checkedOut ? 'Other users will not be able to make edits while the template is checked out.' : 'Other users will be able to checkout the template for editing.'}
                      </div>
                  </div>
              </StyledPopup>
            }
          </StyledParentDiv>
        )
    }
}

export default EditingModeButton;