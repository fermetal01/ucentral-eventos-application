import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SemilleroComponentsPage, { SemilleroDeleteDialog } from './semillero.page-object';
import SemilleroUpdatePage from './semillero-update.page-object';
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

describe('Semillero e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let semilleroComponentsPage: SemilleroComponentsPage;
  let semilleroUpdatePage: SemilleroUpdatePage;
  let semilleroDeleteDialog: SemilleroDeleteDialog;
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

  it('should load Semilleros', async () => {
    await navBarPage.getEntityPage('semillero');
    semilleroComponentsPage = new SemilleroComponentsPage();
    expect(await semilleroComponentsPage.title.getText()).to.match(/Semilleros/);

    expect(await semilleroComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([semilleroComponentsPage.noRecords, semilleroComponentsPage.table]);

    beforeRecordsCount = (await isVisible(semilleroComponentsPage.noRecords)) ? 0 : await getRecordsCount(semilleroComponentsPage.table);
  });

  it('should load create Semillero page', async () => {
    await semilleroComponentsPage.createButton.click();
    semilleroUpdatePage = new SemilleroUpdatePage();
    expect(await semilleroUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.semillero.home.createOrEditLabel/
    );
    await semilleroUpdatePage.cancel();
  });

  it('should create and save Semilleros', async () => {
    await semilleroComponentsPage.createButton.click();
    await semilleroUpdatePage.setNombreInput('nombre');
    expect(await semilleroUpdatePage.getNombreInput()).to.match(/nombre/);
    await semilleroUpdatePage.profesorSelectLastOption();
    await semilleroUpdatePage.institucionSelectLastOption();
    await waitUntilDisplayed(semilleroUpdatePage.saveButton);
    await semilleroUpdatePage.save();
    await waitUntilHidden(semilleroUpdatePage.saveButton);
    expect(await isVisible(semilleroUpdatePage.saveButton)).to.be.false;

    expect(await semilleroComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(semilleroComponentsPage.table);

    await waitUntilCount(semilleroComponentsPage.records, beforeRecordsCount + 1);
    expect(await semilleroComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Semillero', async () => {
    const deleteButton = semilleroComponentsPage.getDeleteButton(semilleroComponentsPage.records.last());
    await click(deleteButton);

    semilleroDeleteDialog = new SemilleroDeleteDialog();
    await waitUntilDisplayed(semilleroDeleteDialog.deleteModal);
    expect(await semilleroDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.semillero.delete.question/
    );
    await semilleroDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(semilleroDeleteDialog.deleteModal);

    expect(await isVisible(semilleroDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([semilleroComponentsPage.noRecords, semilleroComponentsPage.table]);

    const afterCount = (await isVisible(semilleroComponentsPage.noRecords)) ? 0 : await getRecordsCount(semilleroComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
