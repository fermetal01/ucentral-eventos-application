import { element, by, ElementFinder } from 'protractor';

export default class EstudianteUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.estudiante.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  carreraInput: ElementFinder = element(by.css('input#estudiante-carrera'));
  personaSelect: ElementFinder = element(by.css('select#estudiante-persona'));
  programaSelect: ElementFinder = element(by.css('select#estudiante-programa'));
  proyectoSelect: ElementFinder = element(by.css('select#estudiante-proyecto'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCarreraInput(carrera) {
    await this.carreraInput.sendKeys(carrera);
  }

  async getCarreraInput() {
    return this.carreraInput.getAttribute('value');
  }

  async personaSelectLastOption() {
    await this.personaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personaSelectOption(option) {
    await this.personaSelect.sendKeys(option);
  }

  getPersonaSelect() {
    return this.personaSelect;
  }

  async getPersonaSelectedOption() {
    return this.personaSelect.element(by.css('option:checked')).getText();
  }

  async programaSelectLastOption() {
    await this.programaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async programaSelectOption(option) {
    await this.programaSelect.sendKeys(option);
  }

  getProgramaSelect() {
    return this.programaSelect;
  }

  async getProgramaSelectedOption() {
    return this.programaSelect.element(by.css('option:checked')).getText();
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
