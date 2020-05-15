import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EstadisticaComponentsPage, { EstadisticaDeleteDialog } from './estadistica.page-object';
import EstadisticaUpdatePage from './estadistica-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('Estadistica e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estadisticaComponentsPage: EstadisticaComponentsPage;
  let estadisticaUpdatePage: EstadisticaUpdatePage;
  let estadisticaDeleteDialog: EstadisticaDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Estadisticas', async () => {
    await navBarPage.getEntityPage('estadistica');
    estadisticaComponentsPage = new EstadisticaComponentsPage();
    expect(await estadisticaComponentsPage.title.getText()).to.match(/Estadisticas/);

    expect(await estadisticaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([estadisticaComponentsPage.noRecords, estadisticaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(estadisticaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(estadisticaComponentsPage.table);
  });

  it('should load create Estadistica page', async () => {
    await estadisticaComponentsPage.createButton.click();
    estadisticaUpdatePage = new EstadisticaUpdatePage();
    expect(await estadisticaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.estadistica.home.createOrEditLabel/
    );
    await estadisticaUpdatePage.cancel();
  });

  it('should create and save Estadisticas', async () => {
    await estadisticaComponentsPage.createButton.click();
    await estadisticaUpdatePage.setNombreInput('nombre');
    expect(await estadisticaUpdatePage.getNombreInput()).to.match(/nombre/);
    await estadisticaUpdatePage.setLlaveInput('llave');
    expect(await estadisticaUpdatePage.getLlaveInput()).to.match(/llave/);
    await estadisticaUpdatePage.setValorInput('valor');
    expect(await estadisticaUpdatePage.getValorInput()).to.match(/valor/);
    await estadisticaUpdatePage.setDescripcionInput('descripcion');
    expect(await estadisticaUpdatePage.getDescripcionInput()).to.match(/descripcion/);
    // estadisticaUpdatePage.eventoSelectLastOption();
    await waitUntilDisplayed(estadisticaUpdatePage.saveButton);
    await estadisticaUpdatePage.save();
    await waitUntilHidden(estadisticaUpdatePage.saveButton);
    expect(await isVisible(estadisticaUpdatePage.saveButton)).to.be.false;

    expect(await estadisticaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(estadisticaComponentsPage.table);

    await waitUntilCount(estadisticaComponentsPage.records, beforeRecordsCount + 1);
    expect(await estadisticaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Estadistica', async () => {
    const deleteButton = estadisticaComponentsPage.getDeleteButton(estadisticaComponentsPage.records.last());
    await click(deleteButton);

    estadisticaDeleteDialog = new EstadisticaDeleteDialog();
    await waitUntilDisplayed(estadisticaDeleteDialog.deleteModal);
    expect(await estadisticaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.estadistica.delete.question/
    );
    await estadisticaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(estadisticaDeleteDialog.deleteModal);

    expect(await isVisible(estadisticaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([estadisticaComponentsPage.noRecords, estadisticaComponentsPage.table]);

    const afterCount = (await isVisible(estadisticaComponentsPage.noRecords)) ? 0 : await getRecordsCount(estadisticaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
