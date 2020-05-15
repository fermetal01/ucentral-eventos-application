import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InstitucionComponentsPage, { InstitucionDeleteDialog } from './institucion.page-object';
import InstitucionUpdatePage from './institucion-update.page-object';
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

describe('Institucion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let institucionComponentsPage: InstitucionComponentsPage;
  let institucionUpdatePage: InstitucionUpdatePage;
  let institucionDeleteDialog: InstitucionDeleteDialog;
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

  it('should load Institucions', async () => {
    await navBarPage.getEntityPage('institucion');
    institucionComponentsPage = new InstitucionComponentsPage();
    expect(await institucionComponentsPage.title.getText()).to.match(/Institucions/);

    expect(await institucionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([institucionComponentsPage.noRecords, institucionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(institucionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(institucionComponentsPage.table);
  });

  it('should load create Institucion page', async () => {
    await institucionComponentsPage.createButton.click();
    institucionUpdatePage = new InstitucionUpdatePage();
    expect(await institucionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.institucion.home.createOrEditLabel/
    );
    await institucionUpdatePage.cancel();
  });

  it('should create and save Institucions', async () => {
    await institucionComponentsPage.createButton.click();
    await institucionUpdatePage.setNombreInput('nombre');
    expect(await institucionUpdatePage.getNombreInput()).to.match(/nombre/);
    await institucionUpdatePage.setWebInput('web');
    expect(await institucionUpdatePage.getWebInput()).to.match(/web/);
    await institucionUpdatePage.setFechaRegistroInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await institucionUpdatePage.getFechaRegistroInput()).to.contain('2001-01-01T02:30');
    await institucionUpdatePage.ciudadSelectLastOption();
    await institucionUpdatePage.nodoSelectLastOption();
    await waitUntilDisplayed(institucionUpdatePage.saveButton);
    await institucionUpdatePage.save();
    await waitUntilHidden(institucionUpdatePage.saveButton);
    expect(await isVisible(institucionUpdatePage.saveButton)).to.be.false;

    expect(await institucionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(institucionComponentsPage.table);

    await waitUntilCount(institucionComponentsPage.records, beforeRecordsCount + 1);
    expect(await institucionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Institucion', async () => {
    const deleteButton = institucionComponentsPage.getDeleteButton(institucionComponentsPage.records.last());
    await click(deleteButton);

    institucionDeleteDialog = new InstitucionDeleteDialog();
    await waitUntilDisplayed(institucionDeleteDialog.deleteModal);
    expect(await institucionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.institucion.delete.question/
    );
    await institucionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(institucionDeleteDialog.deleteModal);

    expect(await isVisible(institucionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([institucionComponentsPage.noRecords, institucionComponentsPage.table]);

    const afterCount = (await isVisible(institucionComponentsPage.noRecords)) ? 0 : await getRecordsCount(institucionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
