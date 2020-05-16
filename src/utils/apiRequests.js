/* eslint-disable import/prefer-default-export */
import axios from 'axios';

//https://www.globalgiving.org/search/?size=25&nextPage=1&sortField=sortorder&selectedCountries=00india&selectedThemes=children&selectedThemes=ecdev&selectedThemes=rights&loadAllResults=true

// ====== example of a filtered query in postman, wihout a keyword:
// q=*&start=0&filter=country:co,theme:edu,theme:children
// Some notes:
// -Can have only one country parameter
// -Can have multiple themes
// -Cant change number of items per response

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
    console.log('response.data: ', response.data.organizations.organization);
    handleResponse(response.data.organizations.organization);
  } catch (error) {
    handleError(error);
    console.log('request error: ', error);
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
  console.log('url:' + url);
  try {
    const response = await axios.get(url);
    const projects =
      response.data.search.response.projects !== undefined
        ? response.data.search.response.projects.project
        : [];
    console.log('response.data: ', projects);
    handleResponse(projects);
  } catch (error) {
    handleError(error);
    console.log('request error: ', error);
  }
};

export const requestThemes = async (handleResponse, handleError) => {
  const url = `${urlApi}/${endPointThemes}?${apiKey}`;
  try {
    const response = await axios.get(url);
    handleResponse(response.data.themes.theme);
  } catch (error) {
    handleError(error);
    console.log('request error: ', error);
  }
};

const getFilterParameters = (filterValues) => {
  const country =
    filterValues.country !== null ? `country:${filterValues.country.code}` : '';
  const filterParameters = country !== '' ? `&filter=${country}` : '';
  return filterParameters;
};
