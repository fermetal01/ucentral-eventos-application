import { element, by, ElementFinder } from 'protractor';

export default class ProgramaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.programa.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#programa-nombre'));
  descripcionInput: ElementFinder = element(by.css('input#programa-descripcion'));
  institucionSelect: ElementFinder = element(by.css('select#programa-institucion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
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
