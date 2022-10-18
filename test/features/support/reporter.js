const { CucumberJSAllureFormatter } = require("allure-cucumberjs8");
const { AllureRuntime } = require("allure-cucumberjs8");

class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(
      options,
      new AllureRuntime({ resultsDir: "./allure-results" }),
      {}
    );
  }
}

module.exports = Reporter;