
import { constants } from './constants'
import {
  PropsIntf,
  StartAndEndOfMonthAndYearIntf,
  YearsWithMonthIntf,
  SelectedMonthsAndYearsIDIntf
} from './app.model'

const getFirstDateOfTheMonth = (year: number, month: number) => {
  return new Date(year, month, 1)
}

const getLastDateOfTheMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0)
}

const getYearDifference = (
  startDateString: string,
  endDateString: string
): number[] => {
  const years: number[] = []
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)

  for (let y = startDate.getFullYear(); y <= endDate.getFullYear(); y++) {
    years.push(y)
  }
  return years
}

export const getFinalLabelToDisplay = (
  monthsAndYearsWithSelection: YearsWithMonthIntf[],
  selectedStartId: number,
  selectedEndId: number
): StartAndEndOfMonthAndYearIntf => {
  let startYear = null
  let startMonth = null
  let endYear = null
  let endMonth = null

  const selectedStartDate = getMonthDataById(
    monthsAndYearsWithSelection,
    selectedStartId
  )

  const selectedEndDate = getMonthDataById(
    monthsAndYearsWithSelection,
    selectedEndId
  )

  if (selectedStartDate.length > 0 && selectedEndDate.length > 0) {
    if (selectedStartDate[0].id > selectedEndDate[0].id) {
      startYear = selectedEndDate[0].year
      startMonth = selectedEndDate[0].month
      endYear = selectedStartDate[0].year
      endMonth = selectedStartDate[0].month
    } else {
      startYear = selectedStartDate[0].year
      startMonth = selectedStartDate[0].month
      endYear = selectedEndDate[0].year
      endMonth = selectedEndDate[0].month
    }
  }
  return {
    startYear,
    startMonth,
    endYear,
    endMonth
  }
}

export const getMonthDataById = (
  monthsAndYearsWithSelection: YearsWithMonthIntf[],
  selectedId: number
) => {
  return monthsAndYearsWithSelection.filter((m) => m.id === selectedId)
}

export const getTotalMonthsAndYears = (props: PropsIntf): YearsWithMonthIntf[] => {
  const {
    startYear,
    startMonth,
    endYear,
    endMonth,
    displayShortMonthName,
    displayShortYearName
  } = props
  const yearsWithMonth = []
  const startDateString = `1 ${constants.MONTHS_WITH_FULL_NAMES[startMonth]} ${startYear}`
  const endDateString = `1 ${constants.MONTHS_WITH_FULL_NAMES[endMonth]} ${endYear}`
  const yearsDifference = getYearDifference(startDateString, endDateString)

  let counter = 0

  for (let y = 0; y < yearsDifference.length; y++) {
    const monthInFullYear = yearsDifference[y]
    let monthStartIndex = null
    let monthEndIndex = null

    if (yearsDifference.length === 1) {
      monthStartIndex = startMonth
      monthEndIndex = endMonth + 1
    } else if (y === 0) {
      monthStartIndex = startMonth
      monthEndIndex = 12
    } else if (y === yearsDifference.length - 1) {
      monthStartIndex = 0
      monthEndIndex = endMonth + 1
    } else {
      monthStartIndex = 0
      monthEndIndex = 12
    }
    for (let m = monthStartIndex; m < monthEndIndex; m++) {
      const firstDateOfTheMonth = getFirstDateOfTheMonth(monthInFullYear, m)
      const lastDateOfTheMonth = getLastDateOfTheMonth(monthInFullYear, m)
      yearsWithMonth.push({
        id: counter,
        title: `${
          displayShortMonthName
            ? constants.MONTHS_WITH_SHORT_NAMES[m]
            : constants.MONTHS_WITH_FULL_NAMES[m]
        } ${
          displayShortYearName
            ? monthInFullYear.toString().substr(-2)
            : monthInFullYear
        }`,
        startDate: firstDateOfTheMonth,
        endDate: lastDateOfTheMonth,
        month: m + 1,
        year: monthInFullYear,
        selected: false
      })
      counter = counter + 1
    }
  }
  return yearsWithMonth
}

