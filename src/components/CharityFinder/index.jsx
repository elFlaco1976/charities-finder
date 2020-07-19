import React from 'react';
import ProjectsList from '../ProjectsList';
import SearchBar from '../SearchBar';
import SeeMoreButton from '../SeeMoreButton';
import { requestThemes, requestSearchProjects } from '../../utils/apiRequests';

class CharityFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isSearchResultEmpty: false,
      searchText: '',
      allThemes: [],
      searchCountry: null,
      searchThemes: [],
      filterValues: {
        country: null,
        themes: [],
      },
      projectDetailsModalOpen: false,
      projectDetailsId: null,
    };
    this.projectsPage = [];
    this.currentPage = 0;
  }

  componentDidMount() {
    let persistentStateProjects = sessionStorage.getItem('projects');
    let persistentStateSearchText = sessionStorage.getItem('searchText');
    let persistentStateSearchCountry = sessionStorage.getItem('searchCountry');
    let persistentStateSearchThemes = sessionStorage.getItem('searchThemes');
    if (
      persistentStateProjects ||
      persistentStateSearchText ||
      persistentStateSearchCountry ||
      persistentStateSearchThemes
    ) {
      const { projects, searchText, searchCountry, searchThemes } = this.state;
      persistentStateProjects = JSON.parse(persistentStateProjects);
      persistentStateSearchText = JSON.parse(persistentStateSearchText);
      persistentStateSearchCountry = JSON.parse(persistentStateSearchCountry);
      persistentStateSearchThemes = JSON.parse(persistentStateSearchThemes);
      this.setState({
        projects: persistentStateProjects || projects,
        searchText: persistentStateSearchText || searchText,
        searchCountry: persistentStateSearchCountry || searchCountry,
        searchThemes: persistentStateSearchThemes || searchThemes,
      });
    }

    requestThemes(this.handleResponseThemes);
  }

  handleResponseRequestProjectSearch = (data) => {
    this.loadResultsPage(data);
  };

  handleResponseThemes = (data) => {
    this.setState({ allThemes: data });
  };

  handleErrorRequestProjectSearch = (error) => {
    console.log('error project search', error); // TODO
  };

  handleSearchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleEnterForSearchInput = () => {
    this.sendSearchRequest();
  };

  handleSearchButton = () => {
    const { searchText } = this.state;
    this.sendSearchRequest();
    sessionStorage.setItem('searchText', JSON.stringify(searchText));
  };

  sendSearchRequest = () => {
    const { searchText, filterValues } = this.state;
    this.currentPage = 0;
    requestSearchProjects(
      this.handleResponseRequestProjectSearch,
      this.handleErrorRequestProjectSearch,
      searchText,
      this.currentPage,
      filterValues,
      {
        searchText: this.state.searchText,
        searchCountry: this.state.searchCountry,
        searchThemes: this.state.searchThemes,
      }
    );
  };

  handleSeeMoreButton = () => {
    const { searchText, filterValues } = this.state;
    this.currentPage += 1;
    requestSearchProjects(
      this.handleResponseRequestProjectSearch,
      this.handleErrorRequestProjectSearch,
      searchText,
      this.currentPage,
      filterValues,
      {
        searchText: this.state.searchText,
        searchCountry: this.state.searchCountry,
        searchThemes: this.state.searchThemes,
      }
    );
  };

  handleCountryChange = (country) => {
    this.setState({ searchCountry: country }, () => {
      this.sendSearchRequest();
    });
    sessionStorage.setItem('searchCountry', JSON.stringify(country));
  };

  handleThemesChange = (themes) => {
    this.setState({ searchThemes: themes }, () => {
      this.sendSearchRequest();
    });
    sessionStorage.setItem('searchThemes', JSON.stringify(themes));
  };

  handleProjectDetailsModalOpen = (projectId) => {
    this.setState({
      projectDetailsModalOpen: true,
      projectDetailsId: projectId,
    });
  };

  handleProjectDetailsModalClose = () => {
    this.setState({ projectDetailsModalOpen: false, projectDetailsId: null });
  };

  loadResultsPage = (data) => {
    const { projects } = this.state;
    const newProjects =
      this.currentPage === 0 ? [...data] : [...projects, ...data];
    this.setState({
      projects: newProjects,
      isSearchResultEmpty: data.length === 0,
    });
    sessionStorage.setItem('projects', JSON.stringify(newProjects));
  };

  isSeeMoreButtonVisible = () => {
    const { projects } = this.state;
    return projects.length >= 10;
  };

  render() {
    const {
      projects,
      searchText,
      isSearchResultEmpty,
      filterValues,
      allThemes,
      projectDetailsModalOpen,
      searchCountry,
      searchThemes,
      areStateValuesFromSavedSession,
    } = this.state;
    return (
      <>
        <SearchBar
          handleTextChange={this.handleSearchTextChange}
          searchText={searchText}
          handleSearchButton={this.handleSearchButton}
          filterValues={filterValues}
          handleCountryChange={this.handleCountryChange}
          handleEnterForSearchInput={this.handleEnterForSearchInput}
          allThemes={allThemes}
          handleThemesChange={this.handleThemesChange}
          searchCountry={searchCountry}
          searchThemes={searchThemes}
        />
        <ProjectsList
          projects={projects}
          isSearchResultEmpty={isSearchResultEmpty}
          handleProjectDetailsModalOpen={this.handleProjectDetailsModalOpen}
          handleProjectDetailsModalClose={this.handleProjectDetailsModalClose}
          projectDetailsModalOpen={projectDetailsModalOpen}
        />
        {this.isSeeMoreButtonVisible() && (
          <SeeMoreButton handleSeeMoreButton={this.handleSeeMoreButton} />
        )}
      </>
    );
  }
}

export default CharityFinder;
