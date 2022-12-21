import { add_remove, checkbox, login, modal, register, text_box } from "../../fixtures/url";
import {
  correct_login,
  correct_password,
  current_address,
  email,
  first_name,
  full_name,
  last_name,
  permanent_address,
  user_name,
  user_password,
} from "../../fixtures/user's_personal_data";
import {
  checkboxes,
  correct_error_message,
  modal_window,
  status_code,
  successful_authorization,
  text_box_form,
  unsuccessful_authorization,
} from "../../selectors/basePageSelectors";
import {
  currentAddressText,
  error_message_for_unsuccessful_authorization,
  messageReCaptcha,
  permanentAddressText,
  successful_authorization_message,
  successful_authorization_page,
  textInModalWindow,
} from "../../fixtures/flash_message";

describe("correct error message when entering invalid data", () => {
  it("unsuccessful authorization and message output", () => {
    cy.visit(login.base_page_login);
    cy.get(unsuccessful_authorization.input_username).type(first_name.base_first_name);
    cy.get(unsuccessful_authorization.input_password).type(last_name.base_last_name);
    cy.get(unsuccessful_authorization.button).parent().click();
    cy.correctErrorMessageWhenEnteringInvalidData(error_message_for_unsuccessful_authorization.error_message);
  });

  it("successful authorization and message output", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get(unsuccessful_authorization.input_username).type(correct_login.base_correct_login);
    cy.get(unsuccessful_authorization.input_password).type(correct_password.base_correct_password);
    cy.get(successful_authorization.form_button).click();
    cy.flashMessageHaveText(successful_authorization_message.success_message);
    cy.get(successful_authorization.flash_message).then((el) => cy.log(el.text()));
    cy.subheaderHaveText(successful_authorization_page.success_message);
    cy.get(successful_authorization.form_back_button).click();
  });

  it("when clicked, the checkbox becomes selected", () => {
    cy.visit(checkbox.base_page_checkbox);
    cy.get(checkboxes.checkbox).eq(1).should("be.checked");
    cy.get(checkboxes.checkbox).eq(0).check();
    cy.get(checkboxes.checkbox).eq(0).should("be.checked");
  });

  it("displaying a modal window", () => {
    cy.visit(modal.base_page_modal);
    cy.get(modal_window.link).click();
    cy.get(modal_window.window_modal).should("be.visible");
    cy.modalWindowText(textInModalWindow.modalText);
    cy.get(modal_window.window_button).click();
    cy.get(modal_window.window_modal).should("be.not.visible");
  });

  it("code status page", () => {
    cy.visit(add_remove.base_page_add_remove);
    cy.xpath(status_code.home_page_button).click();
    cy.get(status_code.page_200).should("be.visible").click();
    cy.get(status_code.page_200).should("not.exist");
  });

  it("\n" + "when filling in the data in the form, a card with user data is displayed", () => {
    cy.visit(text_box.base_page_text_box);
    cy.get(text_box_form.name).type(full_name.base_full_name);
    cy.get(text_box_form.email).type(email.base_email);
    cy.get(text_box_form.current_address).type(current_address.base_current_address);
    cy.get(text_box_form.permanent_address).type(permanent_address.base_permanent_address);
    cy.get(text_box_form.button).click();
    cy.cardName("Name:" + full_name.base_full_name);
    cy.cardEmail("Email:" + email.base_email);
    cy.cardCurrentAddress(currentAddressText.currentAddress);
    cy.cardPermanentAddress(permanentAddressText.permanentAddress);
  });

  it("if the checkbox is inactive, the correct error message is displayed, registration is not successful", () => {
    cy.visit(register.base_page_register);
    cy.get(correct_error_message.first_name).type(first_name.base_first_name);
    cy.get(correct_error_message.last_name).type(last_name.base_last_name);
    cy.get(text_box_form.name).type(user_name.base_user_name);
    cy.get(unsuccessful_authorization.input_password).type(user_password.base_user_password);
    cy.get(correct_error_message.button_register).click();
    cy.errorMessageWhenCheckboxIsDisabled(messageReCaptcha.reCaptcha);
    cy.screenshot();
  });
});
