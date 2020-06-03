import React from 'react'

import {
  MonthPickerDropdown
} from 'react-month-picker-dropdown'
import 'react-month-picker-dropdown/dist/index.css'

import './green-theme.scss';

const App = () => {

  const handleAMonthChange = (event) => {
    console.log(event)
  }

  const getMarkUpForOkButton = () => {
    return (
      <button className='button'> Select Me</button>
    )
  }

  const getMarkUpForCancelButton = () => {
    return (
      <button className='button'> Cancel Me</button>
    )
  }

  return (
    <div className="dropdown-demo">
      <MonthPickerDropdown
        CTabIndex={3}
        label="Select Months"
        searchTextLabel="Filter the months by typing here"
        startYear={2018}
        startMonth={1}
        endYear={2020}
        endMonth={5}
        displayShortMonthName={true}
        displayShortYearName={false}
        hideCheckBox={true}
        // displayOkAndCancelButton={true}
        // markUpForOkButton={getMarkUpForOkButton}
        // markUpForCancelButton={getMarkUpForCancelButton}
        onChange={handleAMonthChange}
      />
    </div>
  );
}

export default App
