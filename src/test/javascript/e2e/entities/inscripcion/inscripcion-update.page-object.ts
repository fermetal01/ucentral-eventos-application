import { element, by, ElementFinder } from 'protractor';

export default class InscripcionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.inscripcion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fechaRegistroInput: ElementFinder = element(by.css('input#inscripcion-fechaRegistro'));
  aprobadoInstitucionInput: ElementFinder = element(by.css('input#inscripcion-aprobadoInstitucion'));
  aprobadoEventoInput: ElementFinder = element(by.css('input#inscripcion-aprobadoEvento'));
  eventoSelect: ElementFinder = element(by.css('select#inscripcion-evento'));
  proyectoSelect: ElementFinder = element(by.css('select#inscripcion-proyecto'));
  delegadoSelect: ElementFinder = element(by.css('select#inscripcion-delegado'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFechaRegistroInput(fechaRegistro) {
    await this.fechaRegistroInput.sendKeys(fechaRegistro);
  }

  async getFechaRegistroInput() {
    return this.fechaRegistroInput.getAttribute('value');
  }

  getAprobadoInstitucionInput() {
    return this.aprobadoInstitucionInput;
  }
  getAprobadoEventoInput() {
    return this.aprobadoEventoInput;
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

  async delegadoSelectLastOption() {
    await this.delegadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async delegadoSelectOption(option) {
    await this.delegadoSelect.sendKeys(option);
  }

  getDelegadoSelect() {
    return this.delegadoSelect;
  }

  async getDelegadoSelectedOption() {
    return this.delegadoSelect.element(by.css('option:checked')).getText();
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