export const validateAndSetValidInputValues = (
  props: PropsIntf
): {
  monthsAndYears?: StartAndEndOfMonthAndYearIntf
  errorMessage: string
} => {
  const { startYear, startMonth, endYear, endMonth } = props

  // Validation of Input Props Start
  if (
    startYear !== null &&
    startYear !== undefined &&
    endYear !== null &&
    endYear !== undefined &&
    startYear > endYear
  ) {
    return {
      errorMessage: constants.INVALID_START_END_YEAR_COMBINATION
    }
  }

  if (
    startYear !== null &&
    startYear !== undefined &&
    endYear !== null &&
    endYear !== undefined &&
    startMonth !== null &&
    startMonth !== undefined &&
    endMonth !== null &&
    endMonth !== undefined &&
    startYear === endYear &&
    startMonth > endMonth
  ) {
    return {
      errorMessage: constants.INVALID_START_END_MONTH_COMBINATION
    }
  }

  // Normalization of the Input props starts
  const currentYear = new Date().getFullYear()
  const finalMonthAndYear = {
    startYear: currentYear,
    startMonth: 0, // Since the first month of year is january
    endYear: currentYear,
    endMonth: 11 // Since the last month of year is December
  }

  if (startYear !== null && startYear !== undefined) {
    finalMonthAndYear.startYear = startYear
  }

  if (startMonth !== null && startMonth !== undefined) {
    finalMonthAndYear.startMonth = startMonth > 1 ? startMonth - 1 : 0
  }

  if (endYear !== null && endYear !== undefined) {
    finalMonthAndYear.endYear = endYear
  }

  if (endMonth !== null && endMonth !== undefined) {
    finalMonthAndYear.endMonth = endMonth > 1 ? endMonth - 1 : 0
  }

  return {
    monthsAndYears: finalMonthAndYear,
    errorMessage: ''
  }
}

export const getSelectedMonthAndYearsLabel = (
  selectedMonthAndYear: SelectedMonthsAndYearsIDIntf,
  props: PropsIntf,
  monthsAndYearsWithSelection: YearsWithMonthIntf[]
): string => {
  const {
    firstSelectedMonthID,
    lastSelectedMonthID
  } = selectedMonthAndYear
  if (
    firstSelectedMonthID === null &&
    lastSelectedMonthID === null
  ) {
    return props.label ? props.label : constants.MONTH_DROPDOWN_PICKER_LABEL
  }
  let selectedMonthAndYearString = ''
  const separatorText = props.separatorText
    ? props.separatorText
    : constants.MONTH_RANGE_SEPARATOR_TEXT

  const selectedStartDate = getMonthDataById(
    monthsAndYearsWithSelection,
    firstSelectedMonthID
  )

  const selectedEndDate = getMonthDataById(
    monthsAndYearsWithSelection,
    lastSelectedMonthID
  )

  if (selectedStartDate.length > 0 && selectedEndDate.length === 0) {
    selectedMonthAndYearString = `${selectedStartDate[0].title} ${separatorText} ____`
  }
  if (selectedStartDate.length > 0 && selectedEndDate.length > 0) {
    if (selectedStartDate[0].id > selectedEndDate[0].id) {
      selectedMonthAndYearString = `${selectedEndDate[0].title} ${separatorText} ${selectedStartDate[0].title}`
    } else {
      selectedMonthAndYearString = `${selectedStartDate[0].title} ${separatorText} ${selectedEndDate[0].title}`
    }
  }
  return selectedMonthAndYearString
}

export const shouldDisplayTheCheckbox = (shouldDisplayTheCheckbox: boolean): string => {
  if (typeof shouldDisplayTheCheckbox === 'boolean' && shouldDisplayTheCheckbox) {
    return constants.HIDE_HTML_ELEMENT
  }
  return ''
}

export const getWeightedSelectedClass = (
  currentYearWithMonth: YearsWithMonthIntf
): string => {
  if (currentYearWithMonth.selected) {
    return constants.SELECTED_MONTH_BACKGROUND_COLOR
  }
  if (currentYearWithMonth.hovered) {
    return constants.HOVERED_MONTH_BACKGROUND_COLOR
  }
  return ''
}
