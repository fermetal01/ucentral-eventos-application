import { element, by, ElementFinder } from 'protractor';

export default class EvaluacionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.evaluacion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  calificacionInput: ElementFinder = element(by.css('input#evaluacion-calificacion'));
  observacionesInput: ElementFinder = element(by.css('input#evaluacion-observaciones'));
  ponenciaSelect: ElementFinder = element(by.css('select#evaluacion-ponencia'));
  evaluadorSelect: ElementFinder = element(by.css('select#evaluacion-evaluador'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCalificacionInput(calificacion) {
    await this.calificacionInput.sendKeys(calificacion);
  }

  async getCalificacionInput() {
    return this.calificacionInput.getAttribute('value');
  }

  async setObservacionesInput(observaciones) {
    await this.observacionesInput.sendKeys(observaciones);
  }

  async getObservacionesInput() {
    return this.observacionesInput.getAttribute('value');
  }

  async ponenciaSelectLastOption() {
    await this.ponenciaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ponenciaSelectOption(option) {
    await this.ponenciaSelect.sendKeys(option);
  }

  getPonenciaSelect() {
    return this.ponenciaSelect;
  }

  async getPonenciaSelectedOption() {
    return this.ponenciaSelect.element(by.css('option:checked')).getText();
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
