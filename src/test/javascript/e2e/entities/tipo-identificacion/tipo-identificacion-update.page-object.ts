import { element, by, ElementFinder } from 'protractor';

export default class TipoIdentificacionUpdatePage {
  pageTitle: ElementFinder = element(by.id('ucentralEventosApplicationApp.tipoIdentificacion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombresInput: ElementFinder = element(by.css('input#tipo-identificacion-nombres'));
  codigoInput: ElementFinder = element(by.css('input#tipo-identificacion-codigo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombresInput(nombres) {
    await this.nombresInput.sendKeys(nombres);
  }

  async getNombresInput() {
    return this.nombresInput.getAttribute('value');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return this.codigoInput.getAttribute('value');
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
