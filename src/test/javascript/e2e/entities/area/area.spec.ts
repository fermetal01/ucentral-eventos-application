import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AreaComponentsPage, { AreaDeleteDialog } from './area.page-object';
import AreaUpdatePage from './area-update.page-object';
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

describe('Area e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaComponentsPage: AreaComponentsPage;
  let areaUpdatePage: AreaUpdatePage;
  let areaDeleteDialog: AreaDeleteDialog;
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

  it('should load Areas', async () => {
    await navBarPage.getEntityPage('area');
    areaComponentsPage = new AreaComponentsPage();
    expect(await areaComponentsPage.title.getText()).to.match(/Areas/);

    expect(await areaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([areaComponentsPage.noRecords, areaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(areaComponentsPage.noRecords)) ? 0 : await getRecordsCount(areaComponentsPage.table);
  });

  it('should load create Area page', async () => {
    await areaComponentsPage.createButton.click();
    areaUpdatePage = new AreaUpdatePage();
    expect(await areaUpdatePage.getPageTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.area.home.createOrEditLabel/);
    await areaUpdatePage.cancel();
  });

  it('should create and save Areas', async () => {
    await areaComponentsPage.createButton.click();
    await areaUpdatePage.setNombreInput('nombre');
    expect(await areaUpdatePage.getNombreInput()).to.match(/nombre/);
    await areaUpdatePage.setCapacidadInput('5');
    expect(await areaUpdatePage.getCapacidadInput()).to.eq('5');
    await areaUpdatePage.setUbicacionInput('ubicacion');
    expect(await areaUpdatePage.getUbicacionInput()).to.match(/ubicacion/);
    await areaUpdatePage.tipoAreaSelectLastOption();
    // areaUpdatePage.eventoSelectLastOption();
    await waitUntilDisplayed(areaUpdatePage.saveButton);
    await areaUpdatePage.save();
    await waitUntilHidden(areaUpdatePage.saveButton);
    expect(await isVisible(areaUpdatePage.saveButton)).to.be.false;

    expect(await areaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(areaComponentsPage.table);

    await waitUntilCount(areaComponentsPage.records, beforeRecordsCount + 1);
    expect(await areaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Area', async () => {
    const deleteButton = areaComponentsPage.getDeleteButton(areaComponentsPage.records.last());
    await click(deleteButton);

    areaDeleteDialog = new AreaDeleteDialog();
    await waitUntilDisplayed(areaDeleteDialog.deleteModal);
    expect(await areaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.area.delete.question/);
    await areaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(areaDeleteDialog.deleteModal);

    expect(await isVisible(areaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([areaComponentsPage.noRecords, areaComponentsPage.table]);

    const afterCount = (await isVisible(areaComponentsPage.noRecords)) ? 0 : await getRecordsCount(areaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
