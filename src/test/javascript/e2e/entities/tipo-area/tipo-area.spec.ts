import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TipoAreaComponentsPage, { TipoAreaDeleteDialog } from './tipo-area.page-object';
import TipoAreaUpdatePage from './tipo-area-update.page-object';
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

describe('TipoArea e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoAreaComponentsPage: TipoAreaComponentsPage;
  let tipoAreaUpdatePage: TipoAreaUpdatePage;
  let tipoAreaDeleteDialog: TipoAreaDeleteDialog;
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

  it('should load TipoAreas', async () => {
    await navBarPage.getEntityPage('tipo-area');
    tipoAreaComponentsPage = new TipoAreaComponentsPage();
    expect(await tipoAreaComponentsPage.title.getText()).to.match(/Tipo Areas/);

    expect(await tipoAreaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tipoAreaComponentsPage.noRecords, tipoAreaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tipoAreaComponentsPage.noRecords)) ? 0 : await getRecordsCount(tipoAreaComponentsPage.table);
  });

  it('should load create TipoArea page', async () => {
    await tipoAreaComponentsPage.createButton.click();
    tipoAreaUpdatePage = new TipoAreaUpdatePage();
    expect(await tipoAreaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.tipoArea.home.createOrEditLabel/
    );
    await tipoAreaUpdatePage.cancel();
  });

  it('should create and save TipoAreas', async () => {
    await tipoAreaComponentsPage.createButton.click();
    await tipoAreaUpdatePage.setNombreInput('nombre');
    expect(await tipoAreaUpdatePage.getNombreInput()).to.match(/nombre/);
    await waitUntilDisplayed(tipoAreaUpdatePage.saveButton);
    await tipoAreaUpdatePage.save();
    await waitUntilHidden(tipoAreaUpdatePage.saveButton);
    expect(await isVisible(tipoAreaUpdatePage.saveButton)).to.be.false;

    expect(await tipoAreaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tipoAreaComponentsPage.table);

    await waitUntilCount(tipoAreaComponentsPage.records, beforeRecordsCount + 1);
    expect(await tipoAreaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TipoArea', async () => {
    const deleteButton = tipoAreaComponentsPage.getDeleteButton(tipoAreaComponentsPage.records.last());
    await click(deleteButton);

    tipoAreaDeleteDialog = new TipoAreaDeleteDialog();
    await waitUntilDisplayed(tipoAreaDeleteDialog.deleteModal);
    expect(await tipoAreaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.tipoArea.delete.question/
    );
    await tipoAreaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tipoAreaDeleteDialog.deleteModal);

    expect(await isVisible(tipoAreaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tipoAreaComponentsPage.noRecords, tipoAreaComponentsPage.table]);

    const afterCount = (await isVisible(tipoAreaComponentsPage.noRecords)) ? 0 : await getRecordsCount(tipoAreaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
