import React, { useState } from 'react'
import { constants } from './constants'
import { PropsIntf, YearsWithMonthIntf } from './app.model'
import {
  validateAndSetValidInputValues,
  getTotalMonthsAndYears,
  getWeightedSelectedClass,
  getSelectedMonthAndYearsLabel,
  getFinalValue
} from './app.services'

import './styles.scss'

const renderErrorMessage = (errorMessage: string) => {
  return (
    <div className='month-picker-dropdown'>
      <span className='error'>{errorMessage}</span>
    </div>
  )
}

export const MonthPickerDropdown = (props: PropsIntf) => {
  const { monthsAndYears, errorMessage } = validateAndSetValidInputValues(props)
  if (errorMessage) {
    return renderErrorMessage(errorMessage)
  }

  const months = getTotalMonthsAndYears({ ...props, ...monthsAndYears })

  const [monthsAndYearsWithSelection, updateMonthAdYearSection] = useState(months)
  const [selectedMonthsAndYearsID, setSelectedMonthsAndYearsID] = useState({
    firstSelectedMonthID: null,
    lastSelectedMonthID: null
  })
  const [isVisible, setPickerVisibility] = useState(
    constants.VISIBILITY_HIDDEN_CLASS
  )

  const toggleOptionList = () => {
    setPickerVisibility(constants.VISIBILITY_HIDDEN_CLASS)
  }

  const handleClick = (selectedMonthAndYear: YearsWithMonthIntf, props: PropsIntf) => {
    let isReverse = false
    if (selectedMonthsAndYearsID.firstSelectedMonthID !== null) {
      if (selectedMonthsAndYearsID.firstSelectedMonthID > selectedMonthAndYear.id) {
        isReverse = true
      } else {
        isReverse = false
      }
    }
    if (
      selectedMonthsAndYearsID.firstSelectedMonthID === null ||
      (selectedMonthsAndYearsID.firstSelectedMonthID !== null &&
        selectedMonthsAndYearsID.lastSelectedMonthID !== null)
    ) {
      const updatedMonth = monthsAndYearsWithSelection.map(
        (m: YearsWithMonthIntf) => {
          m.hovered = false
          m.selected = m.id === selectedMonthAndYear.id
          return m
        }
      )
      updateMonthAdYearSection(updatedMonth)
      setSelectedMonthsAndYearsID({
        firstSelectedMonthID: selectedMonthAndYear.id,
        lastSelectedMonthID: null
      })
    } else {
      if (
        selectedMonthAndYear.id ===
        selectedMonthsAndYearsID.firstSelectedMonthID
      ) {
        setSelectedMonthsAndYearsID({
          firstSelectedMonthID: null,
          lastSelectedMonthID: null
        })
        updateMonthAdYearSection(months)
        return
      }
      const updatedMonth = monthsAndYearsWithSelection.map(
        (m: YearsWithMonthIntf) => {
          if (
            selectedMonthsAndYearsID.firstSelectedMonthID > m.id &&
            selectedMonthAndYear.id <= m.id &&
            isReverse
          ) {
            m.selected = true
          } else if (
            selectedMonthsAndYearsID.firstSelectedMonthID < m.id &&
            selectedMonthAndYear.id >= m.id
          ) {
            m.selected = true
          }
          return m
        }
      )
      updateMonthAdYearSection(updatedMonth)
      setSelectedMonthsAndYearsID({
        firstSelectedMonthID: selectedMonthsAndYearsID.firstSelectedMonthID,
        lastSelectedMonthID: selectedMonthAndYear.id
      })

      const finalSelectedValue = getFinalValue(
        updatedMonth,
        selectedMonthsAndYearsID.firstSelectedMonthID,
        selectedMonthAndYear.id
      )
      if (finalSelectedValue) {
        props.onChange({
          startMonth: finalSelectedValue.startMonth,
          startYear: finalSelectedValue.startYear,
          endMonth: finalSelectedValue.endMonth,
          endYear: finalSelectedValue.endYear
        })
      }
    }
  }

  const handleOnMouseEnter = (monthAndYear: YearsWithMonthIntf) => {
    let isReverse = false
    if (
      (selectedMonthsAndYearsID.firstSelectedMonthID !== null &&
        selectedMonthsAndYearsID.lastSelectedMonthID !== null) ||
      (selectedMonthsAndYearsID.firstSelectedMonthID === null &&
        selectedMonthsAndYearsID.lastSelectedMonthID === null)
    ) {
      return
    }
    if (selectedMonthsAndYearsID.firstSelectedMonthID !== null) {
      if (selectedMonthsAndYearsID.firstSelectedMonthID > monthAndYear.id) {
        isReverse = true
      } else {
        isReverse = false
      }
    }
    const updatedMonth = monthsAndYearsWithSelection.map(
      (m: YearsWithMonthIntf) => {
        if (
          selectedMonthsAndYearsID.firstSelectedMonthID > m.id &&
          monthAndYear.id <= m.id &&
          isReverse
        ) {
          m.hovered = true
        } else if (
          selectedMonthsAndYearsID.firstSelectedMonthID < m.id &&
          monthAndYear.id >= m.id
        ) {
          m.hovered = true
        } else {
          m.hovered = false
        }
        return m
      }
    )
    updateMonthAdYearSection(updatedMonth)
  }

  const handleOnMouseLeave = () => {
    const updatedMonth = monthsAndYearsWithSelection.map(
      (m: YearsWithMonthIntf) => {
        m.hovered = false
        return m
      }
    )
    updateMonthAdYearSection(updatedMonth)
  }

  const renderSelectPicker = (months: YearsWithMonthIntf[]) => {
    return (
      <div className={`select-picker ${isVisible}`}>
        <div
          className='select-picker-options'
          onMouseLeave={handleOnMouseLeave}
        >
          {months.map((m: YearsWithMonthIntf) => (
            <div
              onClick={() => {
                handleClick(m, props)
              }}
              onMouseEnter={() => {
                handleOnMouseEnter(m)
              }}
              className={`options ${getWeightedSelectedClass(
                m
              )}`}
              key={m.id}
            >
              <input
                readOnly
                className='option-checkbox'
                type='checkbox'
                tabIndex={-1}
                checked={m.selected || false}
              />
              <span className='option-title'>{m.title}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      tabIndex={props.CTabIndex ? props.CTabIndex : 1}
      className='month-picker-dropdown'
      onFocus={toggleOptionList}
      onBlur={() => setTimeout(toggleOptionList, 200)}
    >
      <div
        className='select-months'
        onClick={() => {
          isVisible === constants.VISIBILITY_HIDDEN_CLASS
            ? setPickerVisibility(constants.VISIBILITY_SHOWN_CLASS)
            : setPickerVisibility(constants.VISIBILITY_HIDDEN_CLASS)
        }}
      >
        {getSelectedMonthAndYearsLabel(
          selectedMonthsAndYearsID,
          props,
          monthsAndYearsWithSelection
        )}
      </div>
      {renderSelectPicker(monthsAndYearsWithSelection)}
    </div>
  )
}
