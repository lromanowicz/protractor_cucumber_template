import { Then } from 'cucumber';
import { registrationForm } from '../pages';
import * as chai from 'chai';

const expect = chai.expect;

Then(/^user should be able to proceed to user data form$/, function () {
  const EXPECTED_TEXTS = [
    'YOUR PERSONAL INFORMATION',
    'YOUR ADDRESS'
  ];
  return registrationForm.getFormHeadersText()
    .then(headerTexts => expect(headerTexts).to.include.members(EXPECTED_TEXTS));
});