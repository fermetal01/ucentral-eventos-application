import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DelegadoInstitucionalComponentsPage, { DelegadoInstitucionalDeleteDialog } from './delegado-institucional.page-object';
import DelegadoInstitucionalUpdatePage from './delegado-institucional-update.page-object';
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

describe('DelegadoInstitucional e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let delegadoInstitucionalComponentsPage: DelegadoInstitucionalComponentsPage;
  let delegadoInstitucionalUpdatePage: DelegadoInstitucionalUpdatePage;
  let delegadoInstitucionalDeleteDialog: DelegadoInstitucionalDeleteDialog;
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

  it('should load DelegadoInstitucionals', async () => {
    await navBarPage.getEntityPage('delegado-institucional');
    delegadoInstitucionalComponentsPage = new DelegadoInstitucionalComponentsPage();
    expect(await delegadoInstitucionalComponentsPage.title.getText()).to.match(/Delegado Institucionals/);

    expect(await delegadoInstitucionalComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([delegadoInstitucionalComponentsPage.noRecords, delegadoInstitucionalComponentsPage.table]);

    beforeRecordsCount = (await isVisible(delegadoInstitucionalComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(delegadoInstitucionalComponentsPage.table);
  });

  it('should load create DelegadoInstitucional page', async () => {
    await delegadoInstitucionalComponentsPage.createButton.click();
    delegadoInstitucionalUpdatePage = new DelegadoInstitucionalUpdatePage();
    expect(await delegadoInstitucionalUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.delegadoInstitucional.home.createOrEditLabel/
    );
    await delegadoInstitucionalUpdatePage.cancel();
  });

  it('should create and save DelegadoInstitucionals', async () => {
    await delegadoInstitucionalComponentsPage.createButton.click();
    await delegadoInstitucionalUpdatePage.setCodigoInput('codigo');
    expect(await delegadoInstitucionalUpdatePage.getCodigoInput()).to.match(/codigo/);
    await delegadoInstitucionalUpdatePage.personaSelectLastOption();
    // delegadoInstitucionalUpdatePage.institucionSelectLastOption();
    await waitUntilDisplayed(delegadoInstitucionalUpdatePage.saveButton);
    await delegadoInstitucionalUpdatePage.save();
    await waitUntilHidden(delegadoInstitucionalUpdatePage.saveButton);
    expect(await isVisible(delegadoInstitucionalUpdatePage.saveButton)).to.be.false;

    expect(await delegadoInstitucionalComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(delegadoInstitucionalComponentsPage.table);

    await waitUntilCount(delegadoInstitucionalComponentsPage.records, beforeRecordsCount + 1);
    expect(await delegadoInstitucionalComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last DelegadoInstitucional', async () => {
    const deleteButton = delegadoInstitucionalComponentsPage.getDeleteButton(delegadoInstitucionalComponentsPage.records.last());
    await click(deleteButton);

    delegadoInstitucionalDeleteDialog = new DelegadoInstitucionalDeleteDialog();
    await waitUntilDisplayed(delegadoInstitucionalDeleteDialog.deleteModal);
    expect(await delegadoInstitucionalDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.delegadoInstitucional.delete.question/
    );
    await delegadoInstitucionalDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(delegadoInstitucionalDeleteDialog.deleteModal);

    expect(await isVisible(delegadoInstitucionalDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([delegadoInstitucionalComponentsPage.noRecords, delegadoInstitucionalComponentsPage.table]);

    const afterCount = (await isVisible(delegadoInstitucionalComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(delegadoInstitucionalComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
