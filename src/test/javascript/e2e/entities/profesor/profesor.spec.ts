import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfesorComponentsPage, { ProfesorDeleteDialog } from './profesor.page-object';
import ProfesorUpdatePage from './profesor-update.page-object';
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

describe('Profesor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profesorComponentsPage: ProfesorComponentsPage;
  let profesorUpdatePage: ProfesorUpdatePage;
  let profesorDeleteDialog: ProfesorDeleteDialog;
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

  it('should load Profesors', async () => {
    await navBarPage.getEntityPage('profesor');
    profesorComponentsPage = new ProfesorComponentsPage();
    expect(await profesorComponentsPage.title.getText()).to.match(/Profesors/);

    expect(await profesorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([profesorComponentsPage.noRecords, profesorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(profesorComponentsPage.noRecords)) ? 0 : await getRecordsCount(profesorComponentsPage.table);
  });

  it('should load create Profesor page', async () => {
    await profesorComponentsPage.createButton.click();
    profesorUpdatePage = new ProfesorUpdatePage();
    expect(await profesorUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.profesor.home.createOrEditLabel/
    );
    await profesorUpdatePage.cancel();
  });

  it('should create and save Profesors', async () => {
    await profesorComponentsPage.createButton.click();
    await profesorUpdatePage.setAreaInput('area');
    expect(await profesorUpdatePage.getAreaInput()).to.match(/area/);
    await profesorUpdatePage.personaSelectLastOption();
    await waitUntilDisplayed(profesorUpdatePage.saveButton);
    await profesorUpdatePage.save();
    await waitUntilHidden(profesorUpdatePage.saveButton);
    expect(await isVisible(profesorUpdatePage.saveButton)).to.be.false;

    expect(await profesorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(profesorComponentsPage.table);

    await waitUntilCount(profesorComponentsPage.records, beforeRecordsCount + 1);
    expect(await profesorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Profesor', async () => {
    const deleteButton = profesorComponentsPage.getDeleteButton(profesorComponentsPage.records.last());
    await click(deleteButton);

    profesorDeleteDialog = new ProfesorDeleteDialog();
    await waitUntilDisplayed(profesorDeleteDialog.deleteModal);
    expect(await profesorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.profesor.delete.question/
    );
    await profesorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(profesorDeleteDialog.deleteModal);

    expect(await isVisible(profesorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([profesorComponentsPage.noRecords, profesorComponentsPage.table]);

    const afterCount = (await isVisible(profesorComponentsPage.noRecords)) ? 0 : await getRecordsCount(profesorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
