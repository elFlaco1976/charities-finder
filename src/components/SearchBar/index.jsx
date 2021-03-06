import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import CountrySelection from '../CountrySelection';
import ThemesSelection from '../ThemesSelection';
import './styles.scss';

const SearchBar = ({
  handleTextChange,
  searchText,
  handleSearchButton,
  handleCountryToggle,
  countryDropdownOpen,
  filterValues,
  handleCountryChange,
  handleEnterForSearchInput,
  handleThemesChange,
  allThemes,
  searchCountry,
  searchThemes
}) => {
  return (
    <div className="search-bar-container">
      <Paper className="search-input-paper" variant="outlined">
        <InputBase
          className="search-input"
          onChange={handleTextChange}
          value={searchText}
          variant="outlined"
          size="small"
          style={{ width: '100%' }}
          placeholder="Search by keywords"
          onKeyPress={(e) => {
            if (e.charCode === 13) handleEnterForSearchInput();
          }}
        />
        <IconButton
          onClick={handleSearchButton}
          variant="outlined"
          className="icon-button"
        >
          <Search />
        </IconButton>
      </Paper>
      <CountrySelection
        currentCountry={searchCountry}
        handleCountryChange={handleCountryChange}
      />
      <ThemesSelection
        allThemes={allThemes}
        handleThemesChange={handleThemesChange}
        searchThemes={searchThemes}
      />
    </div>
  );
};

export default SearchBar;
