import { element, by, ElementFinder } from 'protractor';

export default class PonenciaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.ponencia.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fechaInicioInput: ElementFinder = element(by.css('input#ponencia-fechaInicio'));
  fechaFinInput: ElementFinder = element(by.css('input#ponencia-fechaFin'));
  areaSelect: ElementFinder = element(by.css('select#ponencia-area'));
  eventoSelect: ElementFinder = element(by.css('select#ponencia-evento'));
  proyectoSelect: ElementFinder = element(by.css('select#ponencia-proyecto'));
  evaluadorSelect: ElementFinder = element(by.css('select#ponencia-evaluador'));

  getPageTitle() {
    return this.pageTitle;
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

  async areaSelectLastOption() {
    await this.areaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async areaSelectOption(option) {
    await this.areaSelect.sendKeys(option);
  }

  getAreaSelect() {
    return this.areaSelect;
  }

  async getAreaSelectedOption() {
    return this.areaSelect.element(by.css('option:checked')).getText();
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

  async proyectoSelectLastOption() {
    await this.proyectoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async proyectoSelectOption(option) {
    await this.proyectoSelect.sendKeys(option);
  }

  getProyectoSelect() {
    return this.proyectoSelect;
  }

  async getProyectoSelectedOption() {
    return this.proyectoSelect.element(by.css('option:checked')).getText();
  }

  async evaluadorSelectLastOption() {
    await this.evaluadorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async evaluadorSelectOption(option) {
    await this.evaluadorSelect.sendKeys(option);
  }

  getEvaluadorSelect() {
    return this.evaluadorSelect;
  }

  async getEvaluadorSelectedOption() {
    return this.evaluadorSelect.element(by.css('option:checked')).getText();
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
