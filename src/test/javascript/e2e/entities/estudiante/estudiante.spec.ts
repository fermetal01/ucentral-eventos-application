import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EstudianteComponentsPage, { EstudianteDeleteDialog } from './estudiante.page-object';
import EstudianteUpdatePage from './estudiante-update.page-object';
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

describe('Estudiante e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estudianteComponentsPage: EstudianteComponentsPage;
  let estudianteUpdatePage: EstudianteUpdatePage;
  let estudianteDeleteDialog: EstudianteDeleteDialog;
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

  it('should load Estudiantes', async () => {
    await navBarPage.getEntityPage('estudiante');
    estudianteComponentsPage = new EstudianteComponentsPage();
    expect(await estudianteComponentsPage.title.getText()).to.match(/Estudiantes/);

    expect(await estudianteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([estudianteComponentsPage.noRecords, estudianteComponentsPage.table]);

    beforeRecordsCount = (await isVisible(estudianteComponentsPage.noRecords)) ? 0 : await getRecordsCount(estudianteComponentsPage.table);
  });

  it('should load create Estudiante page', async () => {
    await estudianteComponentsPage.createButton.click();
    estudianteUpdatePage = new EstudianteUpdatePage();
    expect(await estudianteUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.estudiante.home.createOrEditLabel/
    );
    await estudianteUpdatePage.cancel();
  });

  it('should create and save Estudiantes', async () => {
    await estudianteComponentsPage.createButton.click();
    await estudianteUpdatePage.setCarreraInput('carrera');
    expect(await estudianteUpdatePage.getCarreraInput()).to.match(/carrera/);
    await estudianteUpdatePage.personaSelectLastOption();
    await estudianteUpdatePage.programaSelectLastOption();
    // estudianteUpdatePage.proyectoSelectLastOption();
    await waitUntilDisplayed(estudianteUpdatePage.saveButton);
    await estudianteUpdatePage.save();
    await waitUntilHidden(estudianteUpdatePage.saveButton);
    expect(await isVisible(estudianteUpdatePage.saveButton)).to.be.false;

    expect(await estudianteComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(estudianteComponentsPage.table);

    await waitUntilCount(estudianteComponentsPage.records, beforeRecordsCount + 1);
    expect(await estudianteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Estudiante', async () => {
    const deleteButton = estudianteComponentsPage.getDeleteButton(estudianteComponentsPage.records.last());
    await click(deleteButton);

    estudianteDeleteDialog = new EstudianteDeleteDialog();
    await waitUntilDisplayed(estudianteDeleteDialog.deleteModal);
    expect(await estudianteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.estudiante.delete.question/
    );
    await estudianteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(estudianteDeleteDialog.deleteModal);

    expect(await isVisible(estudianteDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([estudianteComponentsPage.noRecords, estudianteComponentsPage.table]);

    const afterCount = (await isVisible(estudianteComponentsPage.noRecords)) ? 0 : await getRecordsCount(estudianteComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
