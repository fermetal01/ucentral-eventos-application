import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InscripcionComponentsPage, { InscripcionDeleteDialog } from './inscripcion.page-object';
import InscripcionUpdatePage from './inscripcion-update.page-object';
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

describe('Inscripcion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inscripcionComponentsPage: InscripcionComponentsPage;
  let inscripcionUpdatePage: InscripcionUpdatePage;
  let inscripcionDeleteDialog: InscripcionDeleteDialog;
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

  it('should load Inscripcions', async () => {
    await navBarPage.getEntityPage('inscripcion');
    inscripcionComponentsPage = new InscripcionComponentsPage();
    expect(await inscripcionComponentsPage.title.getText()).to.match(/Inscripcions/);

    expect(await inscripcionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([inscripcionComponentsPage.noRecords, inscripcionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(inscripcionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(inscripcionComponentsPage.table);
  });

  it('should load create Inscripcion page', async () => {
    await inscripcionComponentsPage.createButton.click();
    inscripcionUpdatePage = new InscripcionUpdatePage();
    expect(await inscripcionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.inscripcion.home.createOrEditLabel/
    );
    await inscripcionUpdatePage.cancel();
  });

  it('should create and save Inscripcions', async () => {
    await inscripcionComponentsPage.createButton.click();
    await inscripcionUpdatePage.setFechaRegistroInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await inscripcionUpdatePage.getFechaRegistroInput()).to.contain('2001-01-01T02:30');
    const selectedAprobadoInstitucion = await inscripcionUpdatePage.getAprobadoInstitucionInput().isSelected();
    if (selectedAprobadoInstitucion) {
      await inscripcionUpdatePage.getAprobadoInstitucionInput().click();
      expect(await inscripcionUpdatePage.getAprobadoInstitucionInput().isSelected()).to.be.false;
    } else {
      await inscripcionUpdatePage.getAprobadoInstitucionInput().click();
      expect(await inscripcionUpdatePage.getAprobadoInstitucionInput().isSelected()).to.be.true;
    }
    const selectedAprobadoEvento = await inscripcionUpdatePage.getAprobadoEventoInput().isSelected();
    if (selectedAprobadoEvento) {
      await inscripcionUpdatePage.getAprobadoEventoInput().click();
      expect(await inscripcionUpdatePage.getAprobadoEventoInput().isSelected()).to.be.false;
    } else {
      await inscripcionUpdatePage.getAprobadoEventoInput().click();
      expect(await inscripcionUpdatePage.getAprobadoEventoInput().isSelected()).to.be.true;
    }
    await inscripcionUpdatePage.eventoSelectLastOption();
    await inscripcionUpdatePage.proyectoSelectLastOption();
    await inscripcionUpdatePage.delegadoSelectLastOption();
    await waitUntilDisplayed(inscripcionUpdatePage.saveButton);
    await inscripcionUpdatePage.save();
    await waitUntilHidden(inscripcionUpdatePage.saveButton);
    expect(await isVisible(inscripcionUpdatePage.saveButton)).to.be.false;

    expect(await inscripcionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(inscripcionComponentsPage.table);

    await waitUntilCount(inscripcionComponentsPage.records, beforeRecordsCount + 1);
    expect(await inscripcionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Inscripcion', async () => {
    const deleteButton = inscripcionComponentsPage.getDeleteButton(inscripcionComponentsPage.records.last());
    await click(deleteButton);

    inscripcionDeleteDialog = new InscripcionDeleteDialog();
    await waitUntilDisplayed(inscripcionDeleteDialog.deleteModal);
    expect(await inscripcionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.inscripcion.delete.question/
    );
    await inscripcionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(inscripcionDeleteDialog.deleteModal);

    expect(await isVisible(inscripcionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([inscripcionComponentsPage.noRecords, inscripcionComponentsPage.table]);

    const afterCount = (await isVisible(inscripcionComponentsPage.noRecords)) ? 0 : await getRecordsCount(inscripcionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
