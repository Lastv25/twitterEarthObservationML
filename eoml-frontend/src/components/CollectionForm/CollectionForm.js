import React, { useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiRadioGroup,
  EuiDatePicker,
  EuiSelect,
  EuiText,
  EuiFieldText,
  EuiFormRow
} from '@elastic/eui';

import moment from 'moment';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

const idPrefix = htmlIdGenerator()();


export default function DisasterForm (props) {
    const radios = [
    {
      id: `${idPrefix}0`,
      label: 'Wildfires',
    },
    {
      id: `${idPrefix}1`,
      label: 'Earthquakes',
    },
    {
      id: `${idPrefix}2`,
      label: 'Hurricanes',
    },
    {
      id: `${idPrefix}3`,
      label: 'Floods',
    },
    {
      id: `${idPrefix}4`,
      label: 'Tornado',
    },
    ];

    const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}0`);

    const onChange = (optionId) => {
        setRadioIdSelected(optionId);
    };

    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    const handleChange = (date) => {
       setStartDate(date);
    };
    const handleChange2 = (date) => {
       setEndDate(date);
    };
  return (
    /* DisplayToggles wrapper for Docs only */
    <EuiForm component="form">

      <EuiSpacer />

      <EuiFormRow label="Collection Name" >
        <EuiFieldText name="first" />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Select a Disaster">
        <EuiSelect
          hasNoInitialSelection
          options={[
            { value: 'wildfires', text: 'Wildfires' },
            { value: 'Earthquakes', text: 'Earthquakes' },
            { value: 'Hurricanes', text: 'Hurricanes' },
            { value: 'Floods', text: 'Floods' },
            { value: 'Tornado', text: 'Tornado' },
          ]}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Select a Data Platform">
        <EuiSelect
          options={[
            { value: 'scihub', text: 'Copernicus SciHub' },
            { value: 'egeoes', text: 'e-Geos' },
          ]}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="From date">
        <EuiDatePicker selected={startDate} onChange={handleChange} />
      </EuiFormRow>

      <EuiFormRow label="To date">
        <EuiDatePicker selected={endDate} onChange={handleChange2} />
      </EuiFormRow>

      <EuiSpacer />

      <EuiButton type="submit" fill>
        Save filter
      </EuiButton>
    </EuiForm>
  );
};