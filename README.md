# @gitmoneyman/kz-frontend-ui-kit

`@gitmoneyman/kz-frontend-ui-kit` is a lib of React UI components that used for various FinTech applcations.

## Installation

### npm

`@gitmoneyman/kz-frontend-ui-kit` is stored in GitHub Packages that allows to install library with npm. Run the following command to add lib to your project:

```javascript
npm install @gitmoneyman/kz-frontend-ui-kit
```

> **_NOTE:_**
This package is private. Therefore, you need access to install it. You will get an error if you run the above command without necessary permissions. Ask your team lead about access rights for the npm installation.

### Assets

By default, UI components don't have any styles. You need to import a css file to add it. Add this import statement in your entry point or App component:

```javascript
import '@gitmoneyman/kz-frontend-ui-kit/dist/esm/index.css';
```

### Peer dependencies

[react](https://www.npmjs.com/package/react) ^17.0.2 and [react-dom](https://www.npmjs.com/package/react-dom) ^17.0.2 are peer dependencies.

## Deploying a new version

> **_NOTE:_**
Do not deploy the new version by yourself. It's better to ask your tech leader to do it.

Do the following steps to deploy the new version of this library:

1. Checkout to the `develop` branch.
2. Update `version` parameter in the `package.json` file, and run `npm install` It should be different from the previous [versions](https://github.com/users/gitmoneyman/packages/npm/package/kz-frontend-ui-kit).
3. Commit (`chore: upgrade version to [__VERSION__]`) your changes and push to [GitHub](https://github.com/gitmoneyman/kz-frontend-ui-kit). **Example: `chore: upgrade version to 1.6.3`**
4. Checkout to the `main` branch.  Merge develop branch into main.
   Doing this through the GitHub interface using the "Merge Pull Request" button is better.
   Naming commit  ( `Merge pull request #PR (v[__VERSION__])` ). Push changes to GitHub. **Example: `Merge pull request #162 (v1.6.3)`**
5. Go to [Jenkins](https://jenkins.moneyman.kz/view/Solva%20KZ/job/SLKZ-frontend-ui-kit-publish/) and click `Build Now` button. Click it **only once** and wait.
6. Create a git tag with the updated version (do it in the `main` branch). Run `git tag v[__VERSION__]` Replace `__VERSION__` with updated `version` parameter from package.json. **Example: `git tag v1.6.3`**
7. Push this tag to GitHub by running `git push origin v[__VERSION__]`. **Example: `git push origin v1.6.3`**

## Deploy Storybook

To deploy storybook run the following commands:
1. `npm run predeploy`
2. `npm run deploy-storybook`

## Local installation

To install the lib locally you should do the following steps.

1. Clone this repository by running:
```
git clone git@github.com:gitmoneyman/kz-frontend-ui-kit.git
```
> **_NOTE:_**
Do not clone this repository in the root directory of the project where you want to install the lib.

2. Open the cloned repository in the terminal and run `npm run build` and `npm link`.
3. Open the project where you want to install this lib and run:
```
npm link @gitmoneyman/kz-frontend-ui-kit
```

Sometimes you can get this error. This problem occurs only with the local installation.
```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```

To fix it open a lib project directory (that was cloned from `git@github.com:gitmoneyman/kz-frontend-ui-kit.git`) in the terminal and run:

```
npm link [YOUR_GLOBAL_PATH_TO_PROJECT]/node_modules/react
```

Change `[YOUR_GLOBAL_PATH_TO_PROJECT]` with the absolute path to your project where you installed the lib.

## Usage

### Quick Start

This code snippet demonstrates a simple app that uses `@gitmoneyman/kz-frontend-ui-kit` UI ButtonComponent component.

```javascript
import React from 'react'
import { Button, InfoIcon } from '@gitmoneyman/kz-frontend-ui-kit'

export const App = () => {
  const onClick = () => {
    console.log('Click Me!')
  }

  return (
    <main>
      <Button
        onClick={onClick}
        color="primary"
      >
        <span>
          Click Me!
        </span>
        <InfoIcon />
      </Button>
    </main>
  )
}
```

## Available scripts

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles all UI React components in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs ESLit and stylelint for the whole application (everything that is placed in the `src` folder).

### `npm run prepare`

Runs `husky` script and installs it's default configuration. You don't need to run this command because `husky` has been already configured.

### `npm run storybook`

Runs storybook in the dev mode. Open [http://localhost:6006/](http://localhost:6006/) to see the visual representation of all UI-components.

### `npm run build-storybook`

Runs storybook in the production mode and creates `storybook-static/` folder at the root of the project.

## Style guide

### Namings

- All files and folders should be named in _camelCase_. Example: _assets_, _components_, _className.ts_, _useTimeout.ts_, _interface.ts_, _const.ts_.
- If the folder or file used for the component then it should be named in _CamelCase_. Example: _Button_, _Button.tsx_, _PasswordInput_, _PasswordInput.tsx_.
- Constants should be named in uppercase with the "_" sign between words. Example: _DEFAULT_ALIGN_OFFSET_, _UPLOAD_FILE_EXTENSIONS_, _DEFAULT_ICON_SIZE_.

### Folders structure

- All UI components should be placed in the `components` folder.
- All helpers, assets, custom hooks, etc. should be placed in the `core` folder and grouped by folders (e.g. folders: `assets`, `hooks`, `helpers`, etc.).
- Subcomponent used only by one component should be nested inside that component with maximum 2 levels.
- There are recommended files that should be created inside the component folder:
  * `index.ts` (required) - stores all public exports from the component.
  * `const.ts` (optional) - stores constants related to the component.
  * `interface.ts` (optional) - stores interfaces related to the component.

Example:
- components / Button, Label, Link, Modal
- core / hooks / useTimeout.ts
- Tooltip / index.ts, const.ts, interface.ts, Tooltip.ts

### Commits

- The package is powered by [Commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint). Please see all configuration details and possible rules [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#commitlintconfig-conventional).
- The package uses [husky](https://github.com/typicode/husky) hooks to add checks for commit message, eslint and stylelint errors.

## Customize theme

### Override css variables

All global variables are listed in the [variables.scss](./src/core/styles/variables.scss) file.

For overriding it you need to create your own css file and specify new values for the specific variables. Place the import of this file in your entry point or App component. It should be placed after the main index.css import to override everything correctly:

```javascript
import '@gitmoneyman/kz-frontend-ui-kit/dist/esm/index.css';
import './override.css'; // <-- Your file with ovverided css variables
```

Example (`override.css`):

```css
:root {
    --mainColor: #2663D1;
    --blueMiddle: skyblue;
    --white: #f8f7f4;
}
```

## Topics for devs of this package

### Adding global css or scss file to the package?

All global css or scss files (also from `node_modules`) should be placed in the [global.scss](./src/core/styles/global.scss) file. If you have a .module.css/scss file for the UI component then it should be placed directly to the component file.

Example:

- global files in `global.scss`:

```scss
@use 'sass:color';
@import './variables';
@import 'react-datepicker/dist/react-datepicker.css';
@import 'keen-slider/keen-slider.min.css';
```

- .module.css/scss file for the UI component (`Button.tsx`):

```javascript
import React from 'react';
import styles from './Button.module.scss';

// UI component code
```

### Importing svg icons

This package uses [@svgr/rollup](https://www.npmjs.com/package/@svgr/rollup) to transform svg into React components. See this example of importing svg file as React Component:

```javascript
import React from 'react';
import { ReactComponent as EyeIconComponent } from '../../core/assets/img/eye.svg';

export const Component = () => (
    <main>
        <EyeIconComponent />
    </main>
);
```

## Specifics of the components and helpers

### DatePicker

A DatePicker component uses [date-fns](https://www.npmjs.com/package/date-fns) and [react-datepicker](https://www.npmjs.com/package/react-datepicker) libs to register and apply specific locale to the date format of the picker.

For the correct work of this component you should import `registerDatePickerLocales` function and call it in your entry point or App component (outside the component's body). See example (`App.tsx`):

```javascript
// imports
import ruLocale from 'date-fns/locale/ru';
import kkLocale from 'date-fns/locale/kk';
import { registerDatePickerLocales } from '@gitmoneyman/kz-frontend-ui-kit'

registerDatePickerLocales([ruLocale, kkLocale]);

export const App = () => {
  return (
      <main></main>
  )
}
```

### classNames

`classNames` is an util function that allows to conveniently generate html class names.

There is only 1 parameter that can be either object or array. Example if the 1st parameter is:

- an object:

```javascript
classNames({
    ['className_1']: true,
    ['className_2']: false,
    ['className_3']: true,
}); // output: 'className_1 className_3'
```

- an array:

```javascript
classNames([
    'className_1',
    'className_2',
    'className_3',
]); // output: 'className_1 className_2 className_3'
```

### SearchSelect

If you want to disable page zoom on tablets and mobiles when focus input (default browser behavior) you should add this meta tag in the head of your entry point .html file.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"/>
```

## Storybook

// TODO: Need to add storybook configuration

## Tests

// TODO: Need to add tests
