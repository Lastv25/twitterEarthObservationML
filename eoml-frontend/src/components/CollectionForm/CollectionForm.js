import React, { useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiDatePicker,
  EuiSelect,
  EuiFieldText,
  EuiFormRow
} from '@elastic/eui';

import moment from 'moment';
import { SwitchForm, ScihubForm, EgeosForm } from "../../components"


export default function CollectionForm (props) {

    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    const handleChange = (date) => {
       setStartDate(date);
    };
    const handleChange2 = (date) => {
       setEndDate(date);
    };

    const [activeComponent, setActiveComponent] = useState("questions")

    const onSelectChange = (name) => {
        setActiveComponent(name);
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
          hasNoInitialSelection
          onChange={(value) => onSelectChange(value)}
          options={[
            { value: 'scihub', text: 'Copernicus SciHub' },
            { value: 'egeoes', text: 'e-Geos' },
          ]}
        />
      </EuiFormRow>

      <EuiSpacer />

       <div>
        {{
          'scihub': <ScihubForm />,
          'egeos': <EgeosForm />
        }}[param]
        </div>

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