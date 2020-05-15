import { element, by, ElementFinder } from 'protractor';

export default class PersonaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.persona.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombresInput: ElementFinder = element(by.css('input#persona-nombres'));
  apellidosInput: ElementFinder = element(by.css('input#persona-apellidos'));
  numeroIdenficacionInput: ElementFinder = element(by.css('input#persona-numeroIdenficacion'));
  emailInput: ElementFinder = element(by.css('input#persona-email'));
  ciudadSelect: ElementFinder = element(by.css('select#persona-ciudad'));
  tipoIdentificacionSelect: ElementFinder = element(by.css('select#persona-tipoIdentificacion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombresInput(nombres) {
    await this.nombresInput.sendKeys(nombres);
  }

  async getNombresInput() {
    return this.nombresInput.getAttribute('value');
  }

  async setApellidosInput(apellidos) {
    await this.apellidosInput.sendKeys(apellidos);
  }

  async getApellidosInput() {
    return this.apellidosInput.getAttribute('value');
  }

  async setNumeroIdenficacionInput(numeroIdenficacion) {
    await this.numeroIdenficacionInput.sendKeys(numeroIdenficacion);
  }

  async getNumeroIdenficacionInput() {
    return this.numeroIdenficacionInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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

  async tipoIdentificacionSelectLastOption() {
    await this.tipoIdentificacionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoIdentificacionSelectOption(option) {
    await this.tipoIdentificacionSelect.sendKeys(option);
  }

  getTipoIdentificacionSelect() {
    return this.tipoIdentificacionSelect;
  }

  async getTipoIdentificacionSelectedOption() {
    return this.tipoIdentificacionSelect.element(by.css('option:checked')).getText();
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
