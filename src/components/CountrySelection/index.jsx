import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { StylesProvider } from '@material-ui/core/styles';
import countries from '../../utils/countries';
import './styles.scss';

const CountrySelection = ({ currentCountry, handleCountryChange }) => {
  return (
    <StylesProvider injectFirst>
      <Autocomplete
        value={currentCountry}
        options={countries}
        size="small"
        className="autocomplete"
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(option) => <>{option.name}</>}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
            className="text-field"
          />
        )}
        onChange={(event, newInputValue) => {
          handleCountryChange(newInputValue);
        }}
      />
    </StylesProvider>
  );
};

export default CountrySelection;
