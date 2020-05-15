import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReglaComponentsPage, { ReglaDeleteDialog } from './regla.page-object';
import ReglaUpdatePage from './regla-update.page-object';
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

describe('Regla e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reglaComponentsPage: ReglaComponentsPage;
  let reglaUpdatePage: ReglaUpdatePage;
  let reglaDeleteDialog: ReglaDeleteDialog;
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

  it('should load Reglas', async () => {
    await navBarPage.getEntityPage('regla');
    reglaComponentsPage = new ReglaComponentsPage();
    expect(await reglaComponentsPage.title.getText()).to.match(/Reglas/);

    expect(await reglaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([reglaComponentsPage.noRecords, reglaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(reglaComponentsPage.noRecords)) ? 0 : await getRecordsCount(reglaComponentsPage.table);
  });

  it('should load create Regla page', async () => {
    await reglaComponentsPage.createButton.click();
    reglaUpdatePage = new ReglaUpdatePage();
    expect(await reglaUpdatePage.getPageTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.regla.home.createOrEditLabel/);
    await reglaUpdatePage.cancel();
  });

  it('should create and save Reglas', async () => {
    await reglaComponentsPage.createButton.click();
    await reglaUpdatePage.setNombreInput('nombre');
    expect(await reglaUpdatePage.getNombreInput()).to.match(/nombre/);
    await reglaUpdatePage.setLlaveInput('llave');
    expect(await reglaUpdatePage.getLlaveInput()).to.match(/llave/);
    await reglaUpdatePage.setValorInput('valor');
    expect(await reglaUpdatePage.getValorInput()).to.match(/valor/);
    await reglaUpdatePage.setAuxiliarInput('auxiliar');
    expect(await reglaUpdatePage.getAuxiliarInput()).to.match(/auxiliar/);
    // reglaUpdatePage.eventoSelectLastOption();
    await waitUntilDisplayed(reglaUpdatePage.saveButton);
    await reglaUpdatePage.save();
    await waitUntilHidden(reglaUpdatePage.saveButton);
    expect(await isVisible(reglaUpdatePage.saveButton)).to.be.false;

    expect(await reglaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(reglaComponentsPage.table);

    await waitUntilCount(reglaComponentsPage.records, beforeRecordsCount + 1);
    expect(await reglaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Regla', async () => {
    const deleteButton = reglaComponentsPage.getDeleteButton(reglaComponentsPage.records.last());
    await click(deleteButton);

    reglaDeleteDialog = new ReglaDeleteDialog();
    await waitUntilDisplayed(reglaDeleteDialog.deleteModal);
    expect(await reglaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.regla.delete.question/);
    await reglaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(reglaDeleteDialog.deleteModal);

    expect(await isVisible(reglaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([reglaComponentsPage.noRecords, reglaComponentsPage.table]);

    const afterCount = (await isVisible(reglaComponentsPage.noRecords)) ? 0 : await getRecordsCount(reglaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
