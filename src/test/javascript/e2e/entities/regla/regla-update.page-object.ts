import { element, by, ElementFinder } from 'protractor';

export default class ReglaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.regla.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#regla-nombre'));
  llaveInput: ElementFinder = element(by.css('input#regla-llave'));
  valorInput: ElementFinder = element(by.css('input#regla-valor'));
  auxiliarInput: ElementFinder = element(by.css('input#regla-auxiliar'));
  eventoSelect: ElementFinder = element(by.css('select#regla-evento'));

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

  async setAuxiliarInput(auxiliar) {
    await this.auxiliarInput.sendKeys(auxiliar);
  }

  async getAuxiliarInput() {
    return this.auxiliarInput.getAttribute('value');
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
