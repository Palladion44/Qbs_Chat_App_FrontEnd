import React from "react";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import { country_codes_and_flags } from './helpers/countrydata';

const CountrySelect = () => {
  const customOption = (option) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ReactCountryFlag
        countryCode={option.value}
        svg
        style={{
          width: '2em',
          height: '2em',
          marginRight: '8px',
        }}
      />
      <span>{option.label}</span>
      <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{option.code}</span>
    </div>
  );

  return (
    <Select
      options={country_codes_and_flags.map(country => ({
        value: country.value,
        label: country.label,
        code: country.code,
      }))}
      formatOptionLabel={customOption}
      placeholder="Select a country"
      isSearchable
    />
  );
};

export default CountrySelect;
