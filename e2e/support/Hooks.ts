import { Before, After, setDefaultTimeout } from "cucumber";
import { home } from "../pages";
import { actions } from ".";

setDefaultTimeout(36 * 10000);

Before(function() {
  return home.navigateTo();
});

After(function() {
  return actions.takeScreenshot(this);
});
