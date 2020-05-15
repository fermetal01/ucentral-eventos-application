import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PersonaComponentsPage, { PersonaDeleteDialog } from './persona.page-object';
import PersonaUpdatePage from './persona-update.page-object';
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

describe('Persona e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personaComponentsPage: PersonaComponentsPage;
  let personaUpdatePage: PersonaUpdatePage;
  let personaDeleteDialog: PersonaDeleteDialog;
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

  it('should load Personas', async () => {
    await navBarPage.getEntityPage('persona');
    personaComponentsPage = new PersonaComponentsPage();
    expect(await personaComponentsPage.title.getText()).to.match(/Personas/);

    expect(await personaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([personaComponentsPage.noRecords, personaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(personaComponentsPage.noRecords)) ? 0 : await getRecordsCount(personaComponentsPage.table);
  });

  it('should load create Persona page', async () => {
    await personaComponentsPage.createButton.click();
    personaUpdatePage = new PersonaUpdatePage();
    expect(await personaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.persona.home.createOrEditLabel/
    );
    await personaUpdatePage.cancel();
  });

  it('should create and save Personas', async () => {
    await personaComponentsPage.createButton.click();
    await personaUpdatePage.setNombresInput('nombres');
    expect(await personaUpdatePage.getNombresInput()).to.match(/nombres/);
    await personaUpdatePage.setApellidosInput('apellidos');
    expect(await personaUpdatePage.getApellidosInput()).to.match(/apellidos/);
    await personaUpdatePage.setNumeroIdenficacionInput('numeroIdenficacion');
    expect(await personaUpdatePage.getNumeroIdenficacionInput()).to.match(/numeroIdenficacion/);
    await personaUpdatePage.setEmailInput('email');
    expect(await personaUpdatePage.getEmailInput()).to.match(/email/);
    await personaUpdatePage.ciudadSelectLastOption();
    await personaUpdatePage.tipoIdentificacionSelectLastOption();
    await waitUntilDisplayed(personaUpdatePage.saveButton);
    await personaUpdatePage.save();
    await waitUntilHidden(personaUpdatePage.saveButton);
    expect(await isVisible(personaUpdatePage.saveButton)).to.be.false;

    expect(await personaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(personaComponentsPage.table);

    await waitUntilCount(personaComponentsPage.records, beforeRecordsCount + 1);
    expect(await personaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Persona', async () => {
    const deleteButton = personaComponentsPage.getDeleteButton(personaComponentsPage.records.last());
    await click(deleteButton);

    personaDeleteDialog = new PersonaDeleteDialog();
    await waitUntilDisplayed(personaDeleteDialog.deleteModal);
    expect(await personaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.persona.delete.question/);
    await personaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(personaDeleteDialog.deleteModal);

    expect(await isVisible(personaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([personaComponentsPage.noRecords, personaComponentsPage.table]);

    const afterCount = (await isVisible(personaComponentsPage.noRecords)) ? 0 : await getRecordsCount(personaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
