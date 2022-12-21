import {
  correct_error_message,
  modal_window,
  successful_authorization,
  text_box_form,
  unsuccessful_authorization,
} from "../selectors/basePageSelectors";

Cypress.Commands.add("correctErrorMessageWhenEnteringInvalidData", (text: string) => {
  cy.get(unsuccessful_authorization.flash_message).contains(text);
});

Cypress.Commands.add("flashMessageHaveText", (text: string) => {
  cy.get(successful_authorization.flash_message).contains(text);
});

Cypress.Commands.add("subheaderHaveText", (text: string) => {
  cy.get(successful_authorization.subheader).contains(text);
});

Cypress.Commands.add("modalWindowText", (text: string) => {
  cy.get(modal_window.window_modal_body).contains(text);
});

Cypress.Commands.add("cardName", (text: string) => {
  cy.get(text_box_form.user_card_name).should("have.text", text);
});

Cypress.Commands.add("cardEmail", (text: string) => {
  cy.get(text_box_form.user_card_email).should("have.text", text);
});

Cypress.Commands.add("cardCurrentAddress", (text: string) => {
  cy.get(text_box_form.user_current_address).should("have.text", text);
});

Cypress.Commands.add("cardPermanentAddress", (text: string) => {
  cy.get(text_box_form.user_permanent_address).should("have.text", text);
});

Cypress.Commands.add("errorMessageWhenCheckboxIsDisabled", (text: string) => {
  cy.get(correct_error_message.error_message).should("have.text", text);
});

Cypress.Commands.add("testPassedSuccessfully", (text: string) => {
  cy.log("Test passed successfully!");
});
