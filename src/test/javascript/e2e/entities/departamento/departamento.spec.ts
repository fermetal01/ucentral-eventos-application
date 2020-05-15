import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DepartamentoComponentsPage, { DepartamentoDeleteDialog } from './departamento.page-object';
import DepartamentoUpdatePage from './departamento-update.page-object';
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

describe('Departamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departamentoComponentsPage: DepartamentoComponentsPage;
  let departamentoUpdatePage: DepartamentoUpdatePage;
  let departamentoDeleteDialog: DepartamentoDeleteDialog;
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

  it('should load Departamentos', async () => {
    await navBarPage.getEntityPage('departamento');
    departamentoComponentsPage = new DepartamentoComponentsPage();
    expect(await departamentoComponentsPage.title.getText()).to.match(/Departamentos/);

    expect(await departamentoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([departamentoComponentsPage.noRecords, departamentoComponentsPage.table]);

    beforeRecordsCount = (await isVisible(departamentoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(departamentoComponentsPage.table);
  });

  it('should load create Departamento page', async () => {
    await departamentoComponentsPage.createButton.click();
    departamentoUpdatePage = new DepartamentoUpdatePage();
    expect(await departamentoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.departamento.home.createOrEditLabel/
    );
    await departamentoUpdatePage.cancel();
  });

  it('should create and save Departamentos', async () => {
    await departamentoComponentsPage.createButton.click();
    await departamentoUpdatePage.setNombreInput('nombre');
    expect(await departamentoUpdatePage.getNombreInput()).to.match(/nombre/);
    await waitUntilDisplayed(departamentoUpdatePage.saveButton);
    await departamentoUpdatePage.save();
    await waitUntilHidden(departamentoUpdatePage.saveButton);
    expect(await isVisible(departamentoUpdatePage.saveButton)).to.be.false;

    expect(await departamentoComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(departamentoComponentsPage.table);

    await waitUntilCount(departamentoComponentsPage.records, beforeRecordsCount + 1);
    expect(await departamentoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Departamento', async () => {
    const deleteButton = departamentoComponentsPage.getDeleteButton(departamentoComponentsPage.records.last());
    await click(deleteButton);

    departamentoDeleteDialog = new DepartamentoDeleteDialog();
    await waitUntilDisplayed(departamentoDeleteDialog.deleteModal);
    expect(await departamentoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.departamento.delete.question/
    );
    await departamentoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(departamentoDeleteDialog.deleteModal);

    expect(await isVisible(departamentoDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([departamentoComponentsPage.noRecords, departamentoComponentsPage.table]);

    const afterCount = (await isVisible(departamentoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(departamentoComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
