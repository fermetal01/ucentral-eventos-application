import { element, by, ElementFinder } from 'protractor';

export default class AreaConocimientoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.areaConocimiento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#area-conocimiento-nombre'));
  descripcionInput: ElementFinder = element(by.css('input#area-conocimiento-descripcion'));
  padreSelect: ElementFinder = element(by.css('select#area-conocimiento-padre'));

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

  async padreSelectLastOption() {
    await this.padreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async padreSelectOption(option) {
    await this.padreSelect.sendKeys(option);
  }

  getPadreSelect() {
    return this.padreSelect;
  }

  async getPadreSelectedOption() {
    return this.padreSelect.element(by.css('option:checked')).getText();
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
