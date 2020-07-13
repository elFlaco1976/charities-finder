import React from 'react';
import Layout from '../Layout';
import Modal from '@material-ui/core/Modal';
import { StylesProvider } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './styles.scss';

export default function ProjectDetails({ project }) {
  return (
    <Layout isMainPage={false}>
      <h2 className="project-title">{project.title}</h2>
      <img src={project.image.imagelink[3].url} alt="" />
      <main className="container-main">
        <p>{project.summary}</p>
        <h3 className="content-subtitle">The need</h3>
        <p>{project.need}</p>
        <h3 className="content-subtitle">The impact</h3>
        <p>{project.longTermImpact}</p>
        <button
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </button>
      </main>
    </Layout>
  );
}
