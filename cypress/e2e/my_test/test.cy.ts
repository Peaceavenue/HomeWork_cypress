import { URLs } from "../../fixtures/url";
import { usersData } from "../../fixtures/user's_personal_data";

import {
  checkboxes,
  correct_error_message,
  modal_window,
  status_code,
  successful_authorization,
  text_box_form,
  unsuccessful_authorization,
} from "../../selectors/basePageSelectors";
import { flash_messages } from "../../fixtures/flash_message";

describe("correct error message when entering invalid data", () => {
  it("unsuccessful authorization and message output", () => {
    cy.visit(URLs.base_page_login);
    cy.get(unsuccessful_authorization.input_username).type(usersData.base_first_name);
    cy.get(unsuccessful_authorization.input_password).type(usersData.base_last_name);
    cy.get(unsuccessful_authorization.button).parent().click();
    cy.correctErrorMessageWhenEnteringInvalidData(flash_messages.error_message);
  });

  it("successful authorization and message output", () => {
    cy.visit(URLs.base_page_login);
    cy.get(unsuccessful_authorization.input_username).type(usersData.base_correct_login);
    cy.get(unsuccessful_authorization.input_password).type(usersData.base_correct_password);
    cy.get(successful_authorization.form_button).click();
    cy.flashMessageHaveText(flash_messages.success_message);
    cy.get(successful_authorization.flash_message).then((el) => cy.log(el.text()));
    cy.subheaderHaveText(flash_messages.success_message_page);
    cy.get(successful_authorization.form_back_button).click();
  });

  it("when clicked, the checkbox becomes selected", () => {
    cy.visit(URLs.base_page_checkbox);
    cy.get(checkboxes.checkbox).eq(1).should("be.checked");
    cy.get(checkboxes.checkbox).eq(0).check();
    cy.get(checkboxes.checkbox).eq(0).should("be.checked");
  });

  it("displaying a modal window", () => {
    cy.visit(URLs.base_page_modal);
    cy.get(modal_window.link).click();
    cy.get(modal_window.window_modal).should("be.visible");
    cy.modalWindowText(flash_messages.modalText);
    cy.get(modal_window.window_button).click();
    cy.get(modal_window.window_modal).should("be.not.visible");
  });

  it("code status page", () => {
    cy.visit(URLs.base_page_add_remove);
    cy.xpath(status_code.home_page_button).click();
    cy.get(status_code.page_200).should("be.visible").click();
    cy.get(status_code.page_200).should("not.exist");
  });

  it("\n" + "when filling in the data in the form, a card with user data is displayed", () => {
    cy.visit(URLs.base_page_text_box);
    cy.get(text_box_form.name).type(usersData.base_full_name);
    cy.get(text_box_form.email).type(usersData.base_email);
    cy.get(text_box_form.current_address).type(usersData.base_current_address);
    cy.get(text_box_form.permanent_address).type(usersData.base_permanent_address);
    cy.get(text_box_form.button_submit).click();
    cy.cardName("Name:" + usersData.base_full_name);
    cy.cardEmail("Email:" + usersData.base_email);
    cy.cardCurrentAddress(flash_messages.currentAddress);
    cy.cardPermanentAddress(flash_messages.permanentAddress);
  });

  it("if the checkbox is inactive, the correct error message is displayed, registration is not successful", () => {
    cy.visit(URLs.base_page_register);
    cy.get(correct_error_message.first_name).type(usersData.base_first_name);
    cy.get(correct_error_message.last_name).type(usersData.base_last_name);
    cy.get(text_box_form.name).type(usersData.base_user_name);
    cy.get(unsuccessful_authorization.input_password).type(usersData.base_user_password);
    cy.get(correct_error_message.button_register).click();
    cy.errorMessageWhenCheckboxIsDisabled(flash_messages.reCaptcha);
    cy.screenshot();
  });
});
