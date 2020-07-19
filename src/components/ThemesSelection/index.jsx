import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { StylesProvider } from '@material-ui/core/styles';
import './styles.scss';

const ThemesSelection = ({ allThemes, handleThemesChange, searchThemes }) => {
  return (
    <StylesProvider injectFirst>
      <Autocomplete
        value={searchThemes}
        multiple
        options={allThemes}
        size="small"
        getOptionLabel={(option) => option.name}
        defaultValue={searchThemes}
        filterSelectedOptions
        className="themes-selection-container"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search by themes"
            variant="outlined"
            className="text-field"
          />
        )}
        onChange={(event, values) => {
          handleThemesChange(values);
        }}
      />
    </StylesProvider>
  );
};

export default ThemesSelection;
