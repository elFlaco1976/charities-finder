import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import countries from '../../utils/countries';
import { Multiselect } from 'multiselect-react-dropdown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';
import { StylesProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const CountrySelection = ({
  handleCountryToggle,
  countryDropdownOpen,
  currentCountry,
  handleCountryChange,
}) => {
  const classes = useStyles();
  const options = countries.map((country) => {
    return { key: country.name };
  });
  return (
    <StylesProvider injectFirst>
      <Autocomplete
        value={currentCountry}
        options={countries}
        size="small"
        className="autocomplete"
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(option) => (
          <React.Fragment>
            {option.name} ({option.code})
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            className="text-field"
          />
        )}
        onChange={(event, newInputValue) => {
          handleCountryChange(newInputValue);
        }}
      />
    </StylesProvider>

    /*     <div>
      <Dropdown
        isOpen={countryDropdownOpen}
        toggle={handleCountryToggle}
      >
        <DropdownToggle caret>
          {currentCountry}
        </DropdownToggle>
        <DropdownMenu>
          {countries.map((country) => {
            return (
              <DropdownItem value={country.code} onClick={handleCountryChange}>
                {country.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div> */
  );
};

export default CountrySelection;
