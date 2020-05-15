import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AreaConocimientoComponentsPage, { AreaConocimientoDeleteDialog } from './area-conocimiento.page-object';
import AreaConocimientoUpdatePage from './area-conocimiento-update.page-object';
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

describe('AreaConocimiento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaConocimientoComponentsPage: AreaConocimientoComponentsPage;
  let areaConocimientoUpdatePage: AreaConocimientoUpdatePage;
  let areaConocimientoDeleteDialog: AreaConocimientoDeleteDialog;
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

  it('should load AreaConocimientos', async () => {
    await navBarPage.getEntityPage('area-conocimiento');
    areaConocimientoComponentsPage = new AreaConocimientoComponentsPage();
    expect(await areaConocimientoComponentsPage.title.getText()).to.match(/Area Conocimientos/);

    expect(await areaConocimientoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([areaConocimientoComponentsPage.noRecords, areaConocimientoComponentsPage.table]);

    beforeRecordsCount = (await isVisible(areaConocimientoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(areaConocimientoComponentsPage.table);
  });

  it('should load create AreaConocimiento page', async () => {
    await areaConocimientoComponentsPage.createButton.click();
    areaConocimientoUpdatePage = new AreaConocimientoUpdatePage();
    expect(await areaConocimientoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.areaConocimiento.home.createOrEditLabel/
    );
    await areaConocimientoUpdatePage.cancel();
  });

  it('should create and save AreaConocimientos', async () => {
    await areaConocimientoComponentsPage.createButton.click();
    await areaConocimientoUpdatePage.setNombreInput('nombre');
    expect(await areaConocimientoUpdatePage.getNombreInput()).to.match(/nombre/);
    await areaConocimientoUpdatePage.setDescripcionInput('descripcion');
    expect(await areaConocimientoUpdatePage.getDescripcionInput()).to.match(/descripcion/);
    await areaConocimientoUpdatePage.padreSelectLastOption();
    await waitUntilDisplayed(areaConocimientoUpdatePage.saveButton);
    await areaConocimientoUpdatePage.save();
    await waitUntilHidden(areaConocimientoUpdatePage.saveButton);
    expect(await isVisible(areaConocimientoUpdatePage.saveButton)).to.be.false;

    expect(await areaConocimientoComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(areaConocimientoComponentsPage.table);

    await waitUntilCount(areaConocimientoComponentsPage.records, beforeRecordsCount + 1);
    expect(await areaConocimientoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last AreaConocimiento', async () => {
    const deleteButton = areaConocimientoComponentsPage.getDeleteButton(areaConocimientoComponentsPage.records.last());
    await click(deleteButton);

    areaConocimientoDeleteDialog = new AreaConocimientoDeleteDialog();
    await waitUntilDisplayed(areaConocimientoDeleteDialog.deleteModal);
    expect(await areaConocimientoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.areaConocimiento.delete.question/
    );
    await areaConocimientoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(areaConocimientoDeleteDialog.deleteModal);

    expect(await isVisible(areaConocimientoDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([areaConocimientoComponentsPage.noRecords, areaConocimientoComponentsPage.table]);

    const afterCount = (await isVisible(areaConocimientoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(areaConocimientoComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
