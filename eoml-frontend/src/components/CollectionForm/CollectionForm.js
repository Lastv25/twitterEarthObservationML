import React, { useState } from 'react';
import { connect } from "react-redux"

import {
  EuiButton,
  EuiForm,
  EuiSpacer,
  EuiDatePicker,
  EuiSelect,
  EuiFieldText,
  EuiFormRow,
  EuiPopover,
  EuiFlexGroup,
  EuiPanel,
  EuiFlexItem,
  EuiSwitch
} from '@elastic/eui';

import moment from 'moment';
import { useNavigate } from "react-router-dom"
import { ScihubForm, EgeosForm, MapCollection } from "../../components"
import { extractErrorMessages } from "../../utils/errors"
import validation from "../../utils/validation"
import { Actions as collectionsActions } from "../../redux/collections"



function CollectionForm ({user, collectionError, isLoading,createCollection}) {
    const [form, setForm] = React.useState({
        full_name: "",
        disaster: "Wildfires",
        notification: false,
        aoi: { "type": "Polygon","coordinates": [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]]},
        parameters: ""
    })
    const [scihubform, setScihubForm] = React.useState({
        platform: 'scihub',
        ingestion_parameter: [false, moment(), moment().add(11, 'd')],
        sensing_parameter: [false, moment(), moment().add(11, 'd')],
        mission1: [false, "", "", "", "", ""],
        mission2: [false, "", "", "", ""],
        mission3: [false, "", "", "", "", "", ""]
    })
    const [egeosform, setEgeosForm] = React.useState({
        platform: 'egeos',
        use_data: true,
        parameters: ''
    })
    const [errors, setErrors] = React.useState({})
    const [hasSubmitted, setHasSubmitted] = React.useState(false)
    const navigate = useNavigate()
    const collectionErrorList = extractErrorMessages(collectionError)

    const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
    }

    const onInputChange = (label, value) => {
        validateInput(label, value)
        setForm((state) => ({ ...state, [label]: value }))
      }


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
    const [isSwitchChecked2, setIsSwitchChecked2] = useState(form.notification);

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
    const onSwitchChange2 = () => {
        setIsSwitchChecked2(!isSwitchChecked2);
        form.notification = !form.notification;
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

    const handleSubmit = async (e) => {

        e.preventDefault()

        form.aoi = JSON.stringify(form.aoi)
        form.parameters = JSON.stringify(scihubform) + JSON.stringify(egeosform)

        // validate inputs before submitting
        Object.keys(form).forEach((label) => validateInput(label, form[label]))

        setHasSubmitted(true)
        const res = await createCollection({ new_collection: { ...form } })
        console.log(res)
        if (res?.success) {
              navigate(`/profile`)
              // redirect user to his profile page
            }

    }
    const getFormErrors = () => {
        const formErrors = []
        if (errors.form) {
          formErrors.push(errors.form)
        }
        if (hasSubmitted && collectionErrorList.length) {
          return formErrors.concat(collectionErrorList)
        }
        return formErrors
      }
  return (
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
            <EuiPanel>

            <EuiForm component="form" onSubmit={handleSubmit}>

              <EuiSpacer />

              <EuiFormRow label="Collection Name" >
                <EuiFieldText
                 name="full_name"
                 value = {form.full_name}
                 onChange={(e) => onInputChange(e.target.name, e.target.value)}
                 />
              </EuiFormRow>

              <EuiSpacer />

              <EuiFormRow label="Select a Disaster">
                <EuiSelect
                  name="disaster"
                  value = {form.disaster}
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                  options={[
                    { value: 'Wildfires', text: 'Wildfires' },
                    { value: 'Earthquakes', text: 'Earthquakes' },
                    { value: 'Hurricanes', text: 'Hurricanes' },
                    { value: 'Floods', text: 'Floods' },
                    { value: 'Tornado', text: 'Tornado' },
                  ]}
                />
              </EuiFormRow>

              <EuiSpacer />

              <EuiFormRow>
                <EuiPopover
                    id="ScihubPopover"
                    anchorPosition="rightUp"
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
                anchorPosition="rightUp"
                ownFocus
                button={button2}
                isOpen={isPopover2Open}
                closePopover={closePopover2}>
                <div><EgeosForm form={egeosform}/></div>
               </EuiPopover>

              <EuiSpacer />

              <EuiFormRow
                label="Interval Switch"
                hasChildLabel={false}>
                <EuiSwitch
                  name="switch2"
                  label="Use time Interval"
                  checked={isSwitchChecked}
                  onChange={onSwitchChange}
                />
              </EuiFormRow>
              <EuiFormRow label="Monitor From date">
                <EuiDatePicker
                  showTimeSelect={false}
                  selected={startDate}
                  onChange={handleChange}
                />
              </EuiFormRow>
              <EuiFormRow label="To date">
                <EuiDatePicker
                  disabled={!isSwitchChecked}
                  showTimeSelect={false}
                  selected={endDate}
                  onChange={handleChange2}
                />
              </EuiFormRow>

              <EuiSpacer />

              <EuiFormRow
                label="Notification Switch"
                hasChildLabel={false}>
                <EuiSwitch
                  name="switch"
                  label="Should we do this?"
                  checked={isSwitchChecked2}
                  onChange={onSwitchChange2}
                />
              </EuiFormRow>


              <EuiButton type="submit" isLoading={isLoading} fill>
                Save filter
              </EuiButton>
            </EuiForm>
           </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
       <EuiPanel>
        <MapCollection form={form}/>
       </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
export default connect(state => ({
  user: state.auth.user,
  collectionError: state.coll.error,
  isLoading: state.coll.isLoading,
}), {
  createCollection: collectionsActions.createCollection
})(CollectionForm)