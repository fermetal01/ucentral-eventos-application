import { element, by, ElementFinder } from 'protractor';

export default class AreaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.area.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#area-nombre'));
  capacidadInput: ElementFinder = element(by.css('input#area-capacidad'));
  ubicacionInput: ElementFinder = element(by.css('input#area-ubicacion'));
  tipoAreaSelect: ElementFinder = element(by.css('select#area-tipoArea'));
  eventoSelect: ElementFinder = element(by.css('select#area-evento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setCapacidadInput(capacidad) {
    await this.capacidadInput.sendKeys(capacidad);
  }

  async getCapacidadInput() {
    return this.capacidadInput.getAttribute('value');
  }

  async setUbicacionInput(ubicacion) {
    await this.ubicacionInput.sendKeys(ubicacion);
  }

  async getUbicacionInput() {
    return this.ubicacionInput.getAttribute('value');
  }

  async tipoAreaSelectLastOption() {
    await this.tipoAreaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoAreaSelectOption(option) {
    await this.tipoAreaSelect.sendKeys(option);
  }

  getTipoAreaSelect() {
    return this.tipoAreaSelect;
  }

  async getTipoAreaSelectedOption() {
    return this.tipoAreaSelect.element(by.css('option:checked')).getText();
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
