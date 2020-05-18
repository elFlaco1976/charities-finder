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
      themes: [],
      filterValues: {
        country: null,
        themes: [],
      },
    };
    this.projectsPage = [];
    this.currentPage = 0;
  }

  componentDidMount() {
    requestThemes(this.handleResponseThemes);
  }

  handleResponseRequestProjectSearch = (data) => {
    this.loadResultsPage(data);
  };

  handleResponseThemes = (data) => {
    this.setState({ themes: data });
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
    this.sendSearchRequest();
  };

  sendSearchRequest = () => {
    const { searchText, filterValues } = this.state;
    this.currentPage = 0;
    requestSearchProjects(
      this.handleResponseRequestProjectSearch,
      this.handleErrorRequestProjectSearch,
      searchText,
      this.currentPage,
      filterValues
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
      filterValues
    );
  };

  handleCountryChange = (country) => {
    this.currentPage = 0;
    this.setState(
      (prevState) => {
        return {
          filterValues: {
            ...prevState.filterValues,
            country,
          },
        };
      },
      () =>
        requestSearchProjects(
          this.handleResponseRequestProjectSearch,
          this.handleErrorRequestProjectSearch,
          this.state.searchText,
          this.currentPage,
          this.state.filterValues
        )
    );
  };

  loadResultsPage = (data) => {
    const { projects } = this.state;
    const allProjects = [...projects, ...data];
    this.setState({
      projects: allProjects,
      isSearchResultEmpty: data.length === 0,
    });
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
        />
        <ProjectsList
          projects={projects}
          isSearchResultEmpty={isSearchResultEmpty}
        />
        {this.isSeeMoreButtonVisible() && (
          <SeeMoreButton handleSeeMoreButton={this.handleSeeMoreButton} />
        )}
      </>
    );
  }
}

export default CharityFinder;
