import { element, by, ElementFinder } from 'protractor';

export default class EstadisticaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.estadistica.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#estadistica-nombre'));
  llaveInput: ElementFinder = element(by.css('input#estadistica-llave'));
  valorInput: ElementFinder = element(by.css('input#estadistica-valor'));
  descripcionInput: ElementFinder = element(by.css('input#estadistica-descripcion'));
  eventoSelect: ElementFinder = element(by.css('select#estadistica-evento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setLlaveInput(llave) {
    await this.llaveInput.sendKeys(llave);
  }

  async getLlaveInput() {
    return this.llaveInput.getAttribute('value');
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return this.valorInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  async eventoSelectLastOption() {
    await this.eventoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async eventoSelectOption(option) {
    await this.eventoSelect.sendKeys(option);
  }

  getEventoSelect() {
    return this.eventoSelect;
  }

  async getEventoSelectedOption() {
    return this.eventoSelect.element(by.css('option:checked')).getText();
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
