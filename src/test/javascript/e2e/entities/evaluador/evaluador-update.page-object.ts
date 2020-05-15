import { element, by, ElementFinder } from 'protractor';

export default class EvaluadorUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.evaluador.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codigoInput: ElementFinder = element(by.css('input#evaluador-codigo'));
  activoInput: ElementFinder = element(by.css('input#evaluador-activo'));
  personaSelect: ElementFinder = element(by.css('select#evaluador-persona'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return this.codigoInput.getAttribute('value');
  }

  getActivoInput() {
    return this.activoInput;
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
