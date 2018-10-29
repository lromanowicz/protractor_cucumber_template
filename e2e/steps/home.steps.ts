import { Given } from 'cucumber';
import { home } from '../pages';
import { actions } from '../support';

Given(/^user opens the authorization page$/, function () {
  return home.openAuthorizationPage()
    .then(() => actions.takeScreenshot(this));
});