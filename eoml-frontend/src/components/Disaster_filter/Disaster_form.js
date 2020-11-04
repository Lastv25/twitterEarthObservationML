import React, { useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiRadioGroup,
} from '@elastic/eui';


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

      <EuiSpacer />

      <EuiButton type="submit" fill>
        Save filter
      </EuiButton>
    </EuiForm>
  );
};