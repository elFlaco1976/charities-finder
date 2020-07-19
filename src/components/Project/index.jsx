import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link, navigate } from 'gatsby';
import './styles.scss';
import ProjectDetails from '../ProjectDetails';

const Project = ({
  project,
  index,
  handleProjectDetailsModalOpen,
  handleProjectDetailsModalClose,
  projectDetailsModalOpen,
}) => {
  const { title, image, summary, need, longTermImpact } = project
  return (
    <Card key={index} className="card-list-item">
      {/*       <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
        <CardImg src={project.image.imagelink[2].url} className="card-image" />
      </a> */}
      {/*       <Link
        to={`/details`}
        state={{ project }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardImg src={project.image.imagelink[2].url} className="card-image" />
      </Link> */}
      {/*       <CardImg
        src={project.image.imagelink[2].url}
        className="card-image"
        onClick={() => {
          navigate('/details', { state: { project } });
        }}
      /> */}
      {/*       <CardImg
        src={project.image.imagelink[2].url}
        className="card-image"
        onClick={() => {
          handleProjectDetailsModalOpen(project.id);
        }}
      /> */}
      <Link
        to={`/details`}
        /* state={{ project }} */
        //const { title, image = {}, summary, need, longTermImpact } = project
        state={{ title, summary, need, longTermImpact, imageUrl: image.imagelink[3].url }}

        target="_blank"
        rel="noopener noreferrer"
      >
        <CardImg src={project.image.imagelink[2].url} className="card-image" />
      </Link>
      {/*       <ProjectDetails
        project={project}
        handleProjectDetailsModalClose={handleProjectDetailsModalClose}
        projectDetailsModalOpen={projectDetailsModalOpen}
      /> */}
      <CardBody>
        <div>
          <span className="tag">{project.themeName}</span>
          <span className="tag">{project.country}</span>
        </div>
        <CardTitle className="title">{project.title}</CardTitle>
        <CardSubtitle className="subtitle">
          {project.organization.name}
        </CardSubtitle>
        <p className="summary truncate-overflow-summary">{project.summary}</p>
      </CardBody>
    </Card>
  );
};

export default Project;
