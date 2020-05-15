import { element, by, ElementFinder } from 'protractor';

export default class ProfesorUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.profesor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaInput: ElementFinder = element(by.css('input#profesor-area'));
  personaSelect: ElementFinder = element(by.css('select#profesor-persona'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaInput(area) {
    await this.areaInput.sendKeys(area);
  }

  async getAreaInput() {
    return this.areaInput.getAttribute('value');
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
