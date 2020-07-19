import React from 'react';
import Project from '../Project';
import './styles.scss';

const ProjectsList = ({
  projects,
  isSearchResultEmpty,
  handleProjectDetailsModalOpen,
  handleProjectDetailsModalClose,
  projectDetailsModalOpen,
}) => {
  return (
    <div className="card-list">
      {isSearchResultEmpty && <div>No results found for your search</div>}
      {!isSearchResultEmpty &&
        projects.map((element, index) => (
          <Project
            project={element}
            index={index}
            key={element.id}
            handleProjectDetailsModalOpen={handleProjectDetailsModalOpen}
            handleProjectDetailsModalClose={handleProjectDetailsModalClose}
            projectDetailsModalOpen={projectDetailsModalOpen}
          />
        ))}
    </div>
  );
};

export default ProjectsList;
