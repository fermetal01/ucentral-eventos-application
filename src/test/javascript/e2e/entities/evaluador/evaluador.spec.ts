import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EvaluadorComponentsPage, { EvaluadorDeleteDialog } from './evaluador.page-object';
import EvaluadorUpdatePage from './evaluador-update.page-object';
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

describe('Evaluador e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let evaluadorComponentsPage: EvaluadorComponentsPage;
  let evaluadorUpdatePage: EvaluadorUpdatePage;
  let evaluadorDeleteDialog: EvaluadorDeleteDialog;
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

  it('should load Evaluadors', async () => {
    await navBarPage.getEntityPage('evaluador');
    evaluadorComponentsPage = new EvaluadorComponentsPage();
    expect(await evaluadorComponentsPage.title.getText()).to.match(/Evaluadors/);

    expect(await evaluadorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([evaluadorComponentsPage.noRecords, evaluadorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(evaluadorComponentsPage.noRecords)) ? 0 : await getRecordsCount(evaluadorComponentsPage.table);
  });

  it('should load create Evaluador page', async () => {
    await evaluadorComponentsPage.createButton.click();
    evaluadorUpdatePage = new EvaluadorUpdatePage();
    expect(await evaluadorUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.evaluador.home.createOrEditLabel/
    );
    await evaluadorUpdatePage.cancel();
  });

  it('should create and save Evaluadors', async () => {
    await evaluadorComponentsPage.createButton.click();
    await evaluadorUpdatePage.setCodigoInput('codigo');
    expect(await evaluadorUpdatePage.getCodigoInput()).to.match(/codigo/);
    const selectedActivo = await evaluadorUpdatePage.getActivoInput().isSelected();
    if (selectedActivo) {
      await evaluadorUpdatePage.getActivoInput().click();
      expect(await evaluadorUpdatePage.getActivoInput().isSelected()).to.be.false;
    } else {
      await evaluadorUpdatePage.getActivoInput().click();
      expect(await evaluadorUpdatePage.getActivoInput().isSelected()).to.be.true;
    }
    await evaluadorUpdatePage.personaSelectLastOption();
    await waitUntilDisplayed(evaluadorUpdatePage.saveButton);
    await evaluadorUpdatePage.save();
    await waitUntilHidden(evaluadorUpdatePage.saveButton);
    expect(await isVisible(evaluadorUpdatePage.saveButton)).to.be.false;

    expect(await evaluadorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(evaluadorComponentsPage.table);

    await waitUntilCount(evaluadorComponentsPage.records, beforeRecordsCount + 1);
    expect(await evaluadorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Evaluador', async () => {
    const deleteButton = evaluadorComponentsPage.getDeleteButton(evaluadorComponentsPage.records.last());
    await click(deleteButton);

    evaluadorDeleteDialog = new EvaluadorDeleteDialog();
    await waitUntilDisplayed(evaluadorDeleteDialog.deleteModal);
    expect(await evaluadorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.evaluador.delete.question/
    );
    await evaluadorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(evaluadorDeleteDialog.deleteModal);

    expect(await isVisible(evaluadorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([evaluadorComponentsPage.noRecords, evaluadorComponentsPage.table]);

    const afterCount = (await isVisible(evaluadorComponentsPage.noRecords)) ? 0 : await getRecordsCount(evaluadorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
