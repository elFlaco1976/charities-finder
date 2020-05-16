import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import './styles.scss';

const Project = ({ project, index }) => {
  return (
    <Card key={index} className="card-list-item">
      <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
        <CardImg src={project.imageLink} className="card-image" />
      </a>
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
