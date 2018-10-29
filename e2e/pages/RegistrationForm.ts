import { $, $$ } from "protractor";
import { actions } from "../support";

class RegistrationFrom {
  private formHeaders = $$('#account-creation_form h3');

  public getFormHeadersText() {
    return this.formHeaders.map(header => actions.getText(header));
  }
}

const registrationForm = new RegistrationFrom();
export = registrationForm;