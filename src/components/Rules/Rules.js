import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 35,
    backgroundColor: '#666',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>The Game Rules</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose} >
          <div style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
            <Typography variant="title" id="modal-title" style={{color: '#ffffff'}}>
              The Peg Solitaire Rules
            </Typography>
            <Typography variant="subheading" id="simple-modal-description" style={{color: '#ffffff'}}>
            <br/>
              A valid move is to jump a peg orthogonally over an adjacent peg into a hole two positions away and then to remove the jumped peg.
              You win by remaining with a single peg.
            </Typography>
            <br/>
            <Button variant="contained" color="primary" onClick={this.handleClose}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;