import React from 'react';
import Button from '@material-ui/core/Button';
import './styles.scss';

const SeeMoreButton = ({ handleSeeMoreButton }) => {
  return (
    <div className="see-more-container">
      <Button variant="outlined" color="primary" onClick={handleSeeMoreButton}>
        See more
      </Button>
    </div>
  );
};

export default SeeMoreButton;
