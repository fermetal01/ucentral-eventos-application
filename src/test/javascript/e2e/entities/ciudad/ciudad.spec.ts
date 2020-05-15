import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CiudadComponentsPage, { CiudadDeleteDialog } from './ciudad.page-object';
import CiudadUpdatePage from './ciudad-update.page-object';
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

describe('Ciudad e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ciudadComponentsPage: CiudadComponentsPage;
  let ciudadUpdatePage: CiudadUpdatePage;
  let ciudadDeleteDialog: CiudadDeleteDialog;
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

  it('should load Ciudads', async () => {
    await navBarPage.getEntityPage('ciudad');
    ciudadComponentsPage = new CiudadComponentsPage();
    expect(await ciudadComponentsPage.title.getText()).to.match(/Ciudads/);

    expect(await ciudadComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([ciudadComponentsPage.noRecords, ciudadComponentsPage.table]);

    beforeRecordsCount = (await isVisible(ciudadComponentsPage.noRecords)) ? 0 : await getRecordsCount(ciudadComponentsPage.table);
  });

  it('should load create Ciudad page', async () => {
    await ciudadComponentsPage.createButton.click();
    ciudadUpdatePage = new CiudadUpdatePage();
    expect(await ciudadUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.ciudad.home.createOrEditLabel/
    );
    await ciudadUpdatePage.cancel();
  });

  it('should create and save Ciudads', async () => {
    await ciudadComponentsPage.createButton.click();
    await ciudadUpdatePage.setNombreInput('nombre');
    expect(await ciudadUpdatePage.getNombreInput()).to.match(/nombre/);
    await ciudadUpdatePage.departamentoSelectLastOption();
    await waitUntilDisplayed(ciudadUpdatePage.saveButton);
    await ciudadUpdatePage.save();
    await waitUntilHidden(ciudadUpdatePage.saveButton);
    expect(await isVisible(ciudadUpdatePage.saveButton)).to.be.false;

    expect(await ciudadComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(ciudadComponentsPage.table);

    await waitUntilCount(ciudadComponentsPage.records, beforeRecordsCount + 1);
    expect(await ciudadComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Ciudad', async () => {
    const deleteButton = ciudadComponentsPage.getDeleteButton(ciudadComponentsPage.records.last());
    await click(deleteButton);

    ciudadDeleteDialog = new CiudadDeleteDialog();
    await waitUntilDisplayed(ciudadDeleteDialog.deleteModal);
    expect(await ciudadDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.ciudad.delete.question/);
    await ciudadDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ciudadDeleteDialog.deleteModal);

    expect(await isVisible(ciudadDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([ciudadComponentsPage.noRecords, ciudadComponentsPage.table]);

    const afterCount = (await isVisible(ciudadComponentsPage.noRecords)) ? 0 : await getRecordsCount(ciudadComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
