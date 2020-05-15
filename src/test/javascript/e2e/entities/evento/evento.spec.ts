import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventoComponentsPage, { EventoDeleteDialog } from './evento.page-object';
import EventoUpdatePage from './evento-update.page-object';
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

describe('Evento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventoComponentsPage: EventoComponentsPage;
  let eventoUpdatePage: EventoUpdatePage;
  let eventoDeleteDialog: EventoDeleteDialog;
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

  it('should load Eventos', async () => {
    await navBarPage.getEntityPage('evento');
    eventoComponentsPage = new EventoComponentsPage();
    expect(await eventoComponentsPage.title.getText()).to.match(/Eventos/);

    expect(await eventoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([eventoComponentsPage.noRecords, eventoComponentsPage.table]);

    beforeRecordsCount = (await isVisible(eventoComponentsPage.noRecords)) ? 0 : await getRecordsCount(eventoComponentsPage.table);
  });

  it('should load create Evento page', async () => {
    await eventoComponentsPage.createButton.click();
    eventoUpdatePage = new EventoUpdatePage();
    expect(await eventoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.evento.home.createOrEditLabel/
    );
    await eventoUpdatePage.cancel();
  });

  it('should create and save Eventos', async () => {
    await eventoComponentsPage.createButton.click();
    await eventoUpdatePage.setNombreInput('nombre');
    expect(await eventoUpdatePage.getNombreInput()).to.match(/nombre/);
    await eventoUpdatePage.setFechaInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eventoUpdatePage.getFechaInicioInput()).to.contain('2001-01-01T02:30');
    await eventoUpdatePage.setFechaFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eventoUpdatePage.getFechaFinInput()).to.contain('2001-01-01T02:30');
    await eventoUpdatePage.setUbicacionInput('ubicacion');
    expect(await eventoUpdatePage.getUbicacionInput()).to.match(/ubicacion/);
    await eventoUpdatePage.ciudadSelectLastOption();
    await eventoUpdatePage.nodoSelectLastOption();
    // eventoUpdatePage.areaConocimientoSelectLastOption();
    await waitUntilDisplayed(eventoUpdatePage.saveButton);
    await eventoUpdatePage.save();
    await waitUntilHidden(eventoUpdatePage.saveButton);
    expect(await isVisible(eventoUpdatePage.saveButton)).to.be.false;

    expect(await eventoComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(eventoComponentsPage.table);

    await waitUntilCount(eventoComponentsPage.records, beforeRecordsCount + 1);
    expect(await eventoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Evento', async () => {
    const deleteButton = eventoComponentsPage.getDeleteButton(eventoComponentsPage.records.last());
    await click(deleteButton);

    eventoDeleteDialog = new EventoDeleteDialog();
    await waitUntilDisplayed(eventoDeleteDialog.deleteModal);
    expect(await eventoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ucentralEventosApplicationApp.evento.delete.question/);
    await eventoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(eventoDeleteDialog.deleteModal);

    expect(await isVisible(eventoDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([eventoComponentsPage.noRecords, eventoComponentsPage.table]);

    const afterCount = (await isVisible(eventoComponentsPage.noRecords)) ? 0 : await getRecordsCount(eventoComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
