import { element, by, ElementFinder } from 'protractor';

export default class CiudadUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.ciudad.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#ciudad-nombre'));
  departamentoSelect: ElementFinder = element(by.css('select#ciudad-departamento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async departamentoSelectLastOption() {
    await this.departamentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departamentoSelectOption(option) {
    await this.departamentoSelect.sendKeys(option);
  }

  getDepartamentoSelect() {
    return this.departamentoSelect;
  }

  async getDepartamentoSelectedOption() {
    return this.departamentoSelect.element(by.css('option:checked')).getText();
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
