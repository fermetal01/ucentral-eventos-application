import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProgramaComponentsPage, { ProgramaDeleteDialog } from './programa.page-object';
import ProgramaUpdatePage from './programa-update.page-object';
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

describe('Programa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programaComponentsPage: ProgramaComponentsPage;
  let programaUpdatePage: ProgramaUpdatePage;
  let programaDeleteDialog: ProgramaDeleteDialog;
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

  it('should load Programas', async () => {
    await navBarPage.getEntityPage('programa');
    programaComponentsPage = new ProgramaComponentsPage();
    expect(await programaComponentsPage.title.getText()).to.match(/Programas/);

    expect(await programaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([programaComponentsPage.noRecords, programaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(programaComponentsPage.noRecords)) ? 0 : await getRecordsCount(programaComponentsPage.table);
  });

  it('should load create Programa page', async () => {
    await programaComponentsPage.createButton.click();
    programaUpdatePage = new ProgramaUpdatePage();
    expect(await programaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.programa.home.createOrEditLabel/
    );
    await programaUpdatePage.cancel();
  });

  it('should create and save Programas', async () => {
    await programaComponentsPage.createButton.click();
    await programaUpdatePage.setNombreInput('nombre');
    expect(await programaUpdatePage.getNombreInput()).to.match(/nombre/);
    await programaUpdatePage.setDescripcionInput('descripcion');
    expect(await programaUpdatePage.getDescripcionInput()).to.match(/descripcion/);
    await programaUpdatePage.institucionSelectLastOption();
    await waitUntilDisplayed(programaUpdatePage.saveButton);
    await programaUpdatePage.save();
    await waitUntilHidden(programaUpdatePage.saveButton);
    expect(await isVisible(programaUpdatePage.saveButton)).to.be.false;

    expect(await programaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(programaComponentsPage.table);

    await waitUntilCount(programaComponentsPage.records, beforeRecordsCount + 1);
    expect(await programaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Programa', async () => {
    const deleteButton = programaComponentsPage.getDeleteButton(programaComponentsPage.records.last());
    await click(deleteButton);

    programaDeleteDialog = new ProgramaDeleteDialog();
    await waitUntilDisplayed(programaDeleteDialog.deleteModal);
    expect(await programaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.programa.delete.question/
    );
    await programaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(programaDeleteDialog.deleteModal);

    expect(await isVisible(programaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([programaComponentsPage.noRecords, programaComponentsPage.table]);

    const afterCount = (await isVisible(programaComponentsPage.noRecords)) ? 0 : await getRecordsCount(programaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
