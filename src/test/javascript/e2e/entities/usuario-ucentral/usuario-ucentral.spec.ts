import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UsuarioUcentralComponentsPage, { UsuarioUcentralDeleteDialog } from './usuario-ucentral.page-object';
import UsuarioUcentralUpdatePage from './usuario-ucentral-update.page-object';
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

describe('UsuarioUcentral e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let usuarioUcentralComponentsPage: UsuarioUcentralComponentsPage;
  let usuarioUcentralUpdatePage: UsuarioUcentralUpdatePage;
  let usuarioUcentralDeleteDialog: UsuarioUcentralDeleteDialog;
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

  it('should load UsuarioUcentrals', async () => {
    await navBarPage.getEntityPage('usuario-ucentral');
    usuarioUcentralComponentsPage = new UsuarioUcentralComponentsPage();
    expect(await usuarioUcentralComponentsPage.title.getText()).to.match(/Usuario Ucentrals/);

    expect(await usuarioUcentralComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([usuarioUcentralComponentsPage.noRecords, usuarioUcentralComponentsPage.table]);

    beforeRecordsCount = (await isVisible(usuarioUcentralComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(usuarioUcentralComponentsPage.table);
  });

  it('should load create UsuarioUcentral page', async () => {
    await usuarioUcentralComponentsPage.createButton.click();
    usuarioUcentralUpdatePage = new UsuarioUcentralUpdatePage();
    expect(await usuarioUcentralUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.usuarioUcentral.home.createOrEditLabel/
    );
    await usuarioUcentralUpdatePage.cancel();
  });

  it('should create and save UsuarioUcentrals', async () => {
    await usuarioUcentralComponentsPage.createButton.click();
    await usuarioUcentralUpdatePage.setEmailUcentralInput('emailUcentral');
    expect(await usuarioUcentralUpdatePage.getEmailUcentralInput()).to.match(/emailUcentral/);
    await usuarioUcentralUpdatePage.userSelectLastOption();
    await usuarioUcentralUpdatePage.personaSelectLastOption();
    await waitUntilDisplayed(usuarioUcentralUpdatePage.saveButton);
    await usuarioUcentralUpdatePage.save();
    await waitUntilHidden(usuarioUcentralUpdatePage.saveButton);
    expect(await isVisible(usuarioUcentralUpdatePage.saveButton)).to.be.false;

    expect(await usuarioUcentralComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(usuarioUcentralComponentsPage.table);

    await waitUntilCount(usuarioUcentralComponentsPage.records, beforeRecordsCount + 1);
    expect(await usuarioUcentralComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last UsuarioUcentral', async () => {
    const deleteButton = usuarioUcentralComponentsPage.getDeleteButton(usuarioUcentralComponentsPage.records.last());
    await click(deleteButton);

    usuarioUcentralDeleteDialog = new UsuarioUcentralDeleteDialog();
    await waitUntilDisplayed(usuarioUcentralDeleteDialog.deleteModal);
    expect(await usuarioUcentralDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.usuarioUcentral.delete.question/
    );
    await usuarioUcentralDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(usuarioUcentralDeleteDialog.deleteModal);

    expect(await isVisible(usuarioUcentralDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([usuarioUcentralComponentsPage.noRecords, usuarioUcentralComponentsPage.table]);

    const afterCount = (await isVisible(usuarioUcentralComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(usuarioUcentralComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
