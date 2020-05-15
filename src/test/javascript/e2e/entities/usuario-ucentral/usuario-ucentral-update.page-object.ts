import { element, by, ElementFinder } from 'protractor';

export default class UsuarioUcentralUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.usuarioUcentral.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  emailUcentralInput: ElementFinder = element(by.css('input#usuario-ucentral-emailUcentral'));
  userSelect: ElementFinder = element(by.css('select#usuario-ucentral-user'));
  personaSelect: ElementFinder = element(by.css('select#usuario-ucentral-persona'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmailUcentralInput(emailUcentral) {
    await this.emailUcentralInput.sendKeys(emailUcentral);
  }

  async getEmailUcentralInput() {
    return this.emailUcentralInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async personaSelectLastOption() {
    await this.personaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personaSelectOption(option) {
    await this.personaSelect.sendKeys(option);
  }

  getPersonaSelect() {
    return this.personaSelect;
  }

  async getPersonaSelectedOption() {
    return this.personaSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
