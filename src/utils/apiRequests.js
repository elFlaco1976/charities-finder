/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const urlApi = 'https://api.globalgiving.org/api/public';
const apiKey = `api_key=${process.env.API_KEY}`;
const endPointAllOrganizations = 'orgservice/all/organizations';
const endPointSearchProjects = 'services/search/projects';
const endPointThemes = 'projectservice/themes';
const resultsPerPage = 10;

export const requestAllCharities = async (handleResponse, handleError) => {
  try {
    const url = `${urlApi}/${endPointAllOrganizations}?${apiKey}`;
    const response = await axios.get(url);
    handleResponse(response.data.organizations.organization);
  } catch (error) {
    handleError(error);
  }
};

export const requestSearchProjects = async (
  handleResponse,
  handleError,
  query,
  currentPage,
  filterValues
) => {
  const paginationValue = currentPage * resultsPerPage;
  const queryString = query !== '' ? query : '*';
  const filterParameters = getFilterParameters(filterValues);
  const url = `${urlApi}/${endPointSearchProjects}?${apiKey}&q=${queryString}&start=${paginationValue}${filterParameters}`;
  try {
    const response = await axios.get(url);
    const projects =
      response.data.search.response.projects !== undefined
        ? response.data.search.response.projects.project
        : [];
    handleResponse(projects);
  } catch (error) {
    handleError(error);
  }
};

export const requestThemes = async (handleResponse, handleError) => {
  const url = `${urlApi}/${endPointThemes}?${apiKey}`;
  try {
    const response = await axios.get(url);
    handleResponse(response.data.themes.theme);
  } catch (error) {
    handleError(error);
  }
};

const getFilterParameters = (filterValues) => {
  const country =
    filterValues.country !== null ? `country:${filterValues.country.code}` : '';
  const themes = getThemesForFilterParameters(filterValues.themes);
  if (country !== '' || themes !== '') {
    let test = `&filter=${country}${
      country !== '' && themes !== '' ? ',' : ''
    }${themes}`;
    console.log('getFilterParameters final paramter:', test);
    return `&filter=${country}${
      country !== '' && themes !== '' ? ',' : ''
    }${themes}`;
  }
  return '';

  /*   const filterParameters = country !== '' ? `&filter=${country}` : '';
  return filterParameters; */
};

const getThemesForFilterParameters = (themes) => {
  let result = '';
  if (themes !== null) {
    themes.forEach((element) => {
      result += `theme:${element.id},`;
    });
    result = result.slice(0, -1);
  }
  return result;
};
