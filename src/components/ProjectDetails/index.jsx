import React from 'react';
import Layout from '../Layout';
import Modal from '@material-ui/core/Modal';
import { StylesProvider } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './styles.scss';

export default function ProjectDetails({ project }) {
  const { title, imageUrl, summary, need, longTermImpact } = project
  return (
    <Layout isMainPage={false}>
      <h2 className="project-title">{title}</h2>
      <img src={imageUrl} alt="" />
      <main className="container-main">
        <p>{summary}</p>
        <h3 className="content-subtitle">The need</h3>
        <p>{need}</p>
        <h3 className="content-subtitle">The impact</h3>
        <p>{longTermImpact}</p>
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
