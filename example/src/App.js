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
  return (
    <div className='dropdown-demo'>
      <MonthPickerDropdown
        CTabIndex={3}
        label='Select Months'
        searchTextLabel='Filter the months by typing here'
        startYear={2018}
        startMonth={1}
        endYear={2020}
        endMonth={5}
        displayShortMonthName={true}
        displayShortYearName={false}
        onChange = {
          handleAMonthChange
        }
      />
    </div>
  )
}

export default App
