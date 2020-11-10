import React, { useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiRadioGroup,
  EuiDatePicker,
  EuiSwitch,
  EuiFieldText,
  EuiRange,
  EuiFormRow
} from '@elastic/eui';

import moment from 'moment';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

const idPrefix = htmlIdGenerator()();


export default function EgeosForm ({form}) {
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
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
    const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
    };
  return (

    <EuiForm>
      <EuiFormRow>
        <EuiSwitch
          id={htmlIdGenerator()()}
          name="popswitch"
          label="Isn't this popover form cool?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiFormRow label="A text field">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>

      <EuiFormRow label="Range" helpText="Some help text for the range">
        <EuiRange min={0} max={100} name="poprange" />
      </EuiFormRow>

      <EuiSpacer />
      <EuiButton fullWidth>Save</EuiButton>
    </EuiForm>
  );
};