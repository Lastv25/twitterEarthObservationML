import React, { Component, useState } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSwitch,
  EuiSpacer,
  EuiDatePicker,
  EuiDatePickerRange,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiSelect,
  EuiFormRow
} from '@elastic/eui';

import moment from 'moment';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

const idPrefix = htmlIdGenerator()();


export default function ScihubForm ({form})  {

    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [isSwitchChecked2, setIsSwitchChecked2] = useState(false);
    const [isSwitchChecked3, setIsSwitchChecked3] = useState(false);
    const [isSwitchChecked4, setIsSwitchChecked4] = useState(false);
    const [isSwitchChecked5, setIsSwitchChecked5] = useState(false);
    const onSwitchChange = () => {
        setIsSwitchChecked(!isSwitchChecked);
    };
    const onSwitchChange2 = () => {
        setIsSwitchChecked2(!isSwitchChecked2);
    };
    const onSwitchChange3 = () => {
        setIsSwitchChecked3(!isSwitchChecked3);
    };
    const onSwitchChange4 = () => {
        setIsSwitchChecked4(!isSwitchChecked4);
    };
    const onSwitchChange5 = () => {
        setIsSwitchChecked5(!isSwitchChecked5);
    };

    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment().add(11, 'd'));

    const handleChange = (date) => {
       setStartDate(date);
    };

  return (
    /* DisplayToggles wrapper for Docs only */
    <EuiForm component="form">
      <EuiFormRow
        hasChildLabel={false}>
        <EuiSwitch
          name="switch1"
          label="Ingestion Period"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiDatePickerRange
          startDateControl={
            <EuiDatePicker
              disabled={!isSwitchChecked}
              selected={startDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
            />
          }
          endDateControl={
            <EuiDatePicker
              disabled={!isSwitchChecked}
              selected={endDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
            />
        }
      />

      <EuiSpacer />

      <EuiFormRow
        hasChildLabel={false}>
        <EuiSwitch
          name="switch2"
          label="Sensing Period"
          checked={isSwitchChecked2}
          onChange={onSwitchChange2}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiDatePickerRange

          startDateControl={
            <EuiDatePicker
              disabled={!isSwitchChecked2}
              selected={startDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
            />
          }
          endDateControl={
            <EuiDatePicker
              disabled={!isSwitchChecked2}
              selected={endDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
            />
        }
      />

      <EuiSpacer />

      <EuiFormRow
        hasChildLabel={false}>
        <EuiSwitch
          name="switch3"
          label="Mission: Sentinel 1"
          checked={isSwitchChecked3}
          onChange={onSwitchChange3}
        />
      </EuiFormRow>
      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Platform">
              <EuiSelect
                  disabled={!isSwitchChecked3}
                  name="platform"
                  hasNoInitialSelection
                  options={[
                    { value: 's1a_', text: 'S1A_*' },
                    { value: 's1b_', text: 'S1B_*' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Product Type">
              <EuiSelect
                   disabled={!isSwitchChecked3}
                  name="product_type"
                  hasNoInitialSelection
                  options={[
                    { value: 'slc', text: 'SLC' },
                    { value: 'grd', text: 'GRD' },
                    { value: 'ocn', text: 'OCN' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Polarisation">
              <EuiSelect
                  disabled={!isSwitchChecked3}
                  name="polarisation"
                  hasNoInitialSelection
                  options={[
                    { value: 'hh', text: 'HH' },
                    { value: 'vv', text: 'VV' },
                    { value: 'hv', text: 'HV' },
                    { value: 'vh', text: 'VH' },
                    { value: 'hh_hv', text: 'HH+HV' },
                    { value: 'vv_vh', text: 'VV+VH' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Sensor Mode">
              <EuiSelect
                  disabled={!isSwitchChecked3}
                  name="sensor_mode"
                  hasNoInitialSelection
                  options={[
                    { value: 'sm', text: 'SM' },
                    { value: 'iw', text: 'IW' },
                    { value: 'ew', text: 'EW' },
                    { value: 'wv', text: 'WV' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Orbit Number">
              <EuiFieldText name="orbit_number"  disabled={!isSwitchChecked3}/>
            </EuiFormRow>
        </EuiFlexItem>

      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFormRow
        hasChildLabel={false}>
        <EuiSwitch
          name="switch4"
          label="Mission: Sentinel 2"
          checked={isSwitchChecked4}
          onChange={onSwitchChange4}
        />
      </EuiFormRow>
      <EuiSpacer />

      <EuiFormRow
        hasChildLabel={false}>
        <EuiSwitch
          name="switch5"
          label="Mission: Sentinel 3"
          checked={isSwitchChecked5}
          onChange={onSwitchChange5}
        />
      </EuiFormRow>

    </EuiForm>
  );
};