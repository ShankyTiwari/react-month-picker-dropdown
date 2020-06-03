export interface PropsIntf {
  CTabIndex?: number;
  label?: string;
  separatorText?: string;
  startYear?: number;
  startMonth?: number;
  endYear?: number;
  endMonth?: number;
  displayShortMonthName?: boolean;
  displayShortYearName?: boolean;
  hideCheckBox?: boolean;
  displayOkAndCancelButton: boolean;
  onChange: Function;
}

export interface StartAndEndOfMonthAndYearIntf {
  startYear?: number;
  startMonth?: number;
  endYear?: number;
  endMonth?: number;
}

export interface YearsWithMonthIntf {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  month: number;
  year: number;
  selected?: boolean;
  hovered?: boolean;
}

export interface SelectedMonthsAndYearsIDIntf {
  firstSelectedMonthID: number;
  lastSelectedMonthID: number;
}
