import { element, by, ElementFinder } from 'protractor';

export default class EventoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.evento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#evento-nombre'));
  fechaInicioInput: ElementFinder = element(by.css('input#evento-fechaInicio'));
  fechaFinInput: ElementFinder = element(by.css('input#evento-fechaFin'));
  ubicacionInput: ElementFinder = element(by.css('input#evento-ubicacion'));
  ciudadSelect: ElementFinder = element(by.css('select#evento-ciudad'));
  nodoSelect: ElementFinder = element(by.css('select#evento-nodo'));
  areaConocimientoSelect: ElementFinder = element(by.css('select#evento-areaConocimiento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setFechaInicioInput(fechaInicio) {
    await this.fechaInicioInput.sendKeys(fechaInicio);
  }

  async getFechaInicioInput() {
    return this.fechaInicioInput.getAttribute('value');
  }

  async setFechaFinInput(fechaFin) {
    await this.fechaFinInput.sendKeys(fechaFin);
  }

  async getFechaFinInput() {
    return this.fechaFinInput.getAttribute('value');
  }

  async setUbicacionInput(ubicacion) {
    await this.ubicacionInput.sendKeys(ubicacion);
  }

  async getUbicacionInput() {
    return this.ubicacionInput.getAttribute('value');
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

  async areaConocimientoSelectLastOption() {
    await this.areaConocimientoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async areaConocimientoSelectOption(option) {
    await this.areaConocimientoSelect.sendKeys(option);
  }

  getAreaConocimientoSelect() {
    return this.areaConocimientoSelect;
  }

  async getAreaConocimientoSelectedOption() {
    return this.areaConocimientoSelect.element(by.css('option:checked')).getText();
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
