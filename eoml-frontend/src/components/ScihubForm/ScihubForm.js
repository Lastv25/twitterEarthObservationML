import React, { useState } from 'react';

import {
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

import { htmlIdGenerator } from '@elastic/eui/lib/services';



export default function ScihubForm ({form})  {

    const [isSwitchChecked, setIsSwitchChecked] = useState(form.ingestion_parameter[0]);
    const [isSwitchChecked2, setIsSwitchChecked2] = useState(form.sensing_parameter[0]);
    const [isSwitchChecked3, setIsSwitchChecked3] = useState(form.mission1[0]);
    const [isSwitchChecked4, setIsSwitchChecked4] = useState(form.mission2[0]);
    const [isSwitchChecked5, setIsSwitchChecked5] = useState(form.mission3[0]);
    const onSwitchChange = () => {
        setIsSwitchChecked(!isSwitchChecked);
        form.ingestion_parameter[0] = !form.ingestion_parameter[0]
    };
    const onSwitchChange2 = () => {
        setIsSwitchChecked2(!isSwitchChecked2);
        form.sensing_parameter[0] = !form.sensing_parameter[0]
    };
    const onSwitchChange3 = () => {
        setIsSwitchChecked3(!isSwitchChecked3);
        form.mission1[0] = !form.mission1[0]
    };
    const onSwitchChange4 = () => {
        setIsSwitchChecked4(!isSwitchChecked4);
        form.mission2[0] = !form.mission2[0]
    };
    const onSwitchChange5 = () => {
        setIsSwitchChecked5(!isSwitchChecked5);
        form.mission3[0] = !form.mission3[0]
    };

    const [startingestionDate, setStartIngestionDate] = useState(form.ingestion_parameter[1]);
    const [startsensingDate, setStartSensingDate] = useState(form.sensing_parameter[1]);
    const [endingestionDate, setEndIngestionDate] = useState(form.ingestion_parameter[2]);
    const [endsensingDate, setEndSensingDate] = useState(form.sensing_parameter[2]);

    const handleChangeIngestionStart = (date) => {
       setStartIngestionDate(date);
       form.ingestion_parameter[1] = date;
    };
    const handleChangeIngestionEnd = (date) => {
       setEndIngestionDate(date);
       form.ingestion_parameter[2] = date;
    };
    const handleChangeSensingStart = (date) => {
       setStartSensingDate(date);
       form.sensing_parameter[1] = date;
    };
    const handleChangeSensingEnd = (date) => {
       setEndSensingDate(date);
       form.sensing_parameter[2] = date;
    };

    const [valuePlatform, setValuePlatform] = useState(form.mission1[1]);
    const onChangeM1Platform = (e) => {
        setValuePlatform(e.target.value);
        form.mission1[1] = e.target.value
    };

    const [valuePType, setValuePType] = useState(form.mission1[2]);
    const onChangeM1PType = (e) => {
        setValuePType(e.target.value);
        form.mission1[2] = e.target.value
    };

    const [valuePolarisation, setValuePolarisation] = useState(form.mission1[3]);
    const onChangeM1Polarisation = (e) => {
        setValuePolarisation(e.target.value);
        form.mission1[3] = e.target.value
    };

    const [valueSMode, setValueSMode] = useState(form.mission1[4]);
    const onChangeM1SMode = (e) => {
        setValueSMode(e.target.value);
        form.mission1[4] = e.target.value
    };

    const [valueOrbitM1, setValueOrbitM1] = useState(form.mission1[5]);
    const onChangeM1Orbit = (e) => {
      setValueOrbitM1(e.target.value);
      form.mission1[5] = e.target.value
    };


    const [valueM2Platform, setValueM2Platform] = useState(form.mission2[1]);
    const onChangeM2Platform = (e) => {
        setValueM2Platform(e.target.value);
        form.mission2[1] = e.target.value
    };

    const [valueM2PType, setValueM2PType] = useState(form.mission2[2]);
    const onChangeM2PType = (e) => {
        setValueM2PType(e.target.value);
        form.mission2[2] = e.target.value
    };

    const [valueOrbitM2, setValueOrbitM2] = useState(form.mission2[3]);
    const onChangeM2Orbit = (e) => {
      setValueOrbitM2(e.target.value);
      form.mission2[3] = e.target.value
    };

    const [valueCloudM2, setValueCloudM2] = useState(form.mission2[4]);
    const onChangeM2Cloud = (e) => {
      setValueCloudM2(e.target.value);
      form.mission2[4] = e.target.value
    };

    const [valueM3Platform, setValueM3Platform] = useState(form.mission3[1]);
    const onChangeM3Platform = (e) => {
        setValueM3Platform(e.target.value);
        form.mission3[1] = e.target.value
    };

    const [valueM3PType, setValueM3PType] = useState(form.mission3[2]);
    const onChangeM3PType = (e) => {
      setValueM3PType(e.target.value);
      form.mission3[2] = e.target.value
    };


    const [valueM3Timeliness, setValueM3Timeliness] = useState(form.mission3[3]);
    const onChangeM3Timeliness = (e) => {
        setValueM3Timeliness(e.target.value);
        form.mission3[3] = e.target.value
    };

    const [valueM3Instrument, setValueM3Instrument] = useState(form.mission3[4]);
    const onChangeM3Instrument = (e) => {
        setValueM3Instrument(e.target.value);
        form.mission3[4] = e.target.value
    };

    const [valueM3Level, setValueM3Level] = useState(form.mission3[5]);
    const onChangeM3Level = (e) => {
      setValueM3Level(e.target.value);
      form.mission3[5] = e.target.value
    };

    const [valueM3Orbit, setValueM3Orbit] = useState(form.mission3[6]);
    const onChangeM3Orbit = (e) => {
      setValueM3Orbit(e.target.value);
      form.mission3[6] = e.target.value
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
              selected={startingestionDate}
              onChange={handleChangeIngestionStart}
              startDate={startingestionDate}
              endDate={endingestionDate}
              showTimeSelect
            />
          }
          endDateControl={
            <EuiDatePicker
              disabled={!isSwitchChecked}
              selected={endingestionDate}
              onChange={handleChangeIngestionEnd}
              startDate={startingestionDate}
              endDate={endingestionDate}
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
              selected={startsensingDate}
              onChange={handleChangeSensingStart}
              startDate={startsensingDate}
              endDate={endsensingDate}
              showTimeSelect
            />
          }
          endDateControl={
            <EuiDatePicker
              disabled={!isSwitchChecked2}
              selected={endsensingDate}
              onChange={handleChangeSensingEnd}
              startDate={startsensingDate}
              endDate={endsensingDate}
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
                  value = {form.mission1[1]}
                  onChange={(e) => onChangeM1Platform(e)}
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
                  value = {form.mission1[2]}
                  onChange={(e) => onChangeM1PType(e)}
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
                  value = {form.mission1[3]}
                  onChange={(e) => onChangeM1Polarisation(e)}
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
                  value = {form.mission1[4]}
                  onChange={(e) => onChangeM1SMode(e)}
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
              <EuiFieldText name="orbit_number"
                  disabled={!isSwitchChecked3}
                  value={form.mission1[5]}
                  onChange={(e) => onChangeM1Orbit(e)}
                />
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
                  value = {form.mission2[1]}
                  onChange={(e) => onChangeM2Platform(e)}
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
                  value = {form.mission2[2]}
                  onChange={(e) => onChangeM2PType(e)}
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
              <EuiFieldText name="orbit_number"
              disabled={!isSwitchChecked4}
              value = {form.mission2[3]}
              onChange={(e) => onChangeM2Orbit(e)}
              />
            </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiFormRow label="Cloud Cover">
              <EuiFieldText name="cloud_cover"
              disabled={!isSwitchChecked4}
              value = {form.mission2[4]}
              onChange={(e) => onChangeM2Cloud(e)}
              />
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
                  value = {form.mission3[1]}
                  onChange={(e) => onChangeM3Platform(e)}
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
                  value = {form.mission3[2]}
                  onChange={(e) => onChangeM3PType(e)}
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
                  value = {form.mission3[3]}
                  onChange={(e) => onChangeM3Timeliness(e)}
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
                  value = {form.mission3[4]}
                  onChange={(e) => onChangeM3Instrument(e)}
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
                  value = {form.mission3[5]}
                  onChange={(e) => onChangeM3Level(e)}
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
              <EuiFieldText name="relative_orbit"
              disabled={!isSwitchChecked5}
              value = {form.mission3[6]}
              onChange={(e) => onChangeM3Orbit(e)}
              />
            </EuiFormRow>
        </EuiFlexItem>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );
};