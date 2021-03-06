import React, { useState, useEffect } from 'react'
import { constants } from './constants'
import { PropsIntf, YearsWithMonthIntf } from './app.model'
import {
  validateAndSetValidInputValues,
  getTotalMonthsAndYears,
  getWeightedSelectedClass,
  getSelectedMonthAndYearsLabel,
  getFinalLabelToDisplay,
  shouldDisplayTheCheckbox
} from './app.services'

import './styles.scss'

export const MonthPickerDropdown = (props: PropsIntf) => {
  const { monthsAndYears, errorMessage } = validateAndSetValidInputValues(props)
  if (errorMessage) {
    return (
      <div className='month-picker-dropdown'>
        <span className='error'>{errorMessage}</span>
      </div>
    )
  }

  const months = getTotalMonthsAndYears({ ...props, ...monthsAndYears })

  const [monthsAndYearsWithSelection, updateMonthAndYearSection] = useState(months)
  const [selectedMonthsAndYearsID, setSelectedMonthsAndYearsID] = useState({
    firstSelectedMonthID: null,
    lastSelectedMonthID: null
  })
  const [isVisible, setPickerVisibility] = useState(
    constants.VISIBILITY_HIDDEN_CLASS
  )

  useEffect(() => {
    if (selectedMonthsAndYearsID.firstSelectedMonthID === null || selectedMonthsAndYearsID.lastSelectedMonthID === null) {
      return
    }
    if (!props.displayOkAndCancelButton) {
      sendSelectedMonthAndYearToProps()
    }
  }, [selectedMonthsAndYearsID])

  const hideOptionList = () => {
    setPickerVisibility(constants.VISIBILITY_HIDDEN_CLASS)
  }

  const handleClick = (selectedMonthAndYear: YearsWithMonthIntf) => {
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
      updateMonthAndYearSection(updatedMonth)
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
        updateMonthAndYearSection(months)
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
      updateMonthAndYearSection(updatedMonth)
      setSelectedMonthsAndYearsID({
        firstSelectedMonthID: selectedMonthsAndYearsID.firstSelectedMonthID,
        lastSelectedMonthID: selectedMonthAndYear.id
      })
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
    updateMonthAndYearSection(updatedMonth)
  }

  const handleOnMouseLeave = () => {
    const updatedMonth = monthsAndYearsWithSelection.map(
      (m: YearsWithMonthIntf) => {
        m.hovered = false
        return m
      }
    )
    updateMonthAndYearSection(updatedMonth)
  }

  const sendSelectedMonthAndYearToProps = () => {
    const finalSelectedValue = getFinalLabelToDisplay(
      monthsAndYearsWithSelection,
      selectedMonthsAndYearsID.firstSelectedMonthID,
      selectedMonthsAndYearsID.lastSelectedMonthID
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

  const getOkayAndCancelButton = (props: PropsIntf) => {
    return (
      <div className='okay-and-cancel'>
        {props.markUpForOkButton ? (
          <div
            className='okay-and-cancel-container'
            onMouseDown={sendSelectedMonthAndYearToProps}
          >
            {props.markUpForOkButton()}
          </div>
        ) : (
          <button
            tabIndex={props.CTabIndex ? props.CTabIndex : 0}
            className='okay-and-cancel-container-button'
            onMouseDown={sendSelectedMonthAndYearToProps}
          >
            Select
          </button>
        )}
        {props.markUpForCancelButton ? (
          <div
            className='okay-and-cancel-container'
            onMouseDown={hideOptionList}
          >
            {props.markUpForCancelButton()}
          </div>
        ) : (
          <button
            tabIndex={props.CTabIndex ? props.CTabIndex : 0}
            className='okay-and-cancel-container-button'
            onMouseDown={hideOptionList}
          >
            Cancel
          </button>
        )}
      </div>
    );
  }

  const renderSelectPicker = (props: PropsIntf, months: YearsWithMonthIntf[]) => {
    return (
      <div className={`select-picker ${isVisible}`}>
        <div
          className='select-picker-options'
          onMouseLeave={handleOnMouseLeave}
        >
          {months.map((m: YearsWithMonthIntf) => (
            <div
              onClick={() => {
                handleClick(m)
              }}
              onMouseEnter={() => {
                handleOnMouseEnter(m)
              }}
              className={`options ${getWeightedSelectedClass(m)}`}
              key={m.id}
            >
              <input
                readOnly
                className={`option-checkbox ${shouldDisplayTheCheckbox(props.hideCheckBox)}`}
                type='checkbox'
                tabIndex={-1}
                checked={m.selected || false}
              />
              <span className='option-title'>{m.title}</span>
            </div>
          ))}
        </div>
        {props.displayOkAndCancelButton && getOkayAndCancelButton(props)}
      </div>
    )
  }

  return (
    <div
      tabIndex={props.CTabIndex ? props.CTabIndex : 0}
      className='month-picker-dropdown'
      onFocus={hideOptionList}
      onBlur={() => setTimeout(hideOptionList, 200)}
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
      {renderSelectPicker(props, monthsAndYearsWithSelection)}
    </div>
  )
}
