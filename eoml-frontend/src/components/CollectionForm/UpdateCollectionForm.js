import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from "react-redux"

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
  EuiLoadingSpinner,
  EuiSwitch
} from '@elastic/eui';

import moment from 'moment';
import { useParams, useNavigate } from "react-router-dom"
import { ScihubForm, EgeosForm, MapCollection } from "../../components"
import { extractErrorMessages } from "../../utils/errors"
import validation from "../../utils/validation"
import { Actions as collectionsActions } from "../../redux/collections"
import { Actions as currentcollectionActions } from "../../redux/current_collection"



function CollectionForm ({isLoading, form, user, collectionError, fetchCollectionById, updateCollection}) {
//export default function CollectionForm () {

    //const dispatch = useDispatch();

    //const isLoading = useSelector(state => state.coll.isLoading);
    //const collectionError = useSelector(state => state.coll.error);

    //const form = useSelector(state => state.coll.current_collection);

    //const egeosform = useSelector(state => JSON.parse(state.coll.current_collection.parameters).platform.egeos);

    //const scihubform = useSelector(state => JSON.parse(state.coll.current_collection.parameters).platform.scihub);

    const { collection_id } = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = React.useState({})
    const [hasSubmitted, setHasSubmitted] = React.useState(false)
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isPopover2Open, setIsPopover2Open] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [isSwitchChecked2, setIsSwitchChecked2] = useState(false);

    React.useEffect(() => {
        if (collection_id) {
          fetchCollectionById({ collection_id })
        }
      }, [collection_id, fetchCollectionById])


    if (isLoading) return <EuiLoadingSpinner size="xl" />
    if (!form) return <EuiLoadingSpinner size="xl" />


    const collectionErrorList = extractErrorMessages(collectionError)

    const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
    }

    const onInputChangeName = (label, value) => {
        validateInput(label, value)
        form.full_name = value
      }
    const onInputChangeDisaster = (label, value) => {
        validateInput(label, value)
        form.disaster = value
      }

    const handleChange = (date) => {
       setStartDate(date);
    };
    const handleChange2 = (date) => {
       setEndDate(date);
    };

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
        //form.parameters = JSON.stringify(scihubform) + JSON.stringify(egeosform)

        // validate inputs before submitting
        Object.keys(form).forEach((label) => validateInput(label, form[label]))

        setHasSubmitted(true)
//        const res = await dispatch(collectionsActions.updateCollection({ new_collection: { ...form } }))
//
//        if (res?.success) {
//              navigate(`/profile`)
//              // redirect user to his profile page
//            }

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
                 onChange={(e) => onInputChangeName(e.target.name, e.target.value)}
                 />
              </EuiFormRow>

              <EuiSpacer />

              <EuiFormRow label="Select a Disaster">
                <EuiSelect
                  name="disaster"
                  value = {form.disaster}
                  onChange={(e) => onInputChangeDisaster(e.target.name, e.target.value)}
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

                    <ScihubForm />
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
                <div><EgeosForm/></div>
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
  isLoading: state.coll.isLoading,
  form:state.coll.current_collection,
  user: state.auth.user,
  collectionError: state.coll.error,
}), {
  fetchCollectionById: collectionsActions.fetchCollectionById,
  updateCollection: collectionsActions.updateCollection
})(CollectionForm)