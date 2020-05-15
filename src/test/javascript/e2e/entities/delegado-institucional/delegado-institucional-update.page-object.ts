import { element, by, ElementFinder } from 'protractor';

export default class DelegadoInstitucionalUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.delegadoInstitucional.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codigoInput: ElementFinder = element(by.css('input#delegado-institucional-codigo'));
  personaSelect: ElementFinder = element(by.css('select#delegado-institucional-persona'));
  institucionSelect: ElementFinder = element(by.css('select#delegado-institucional-institucion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return this.codigoInput.getAttribute('value');
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

  async institucionSelectLastOption() {
    await this.institucionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async institucionSelectOption(option) {
    await this.institucionSelect.sendKeys(option);
  }

  getInstitucionSelect() {
    return this.institucionSelect;
  }

  async getInstitucionSelectedOption() {
    return this.institucionSelect.element(by.css('option:checked')).getText();
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
