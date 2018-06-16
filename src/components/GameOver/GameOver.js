import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { BOARD_SIZE } from '../../Constants';

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

  componentDidMount() {
      this.handleOpen();
  }
  handleOpen = () => {      
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  facebookSharePopup = () => {
    const sharerURL = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fpegsolitaire.ivaylopavlov.com&
    picture=http%3A%2F%2Fwww.ivaylopavlov.com%2Fwp-content%2Fuploads%2F2018%2F06%2Fivo_peg_solitaire_header.png&
    title=I+played+IvoPegSolitaire&quote=I%20%20played%20Ivo%20Peg%20Solitaire%20and%20got%20to%20` + this.props.pegsLeft + `%20pegs%20left.&
    description=I%20%20Played%20Ivo%20Peg%20Solitaire%20and%20got%20to%20` + this.props.pegsLeft + `%20pegs%20left.`;
    
    window.open(
      sharerURL,
      'facebook-share-dialog',
      'width=626,height=436');
  }

  startNewGame = () => {
      this.props.resetGame(BOARD_SIZE);
      this.handleClose();
  }
  
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose} >
          <div style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
            <Typography variant="title" id="modal-title" style={{color: '#ffffff'}}>
              {this.props.title}
            </Typography>
            <Typography variant="subheading" id="simple-modal-description" style={{color: '#ffffff'}}>
            <br/>
                {this.props.text}
            </Typography>
            <br/>
            <Button variant="contained" color="primary" onClick={this.facebookSharePopup}>Share on Facebook</Button>
            {" "}
            <Button variant="contained" color="primary" onClick={this.startNewGame}>Start a new game</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;