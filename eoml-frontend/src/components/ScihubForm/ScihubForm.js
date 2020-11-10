import React, { useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiRadioGroup,
  EuiDatePicker,
  EuiFormRow
} from '@elastic/eui';

import moment from 'moment';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

const idPrefix = htmlIdGenerator()();


export default function ScihubForm ({form})  {
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

    const handleChange = (date) => {
       setStartDate(date);
    };
  return (
    /* DisplayToggles wrapper for Docs only */
    <EuiForm component="form">

      <EuiSpacer />

      <EuiRadioGroup
        options={radios}
        idSelected={radioIdSelected}
        onChange={(id) => onChange(id)}
        name="radio group"
        legend={{
          children: <span>List of events that can currently be monitored through this application</span>,
        }}
      />


    </EuiForm>
  );
};