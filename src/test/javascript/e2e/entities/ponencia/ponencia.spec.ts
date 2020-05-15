import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PonenciaComponentsPage, { PonenciaDeleteDialog } from './ponencia.page-object';
import PonenciaUpdatePage from './ponencia-update.page-object';
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

describe('Ponencia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ponenciaComponentsPage: PonenciaComponentsPage;
  let ponenciaUpdatePage: PonenciaUpdatePage;
  let ponenciaDeleteDialog: PonenciaDeleteDialog;
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

  it('should load Ponencias', async () => {
    await navBarPage.getEntityPage('ponencia');
    ponenciaComponentsPage = new PonenciaComponentsPage();
    expect(await ponenciaComponentsPage.title.getText()).to.match(/Ponencias/);

    expect(await ponenciaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([ponenciaComponentsPage.noRecords, ponenciaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(ponenciaComponentsPage.noRecords)) ? 0 : await getRecordsCount(ponenciaComponentsPage.table);
  });

  it('should load create Ponencia page', async () => {
    await ponenciaComponentsPage.createButton.click();
    ponenciaUpdatePage = new PonenciaUpdatePage();
    expect(await ponenciaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.ponencia.home.createOrEditLabel/
    );
    await ponenciaUpdatePage.cancel();
  });

  it('should create and save Ponencias', async () => {
    await ponenciaComponentsPage.createButton.click();
    await ponenciaUpdatePage.setFechaInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await ponenciaUpdatePage.getFechaInicioInput()).to.contain('2001-01-01T02:30');
    await ponenciaUpdatePage.setFechaFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await ponenciaUpdatePage.getFechaFinInput()).to.contain('2001-01-01T02:30');
    await ponenciaUpdatePage.areaSelectLastOption();
    await ponenciaUpdatePage.eventoSelectLastOption();
    await ponenciaUpdatePage.proyectoSelectLastOption();
    // ponenciaUpdatePage.evaluadorSelectLastOption();
    await waitUntilDisplayed(ponenciaUpdatePage.saveButton);
    await ponenciaUpdatePage.save();
    await waitUntilHidden(ponenciaUpdatePage.saveButton);
    expect(await isVisible(ponenciaUpdatePage.saveButton)).to.be.false;

    expect(await ponenciaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(ponenciaComponentsPage.table);

    await waitUntilCount(ponenciaComponentsPage.records, beforeRecordsCount + 1);
    expect(await ponenciaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Ponencia', async () => {
    const deleteButton = ponenciaComponentsPage.getDeleteButton(ponenciaComponentsPage.records.last());
    await click(deleteButton);

    ponenciaDeleteDialog = new PonenciaDeleteDialog();
    await waitUntilDisplayed(ponenciaDeleteDialog.deleteModal);
    expect(await ponenciaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.ponencia.delete.question/
    );
    await ponenciaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ponenciaDeleteDialog.deleteModal);

    expect(await isVisible(ponenciaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([ponenciaComponentsPage.noRecords, ponenciaComponentsPage.table]);

    const afterCount = (await isVisible(ponenciaComponentsPage.noRecords)) ? 0 : await getRecordsCount(ponenciaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
