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
  EuiText,
  EuiSuperDatePicker,
  EuiSwitch
} from '@elastic/eui';

import moment from 'moment';
import { ScihubForm, EgeosForm } from "../../components"


export default function CollectionForm (props) {
    const [form, setForm] = React.useState({
        full_name: "",
        disaster: "",
        notification: "",
        parameters: ""
    })
    const [scihubform, setScihubForm] = React.useState({
        parameters: ""
    })
    const [egeosform, setEgeosForm] = React.useState({
        use_data: true,
        parameters: ''
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
        const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [start, setStart] = useState('now-30m');
      const [end, setEnd] = useState('now');
      const [isPaused, setIsPaused] = useState(true);
      const [refreshInterval, setRefreshInterval] = useState();

      const onTimeChange = ({ start, end }) => {
        const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
          const isDuplicate =
            recentlyUsedRange.start === start && recentlyUsedRange.end === end;
          return !isDuplicate;
        });
        recentlyUsedRange.unshift({ start, end });
        setStart(start);
        setEnd(end);
        setRecentlyUsedRanges(
          recentlyUsedRange.length > 10
            ? recentlyUsedRange.slice(0, 9)
            : recentlyUsedRange
        );
        setIsLoading(true);
        startLoading();
      };

      const onRefresh = ({ start, end, refreshInterval }) => {
        return new Promise((resolve) => {
          setTimeout(resolve, 100);
        }).then(() => {
          console.log(start, end, refreshInterval);
        });
      };

      const onStartInputChange = (e) => {
        setStart(e.target.value);
      };

      const onEndInputChange = (e) => {
        setEnd(e.target.value);
      };

      const startLoading = () => {
        setTimeout(stopLoading, 1000);
      };

      const stopLoading = () => {
        setIsLoading(false);
      };

      const onRefreshChange = ({ isPaused, refreshInterval }) => {
        setIsPaused(isPaused);
        setRefreshInterval(refreshInterval);
      };


  return (
    /* DisplayToggles wrapper for Docs only */
    <EuiForm component="form">

      <EuiSpacer />

      <EuiFormRow label="Collection Name" >
        <EuiFieldText name="full_name" value={form.full_name}/>
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Select a Disaster">
        <EuiSelect
          name="disaster"
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

      <EuiFormRow>
        <EuiPopover
            id="ScihubPopover"
            anchorPosition="rightDown"
            ownFocus
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}>

            <ScihubForm form={scihubform}/>
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
        <div><EgeosForm form={egeosform}/></div>
       </EuiPopover>

      <EuiSpacer />

      <EuiText size='s'>
        Monitoring time interval for your events and products
      </EuiText>
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        showUpdateButton={false}
        recentlyUsedRanges={recentlyUsedRanges}
      />

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