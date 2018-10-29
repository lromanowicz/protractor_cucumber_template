import {
  ElementFinder,
  ProtractorExpectedConditions,
  protractor,
  browser,
  element,
  by
} from "protractor";
import * as moment from "moment";
import * as clc from "cli-color";
import { World } from "cucumber";

class Actions {
  private EC: ProtractorExpectedConditions = protractor.ExpectedConditions;

  public navigateTo(url: string = "") {
    return actions
      .log("Navigating to url", browser.baseUrl + url)
      .then(() => browser.get(browser.baseUrl + url));
  }

  public click(element: ElementFinder) {
    return this.log("Click on element", this.elementToString(element)).then(() =>
      this.waitForElementToBePresent(element)
        .then(() => this.highlightElement(element))
        .then(() => element.click())
    );
  }

  public pressButton(buttonText: string) {
    return this.click(element(by.xpath(`//button[text()="${buttonText}"]`)));
  }

  public sendKeys(element: ElementFinder, text: string) {
    return this.click(element)
      .then(() => element.clear())
      .then(() => this.log("Send keys into element", this.elementToString(element)))
      .then(() => element.sendKeys(text));
  }

  public getText(element: ElementFinder) {
    return this.waitForElementToBePresent(element)
      .then(() => this.log('Get text from element', this.elementToString(element)))
      .then(() => this.highlightElement(element))
      .then(() => element.getText());
  }

  public log(...message: any[]) {
    let deferred = protractor.promise.defer();
    deferred.fulfill({});
    console.error.apply(
      console,
      [moment().format("DD.MM.YYYY h:mm:ss A"), clc.cyan("DEBUG|")].concat(
        Array.prototype.slice.call(message)
      )
    );
    return deferred.promise;
  }

  public elementToString(element: ElementFinder): string {
    let output = '',
    locator = element ? element.locator() : {
      using: 'ERROR',
      value: 'Undefined element'
    };
    output += locator.using + ':\'' + locator.value + '\'';
    return output;
  }

  public takeScreenshot(world: World) {
    return browser
      .takeScreenshot()
      .then(buffer => world.attach(buffer, "image/png"));
  }

  public highlightElement(element: ElementFinder) {
    let safeExecuteScript = el => {
      return browser.executeScript(
        "arguments[0].style.border='3px solid #FFA500'",
        el
      );
    };

    return browser.wait(
      safeExecuteScript(element),
      1000,
      "highlightElement fails"
    );
  }

  public waitForElementToBePresent(element: ElementFinder) {
    return actions
      .log("Wait for presence of element", this.elementToString(element))
      .then(() =>
        browser.wait(
          this.EC.presenceOf(element),
          10000,
          `Element ${this.elementToString(element)} is not present...`
        )
      );
  }
}

const actions = new Actions();
export = actions;
