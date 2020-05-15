import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProyectoCategoriaComponentsPage, { ProyectoCategoriaDeleteDialog } from './proyecto-categoria.page-object';
import ProyectoCategoriaUpdatePage from './proyecto-categoria-update.page-object';
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

describe('ProyectoCategoria e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proyectoCategoriaComponentsPage: ProyectoCategoriaComponentsPage;
  let proyectoCategoriaUpdatePage: ProyectoCategoriaUpdatePage;
  let proyectoCategoriaDeleteDialog: ProyectoCategoriaDeleteDialog;
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

  it('should load ProyectoCategorias', async () => {
    await navBarPage.getEntityPage('proyecto-categoria');
    proyectoCategoriaComponentsPage = new ProyectoCategoriaComponentsPage();
    expect(await proyectoCategoriaComponentsPage.title.getText()).to.match(/Proyecto Categorias/);

    expect(await proyectoCategoriaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([proyectoCategoriaComponentsPage.noRecords, proyectoCategoriaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(proyectoCategoriaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(proyectoCategoriaComponentsPage.table);
  });

  it('should load create ProyectoCategoria page', async () => {
    await proyectoCategoriaComponentsPage.createButton.click();
    proyectoCategoriaUpdatePage = new ProyectoCategoriaUpdatePage();
    expect(await proyectoCategoriaUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.proyectoCategoria.home.createOrEditLabel/
    );
    await proyectoCategoriaUpdatePage.cancel();
  });

  it('should create and save ProyectoCategorias', async () => {
    await proyectoCategoriaComponentsPage.createButton.click();
    await proyectoCategoriaUpdatePage.setNombreInput('nombre');
    expect(await proyectoCategoriaUpdatePage.getNombreInput()).to.match(/nombre/);
    await waitUntilDisplayed(proyectoCategoriaUpdatePage.saveButton);
    await proyectoCategoriaUpdatePage.save();
    await waitUntilHidden(proyectoCategoriaUpdatePage.saveButton);
    expect(await isVisible(proyectoCategoriaUpdatePage.saveButton)).to.be.false;

    expect(await proyectoCategoriaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(proyectoCategoriaComponentsPage.table);

    await waitUntilCount(proyectoCategoriaComponentsPage.records, beforeRecordsCount + 1);
    expect(await proyectoCategoriaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ProyectoCategoria', async () => {
    const deleteButton = proyectoCategoriaComponentsPage.getDeleteButton(proyectoCategoriaComponentsPage.records.last());
    await click(deleteButton);

    proyectoCategoriaDeleteDialog = new ProyectoCategoriaDeleteDialog();
    await waitUntilDisplayed(proyectoCategoriaDeleteDialog.deleteModal);
    expect(await proyectoCategoriaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.proyectoCategoria.delete.question/
    );
    await proyectoCategoriaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(proyectoCategoriaDeleteDialog.deleteModal);

    expect(await isVisible(proyectoCategoriaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([proyectoCategoriaComponentsPage.noRecords, proyectoCategoriaComponentsPage.table]);

    const afterCount = (await isVisible(proyectoCategoriaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(proyectoCategoriaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
