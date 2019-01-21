import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${
          theme.palette.grey[700]
        } transparent`
      }
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${
          theme.palette.grey[700]
        } transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${
          theme.palette.grey[700]
        } transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${
          theme.palette.grey[700]
        }`
      }
    }
  },
  arrowArrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
});

class ArrowTooltip extends React.Component {
  state = {
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Tooltip
        title={
          <React.Fragment>
            {this.props.title}
            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }
        classes={{ popper: classes.arrowPopper }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef
              }
            }
          }
        }}
      >
        {this.props.children}
      </Tooltip>
    );
  }
}

export default withStyles(styles)(ArrowTooltip);
