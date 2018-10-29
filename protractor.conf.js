// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  allScriptsTimeout: 110000,
  ignoreUncaughtExceptions: true, // workaround from stopping tests on timeout, see https://github.com/angular/protractor/pull/3608

  // Use a custom framework adapter and set its relative path
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ['./e2e/features/**/*.feature'],

  // cucumber command line options
  cucumberOpts: {
    // require step definition files before executing features
    require: ['./e2e/steps/**/*.ts', './e2e/support/**/*.ts'],
    // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    // <boolean> fail if there are any undefined or pending steps
    strict: true,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: [
      'json:results/summary.json',
      'node_modules/cucumber-pretty'
    ],
    // <boolean> invoke formatters without executing steps
    dryRun: true,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    //compiler: ["ts:ts-node/register"]
  },

  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options:{
      displayDuration: true,
      durationInMS: true,
      jsonDir: './results/',
      reportPath: './results',
      automaticallyGenerateReport: true
    }
  }],

  onPrepare() {
    browser.manage().window().setSize(1680, 2000);
    browser.manage().timeouts().implicitlyWait(5000);
    browser.ignoreSynchronization = true;
    // Enable TypeScript for the tests
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },

  onComplete() {
    browser.quit();
  }
};