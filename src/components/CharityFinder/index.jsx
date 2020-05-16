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
      totalResults: 0, // todo - add this on apiRequests
      isSearchResultEmpty: false,
      searchText: '',
      themes: [],
      filterValues: {
        country: null,
        themes: [],
      },
      filterControls: {
        countryDropdownOpen: false,
        themesDropdownOpen: false,
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
    console.log('error project search', error);
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

  handleCountryToggle = () => {
    this.setState((prevState) => {
      return {
        filterControls: {
          ...prevState.filterControls,
          countryDropdownOpen: !prevState.filterControls.countryDropdownOpen,
        },
      };
    });
  };

  handleCountryChange = (country) => {
    const { searchText, filterValues } = this.state;
    this.currentPage = 0;
    //requestSearchProjects(this.handleResponseRequestProjectSearch, this.handleErrorRequestProjectSearch, searchText, this.currentPage, filterValues);
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
    if (this.currentPage === 0) {
      this.setState({ projects: data, isSearchResultEmpty: data.length === 0 });
    } else {
      const allProjects = [...projects, ...data];
      this.setState({ projects: allProjects, isSearchResultEmpty: false });
    }
  };

  isSeeMoreButtonVisible = () => {
    const { projects } = this.state;
    return projects.length >= 10;
  };

  render() {
    const {
      projects,
      searchText,
      themes,
      isSearchResultEmpty,
      filterControls,
      filterValues,
    } = this.state;
    return (
      <>
        <SearchBar
          handleTextChange={this.handleSearchTextChange}
          searchText={searchText}
          handleSearchButton={this.handleSearchButton}
          handleCountryToggle={this.handleCountryToggle}
          countryDropdownOpen={filterControls.countryDropdownOpen}
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
