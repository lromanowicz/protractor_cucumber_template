import { actions } from "../support";
import { ElementFinder, $ } from "protractor";

class Home {
  private signInButton: ElementFinder = $(
    '[title="Log in to your customer account"]'
  );

  public navigateTo() {
    return actions.navigateTo();
  }

  public openAuthorizationPage() {
    return actions.click(this.signInButton);
  }
}

const home = new Home();
export = home;
