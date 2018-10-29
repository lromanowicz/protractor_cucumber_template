import { When } from 'cucumber';
import { auth } from '../pages';
import { getUniqueEmail } from '../support/Generators';
import { actions } from '../support';

When(/^user fills in the registration form with a valid email$/, function () {
  return auth.createAnAccount(getUniqueEmail())
    .then(() => actions.takeScreenshot(this));
});

