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

    const [isSwitchChecked, setIsSwitchChecked] = useState(form.switch_ingestion);
    const [isSwitchChecked2, setIsSwitchChecked2] = useState(form.switch_sensing);
    const [isSwitchChecked3, setIsSwitchChecked3] = useState(form.switch_mission1);
    const [isSwitchChecked4, setIsSwitchChecked4] = useState(form.switch_mission2);
    const [isSwitchChecked5, setIsSwitchChecked5] = useState(form.switch_mission3);
    const onSwitchChange = () => {
        setIsSwitchChecked(!isSwitchChecked);
        form.switch_ingestion = !form.switch_ingestion
    };
    const onSwitchChange2 = () => {
        setIsSwitchChecked2(!isSwitchChecked2);
        form.switch_sensing = !form.switch_sensing
    };
    const onSwitchChange3 = () => {
        setIsSwitchChecked3(!isSwitchChecked3);
        form.switch_mission1 = !form.switch_mission1
    };
    const onSwitchChange4 = () => {
        setIsSwitchChecked4(!isSwitchChecked4);
        form.switch_mission2 = !form.switch_mission2
    };
    const onSwitchChange5 = () => {
        setIsSwitchChecked5(!isSwitchChecked5);
        form.switch_mission3 = !form.switch_mission3
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
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Platform">
              <EuiSelect
                  disabled={!isSwitchChecked4}
                  name="platform"
                  hasNoInitialSelection
                  options={[
                    { value: 's2a_', text: 'S2A_*' },
                    { value: 's2b_', text: 'S2B_*' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Product Type">
              <EuiSelect
                   disabled={!isSwitchChecked4}
                  name="product_type"
                  hasNoInitialSelection
                  options={[
                    { value: 's2msi1c', text: 'S2MSI1C' },
                    { value: 's2msi2a', text: 'S2MSI2A' },
                    { value: 's2msi2ap', text: 'S2MSI2Ap' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Orbit Number">
              <EuiFieldText name="orbit_number"  disabled={!isSwitchChecked4}/>
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFormRow label="Cloud Cover">
              <EuiFieldText name="cloud_cover"  disabled={!isSwitchChecked4}/>
            </EuiFormRow>
        </EuiFlexItem>

      </EuiFlexGroup>
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
      <EuiSpacer />
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Platform">
              <EuiSelect
                  disabled={!isSwitchChecked5}
                  name="platform"
                  hasNoInitialSelection
                  options={[
                    { value: 's3a_', text: 'S3A_*' },
                    { value: 's3b_', text: 'S3B_*' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Product Type">
              <EuiSelect
                   disabled={!isSwitchChecked5}
                  name="product_type"
                  hasNoInitialSelection
                  options={[
                    { value: 'ol1efr', text: 'OL_1_EFR___' },
                    { value: 'ol1err', text: 'OL_1_ERR___' },
                    { value: 'ol2lfr', text: 'OL_2_LFR___' },
                    { value: 'ol2lrr', text: 'OL_2_LRR___' },
                    { value: 'sr1sra', text: 'SR_1_SRA___' },
                    { value: 'sr1sraa', text: 'SR_1_SRA_A_' },
                    { value: 'sr1srabs', text: 'SR_1_SRA_BS' },
                    { value: 'sr2lan', text: 'SR_2_LAN___' },
                    { value: 'sl1rbt', text: 'SL_1_RBT___' },
                    { value: 'sl2lst', text: 'SL_2_LST___' },
                    { value: 'sl2frp', text: 'SL_2_FRP___' },
                    { value: 'sy2syn', text: 'SY_2_SYN___' },
                    { value: 'sy2v10', text: 'SY_2_V10___' },
                    { value: 'sy2vg1', text: 'SY_2_VG1___' },
                    { value: 'sy2vgp', text: 'SY_2_VGP___' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Timeliness">
              <EuiSelect
                  disabled={!isSwitchChecked5}
                  name="timeliness"
                  hasNoInitialSelection
                  options={[
                    { value: 'nrt', text: '"Near Real Time"' },
                    { value: 'stc', text: '"Short Time Critical"' },
                    { value: 'ntc', text: '"Non Time Critical"' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Instrument">
              <EuiSelect
                   disabled={!isSwitchChecked5}
                  name="instrument"
                  hasNoInitialSelection
                  options={[
                    { value: 'olci', text: 'OLCI' },
                    { value: 'sral', text: 'SRAL' },
                    { value: 'slstr', text: 'SLSTR' },
                    { value: 'synergy', text: 'SYNERGY' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
            <EuiFormRow label="Product Level">
              <EuiSelect
                  disabled={!isSwitchChecked5}
                  name="product_level"
                  hasNoInitialSelection
                  options={[
                    { value: 'l1', text: 'L1' },
                    { value: 'l2', text: 'L2' },
                  ]}
                />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Relative Orbit">
              <EuiFieldText name="relative_orbit"  disabled={!isSwitchChecked5}/>
            </EuiFormRow>
        </EuiFlexItem>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );
};