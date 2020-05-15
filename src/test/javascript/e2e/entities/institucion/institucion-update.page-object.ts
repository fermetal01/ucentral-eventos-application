import { element, by, ElementFinder } from 'protractor';

export default class InstitucionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.institucion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#institucion-nombre'));
  webInput: ElementFinder = element(by.css('input#institucion-web'));
  fechaRegistroInput: ElementFinder = element(by.css('input#institucion-fechaRegistro'));
  ciudadSelect: ElementFinder = element(by.css('select#institucion-ciudad'));
  nodoSelect: ElementFinder = element(by.css('select#institucion-nodo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setWebInput(web) {
    await this.webInput.sendKeys(web);
  }

  async getWebInput() {
    return this.webInput.getAttribute('value');
  }

  async setFechaRegistroInput(fechaRegistro) {
    await this.fechaRegistroInput.sendKeys(fechaRegistro);
  }

  async getFechaRegistroInput() {
    return this.fechaRegistroInput.getAttribute('value');
  }

  async ciudadSelectLastOption() {
    await this.ciudadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ciudadSelectOption(option) {
    await this.ciudadSelect.sendKeys(option);
  }

  getCiudadSelect() {
    return this.ciudadSelect;
  }

  async getCiudadSelectedOption() {
    return this.ciudadSelect.element(by.css('option:checked')).getText();
  }

  async nodoSelectLastOption() {
    await this.nodoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nodoSelectOption(option) {
    await this.nodoSelect.sendKeys(option);
  }

  getNodoSelect() {
    return this.nodoSelect;
  }

  async getNodoSelectedOption() {
    return this.nodoSelect.element(by.css('option:checked')).getText();
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
