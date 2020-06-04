import { element, by, ElementFinder } from 'protractor';

export default class SemilleroUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.semillero.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#semillero-nombre'));
  institucionSelect: ElementFinder = element(by.css('select#semillero-institucion'));
  profesorSelect: ElementFinder = element(by.css('select#semillero-profesor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
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

  async profesorSelectLastOption() {
    await this.profesorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async profesorSelectOption(option) {
    await this.profesorSelect.sendKeys(option);
  }

  getProfesorSelect() {
    return this.profesorSelect;
  }

  async getProfesorSelectedOption() {
    return this.profesorSelect.element(by.css('option:checked')).getText();
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
