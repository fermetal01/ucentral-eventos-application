import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProyectoComponentsPage, { ProyectoDeleteDialog } from './proyecto.page-object';
import ProyectoUpdatePage from './proyecto-update.page-object';
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

describe('Proyecto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proyectoComponentsPage: ProyectoComponentsPage;
  let proyectoUpdatePage: ProyectoUpdatePage;
  let proyectoDeleteDialog: ProyectoDeleteDialog;
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

  it('should load Proyectos', async () => {
    await navBarPage.getEntityPage('proyecto');
    proyectoComponentsPage = new ProyectoComponentsPage();
    expect(await proyectoComponentsPage.title.getText()).to.match(/Proyectos/);

    expect(await proyectoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([proyectoComponentsPage.noRecords, proyectoComponentsPage.table]);

    beforeRecordsCount = (await isVisible(proyectoComponentsPage.noRecords)) ? 0 : await getRecordsCount(proyectoComponentsPage.table);
  });

  it('should load create Proyecto page', async () => {
    await proyectoComponentsPage.createButton.click();
    proyectoUpdatePage = new ProyectoUpdatePage();
    expect(await proyectoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.proyecto.home.createOrEditLabel/
    );
    await proyectoUpdatePage.cancel();
  });

  it('should create and save Proyectos', async () => {
    await proyectoComponentsPage.createButton.click();
    await proyectoUpdatePage.setNombreInput('nombre');
    expect(await proyectoUpdatePage.getNombreInput()).to.match(/nombre/);
    await proyectoUpdatePage.setFechaRegistroInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await proyectoUpdatePage.getFechaRegistroInput()).to.contain('2001-01-01T02:30');
    await proyectoUpdatePage.categoriaSelectLastOption();
    await proyectoUpdatePage.areaConocimientoSelectLastOption();
    await proyectoUpdatePage.semilleroSelectLastOption();
    await waitUntilDisplayed(proyectoUpdatePage.saveButton);
    await proyectoUpdatePage.save();
    await waitUntilHidden(proyectoUpdatePage.saveButton);
    expect(await isVisible(proyectoUpdatePage.saveButton)).to.be.false;

    expect(await proyectoComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(proyectoComponentsPage.table);

    await waitUntilCount(proyectoComponentsPage.records, beforeRecordsCount + 1);
    expect(await proyectoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Proyecto', async () => {
    const deleteButton = proyectoComponentsPage.getDeleteButton(proyectoComponentsPage.records.last());
    await click(deleteButton);

    proyectoDeleteDialog = new ProyectoDeleteDialog();
    await waitUntilDisplayed(proyectoDeleteDialog.deleteModal);
    expect(await proyectoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.proyecto.delete.question/
    );
    await proyectoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(proyectoDeleteDialog.deleteModal);

    expect(await isVisible(proyectoDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([proyectoComponentsPage.noRecords, proyectoComponentsPage.table]);

    const afterCount = (await isVisible(proyectoComponentsPage.noRecords)) ? 0 : await getRecordsCount(proyectoComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
