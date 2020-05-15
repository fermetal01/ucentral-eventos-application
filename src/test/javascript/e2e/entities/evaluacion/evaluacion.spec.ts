import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EvaluacionComponentsPage, { EvaluacionDeleteDialog } from './evaluacion.page-object';
import EvaluacionUpdatePage from './evaluacion-update.page-object';
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

describe('Evaluacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let evaluacionComponentsPage: EvaluacionComponentsPage;
  let evaluacionUpdatePage: EvaluacionUpdatePage;
  let evaluacionDeleteDialog: EvaluacionDeleteDialog;
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

  it('should load Evaluacions', async () => {
    await navBarPage.getEntityPage('evaluacion');
    evaluacionComponentsPage = new EvaluacionComponentsPage();
    expect(await evaluacionComponentsPage.title.getText()).to.match(/Evaluacions/);

    expect(await evaluacionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([evaluacionComponentsPage.noRecords, evaluacionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(evaluacionComponentsPage.noRecords)) ? 0 : await getRecordsCount(evaluacionComponentsPage.table);
  });

  it('should load create Evaluacion page', async () => {
    await evaluacionComponentsPage.createButton.click();
    evaluacionUpdatePage = new EvaluacionUpdatePage();
    expect(await evaluacionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.evaluacion.home.createOrEditLabel/
    );
    await evaluacionUpdatePage.cancel();
  });

  it('should create and save Evaluacions', async () => {
    await evaluacionComponentsPage.createButton.click();
    await evaluacionUpdatePage.setCalificacionInput('5');
    expect(await evaluacionUpdatePage.getCalificacionInput()).to.eq('5');
    await evaluacionUpdatePage.setObservacionesInput('observaciones');
    expect(await evaluacionUpdatePage.getObservacionesInput()).to.match(/observaciones/);
    await evaluacionUpdatePage.ponenciaSelectLastOption();
    await evaluacionUpdatePage.evaluadorSelectLastOption();
    await waitUntilDisplayed(evaluacionUpdatePage.saveButton);
    await evaluacionUpdatePage.save();
    await waitUntilHidden(evaluacionUpdatePage.saveButton);
    expect(await isVisible(evaluacionUpdatePage.saveButton)).to.be.false;

    expect(await evaluacionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(evaluacionComponentsPage.table);

    await waitUntilCount(evaluacionComponentsPage.records, beforeRecordsCount + 1);
    expect(await evaluacionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Evaluacion', async () => {
    const deleteButton = evaluacionComponentsPage.getDeleteButton(evaluacionComponentsPage.records.last());
    await click(deleteButton);

    evaluacionDeleteDialog = new EvaluacionDeleteDialog();
    await waitUntilDisplayed(evaluacionDeleteDialog.deleteModal);
    expect(await evaluacionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.evaluacion.delete.question/
    );
    await evaluacionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(evaluacionDeleteDialog.deleteModal);

    expect(await isVisible(evaluacionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([evaluacionComponentsPage.noRecords, evaluacionComponentsPage.table]);

    const afterCount = (await isVisible(evaluacionComponentsPage.noRecords)) ? 0 : await getRecordsCount(evaluacionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
