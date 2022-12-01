# Zelli

<p>
  <a href="https://app.travis-ci.com/github/departement-loire-atlantique/zelli">
    <img src="https://api.travis-ci.com/departement-loire-atlantique/zelli.svg?branch=master" />
  </a>
</p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Getting started

```bash
npm install # Make sure to do it first, it will also install husky git hooks

npm run dev # Launch the angular app in dev mode, using development-jcms config

# Usefull commands
npm run lint    # Run eslint accross all project files to find linter issues (try to fix them if possible)
npm run pretty  # Format all project files (it is normally done thanks to a pre-push hook)
```

Make sure you've got the backend up and running before loading the app in your browser.

Once you have run `npm run dev`, navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Tools used

- [Loire Atlantique design system](https://design.loire-atlantique.fr/) ([Lien vers le github](https://github.com/departement-loire-atlantique/design-system-web))

## PWA / Service worker

(https://angular.io/guide/service-worker-getting-started#service-worker-in-action-a-tour)  
Run `ng build`  
Run `http-server -p 8080 -c-1 dist/zelli`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
