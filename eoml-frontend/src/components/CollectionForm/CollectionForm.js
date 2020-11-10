import React, { useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiDatePicker,
  EuiSelect,
  EuiFieldText,
  EuiFormRow,
  EuiPopover,
  EuiSwitch
} from '@elastic/eui';

import moment from 'moment';
import { ScihubForm, EgeosForm } from "../../components"


export default function CollectionForm (props) {
    const [form, setForm] = React.useState({
        full_name: "",
        disaster: "",
        notification: "",
        aoi: "",
        parameters: ""
    })
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    const handleChange = (date) => {
       setStartDate(date);
    };
    const handleChange2 = (date) => {
       setEndDate(date);
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isPopover2Open, setIsPopover2Open] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);

    const onButtonClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };
    const onButton2Click = () => {
        setIsPopover2Open(!isPopover2Open);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };
    const closePopover2 = () => {
        setIsPopover2Open(false);
    };
    const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
    };

    const button = (
        <EuiButton
          iconSide="right"
          fill
          iconType="arrowRight"
          onClick={onButtonClick}>
          Schiub
        </EuiButton>
      );
    const button2 = (
        <EuiButton
          iconSide="right"
          fill
          iconType="arrowRight"
          onClick={onButton2Click}>
          E-Geos
        </EuiButton>
      );
  return (
    /* DisplayToggles wrapper for Docs only */
    <EuiForm component="form">

      <EuiSpacer />

      <EuiFormRow label="Collection Name" >
        <EuiFieldText name="full_name" value={form.full_name}/>
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Select a Disaster" name="disaster">
        <EuiSelect
          hasNoInitialSelection
          options={[
            { value: 'wildfires', text: 'Wildfires' },
            { value: 'Earthquakes', text: 'Earthquakes' },
            { value: 'Hurricanes', text: 'Hurricanes' },
            { value: 'Floods', text: 'Floods' },
            { value: 'Tornado', text: 'Tornado' },
          ]}
//          value={form.disaster}
        />
      </EuiFormRow>

      <EuiSpacer />
        <EuiFormRow label="Area of Interest" >
            <EuiFieldText name="aoi" value={form.aoi}/>
          </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow>
        <EuiPopover
            id="ScihubPopover"
            anchorPosition="rightDown"
            ownFocus
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}>

            <ScihubForm />
          </EuiPopover>
      </EuiFormRow>

      <EuiSpacer />

       <EuiPopover
        id="EgeosPopover"
        anchorPosition="rightDown"
        ownFocus
        button={button2}
        isOpen={isPopover2Open}
        closePopover={closePopover2}>
        <div><EgeosForm /></div>
       </EuiPopover>

      <EuiSpacer />

      <EuiFormRow label="From date">
        <EuiDatePicker selected={startDate} onChange={handleChange} />
      </EuiFormRow>

      <EuiFormRow label="To date">
        <EuiDatePicker selected={endDate} onChange={handleChange2} />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow
        label="Notification Switch"
        hasChildLabel={false}>
        <EuiSwitch
          name="switch"
          label="Should we do this?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiButton type="submit" fill>
        Save filter
      </EuiButton>
    </EuiForm>
  );
};