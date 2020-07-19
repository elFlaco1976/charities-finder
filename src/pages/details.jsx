import React, { useState } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './stylesDetails.scss';

export default function Details({ location }) {
  const { state = {} } = location
  //const { project = {} } = state
  //const { title } = project
  return <ProjectDetails project={state} />;
  // return ( <div>{title}</div> )
}

/* const Details = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p>{`open status: ${open}`}</p>
      <button onClick={handleOpen}>open</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal-content"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <p className="modal-paper">
            hello hello hello hello hello hello hello hello hello hello hello
            hello hello hello hello hello hello hello hello
          </p>
        </Fade>
      </Modal>
    </div>
  );
};

export default Details;
 */
