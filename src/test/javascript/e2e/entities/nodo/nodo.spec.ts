import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NodoComponentsPage, { NodoDeleteDialog } from './nodo.page-object';
import NodoUpdatePage from './nodo-update.page-object';
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

describe('Nodo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nodoComponentsPage: NodoComponentsPage;
  let nodoUpdatePage: NodoUpdatePage;
  let nodoDeleteDialog: NodoDeleteDialog;
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

  it('should load Nodos', async () => {
    await navBarPage.getEntityPage('nodo');
    nodoComponentsPage = new NodoComponentsPage();
    expect(await nodoComponentsPage.title.getText()).to.match(/Nodos/);

    expect(await nodoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([nodoComponentsPage.noRecords, nodoComponentsPage.table]);

    beforeRecordsCount = (await isVisible(nodoComponentsPage.noRecords)) ? 0 : await getRecordsCount(nodoComponentsPage.table);
  });

  it('should load create Nodo page', async () => {
    await nodoComponentsPage.createButton.click();
    nodoUpdatePage = new NodoUpdatePage();
    expect(await nodoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.nodo.home.createOrEditLabel/);
    await nodoUpdatePage.cancel();
  });

  it('should create and save Nodos', async () => {
    await nodoComponentsPage.createButton.click();
    await nodoUpdatePage.setCodigoInput('codigo');
    expect(await nodoUpdatePage.getCodigoInput()).to.match(/codigo/);
    await nodoUpdatePage.setNombreInput('nombre');
    expect(await nodoUpdatePage.getNombreInput()).to.match(/nombre/);
    await waitUntilDisplayed(nodoUpdatePage.saveButton);
    await nodoUpdatePage.save();
    await waitUntilHidden(nodoUpdatePage.saveButton);
    expect(await isVisible(nodoUpdatePage.saveButton)).to.be.false;

    expect(await nodoComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(nodoComponentsPage.table);

    await waitUntilCount(nodoComponentsPage.records, beforeRecordsCount + 1);
    expect(await nodoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Nodo', async () => {
    const deleteButton = nodoComponentsPage.getDeleteButton(nodoComponentsPage.records.last());
    await click(deleteButton);

    nodoDeleteDialog = new NodoDeleteDialog();
    await waitUntilDisplayed(nodoDeleteDialog.deleteModal);
    expect(await nodoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.nodo.delete.question/);
    await nodoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(nodoDeleteDialog.deleteModal);

    expect(await isVisible(nodoDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([nodoComponentsPage.noRecords, nodoComponentsPage.table]);

    const afterCount = (await isVisible(nodoComponentsPage.noRecords)) ? 0 : await getRecordsCount(nodoComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
