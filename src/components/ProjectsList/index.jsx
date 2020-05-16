import React from 'react';
import Project from '../Project';
import "./styles.scss";

const ProjectsList = ({ projects, isSearchResultEmpty }) => {
  return (
    <div className="card-list">
      {isSearchResultEmpty && <div>No results found for your search</div>}
      {!isSearchResultEmpty && projects.map((element, index) => (
        <Project project={element} index={index} />
      ))}
    </div>
  );
}

export default ProjectsList;
