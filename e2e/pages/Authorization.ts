import { $ } from "protractor";
import { actions } from "../support";

class Authorization {
  private createAccEmailInput = $("#email_create");
  private createAnAccButton = $("#SubmitCreate");

  public createAnAccount(email: string) {
    return actions
      .sendKeys(this.createAccEmailInput, email)
      .then(() => actions.click(this.createAnAccButton));
  }
}

const auth = new Authorization();
export = auth;
