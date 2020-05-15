import { element, by, ElementFinder } from 'protractor';

export default class ProyectoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.proyecto.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#proyecto-nombre'));
  fechaRegistroInput: ElementFinder = element(by.css('input#proyecto-fechaRegistro'));
  categoriaSelect: ElementFinder = element(by.css('select#proyecto-categoria'));
  areaConocimientoSelect: ElementFinder = element(by.css('select#proyecto-areaConocimiento'));
  semilleroSelect: ElementFinder = element(by.css('select#proyecto-semillero'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setFechaRegistroInput(fechaRegistro) {
    await this.fechaRegistroInput.sendKeys(fechaRegistro);
  }

  async getFechaRegistroInput() {
    return this.fechaRegistroInput.getAttribute('value');
  }

  async categoriaSelectLastOption() {
    await this.categoriaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categoriaSelectOption(option) {
    await this.categoriaSelect.sendKeys(option);
  }

  getCategoriaSelect() {
    return this.categoriaSelect;
  }

  async getCategoriaSelectedOption() {
    return this.categoriaSelect.element(by.css('option:checked')).getText();
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

  async semilleroSelectLastOption() {
    await this.semilleroSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async semilleroSelectOption(option) {
    await this.semilleroSelect.sendKeys(option);
  }

  getSemilleroSelect() {
    return this.semilleroSelect;
  }

  async getSemilleroSelectedOption() {
    return this.semilleroSelect.element(by.css('option:checked')).getText();
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
