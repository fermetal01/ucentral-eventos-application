import { element, by, ElementFinder } from 'protractor';

export default class DepartamentoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.departamento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#departamento-nombre'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
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
