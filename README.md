# react-month-picker-dropdown
Month picker as dropdown menu for React Projects

## Why react-month-picker-dropdown?

The main goal of this package is to deliver a slim and Skinny Month picker as dropdown menu for React Projects, that can fit into any kind of projects with no muss, no fuss. This menu is completely customizable, in fact, you write your own theme as you like.

## Demo

Check the Month picker in action, [click here](https://stackblitz.com/edit/react-n3swqy).

## Install
You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

#### NPM
```bash
npm install --save react-month-picker-dropdown
```
#### YARN
```          
yarn add --save react-month-picker-dropdown
```

## Usage

```tsx
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
        displayOkAndCancelButton={true}
        markUpForOkButton={getMarkUpForOkButton}
        markUpForCancelButton={getMarkUpForCancelButton}
        onChange={handleAMonthChange}
      />
    </div>
  );
}

export default App

```
## Props

| Prop  | Type  | Default | Description |
|:--------- | :---- | :----   |:----  |
| `CTabIndex` | `number` | `1` | To give the tab index
| `label` | `string` | `Select Months` | This will is display the Month Picker label as **Select Months**.
| `startYear` | `number` | `Current Year` | Here you can specify the Start year, from where Month dropdown will start.
| `startMonth` | `number` | `January` | Here you can specify the Start Month.
| `endYear` | `number` | `Current Year` | Here you can specify the End year, from where Month dropdown will end.
| `endMonth` | `number` | `December` | Here you can specify the End Month.
| `displayShortMonthName` | `boolean` | `false` | This option will allow you to set how Months should be display on screen for example, **Jan** or **January**.
| `displayShortYearName` | `boolean` | `false` | This option will allow you to set how Years should be display on screen for example, **20** or **2020**.
| `hideCheckBox` | `boolean` | `false` | With the help of this option you hide the checkboxes shown in the list.
| `displayOkAndCancelButton` | `boolean` | `false` | With this You can show the Submit and Cancel button in the end of the list of months.
| `markUpForOkButton`, `markUpForCancelButton` | `function` | `func` | These two props will expect the function which should return the JSX. This is useful if you want to display custom Submit or Cancel button.
| `onChange` | `function` | `func` | Callback function will invoked on select event. Params are `startYear`, `startMonth`, `endYear` & `endMonth`.

----


## Creating your own theme
```css
.month-picker-dropdown .select-months {
    border: solid 0.5px #022424;
    background-color: #00a699;
    color: #fff;
}

.month-picker-dropdown .select-picker {
    border-bottom: solid 0.5px #022424;
    border-left: solid 0.5px #022424;
    border-right: solid 0.5px #022424;
}

.month-picker-dropdown .select-picker .select-picker-options .options .option-title {
    text-align: center;
}

.month-picker-dropdown .select-picker .select-picker-options .selected-month-background-color {
    background: #00a699;
    color: #fff;
}

.month-picker-dropdown .select-picker .select-picker-options .hovered-month-background-color {
    background-color: #66e2da;
    color: #fff;
}
```

## Thanks

This Project is build using [create-react-library](https://www.npmjs.com/package/create-react-library).

## License

MIT © [ShankyTiwari](https://github.com/ShankyTiwari)
