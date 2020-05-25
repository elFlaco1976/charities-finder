import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { StylesProvider } from '@material-ui/core/styles';
import './styles.scss';

const ThemesSelection = ({ allThemes, handleThemesChange }) => {
  return (
    <StylesProvider injectFirst>
      <Autocomplete
        multiple
        options={allThemes}
        size="small"
        getOptionLabel={(option) => option.name}
        defaultValue={null}
        filterSelectedOptions
        className="themes-selection-container"
        renderInput={(params) => (
          <TextField {...params} variant="outlined" className="text-field" />
        )}
        onChange={(event, values) => {
          handleThemesChange(values);
        }}
      />
    </StylesProvider>
  );
};

export default ThemesSelection;