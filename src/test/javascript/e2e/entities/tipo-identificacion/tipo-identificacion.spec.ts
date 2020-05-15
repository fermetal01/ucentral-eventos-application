import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TipoIdentificacionComponentsPage, { TipoIdentificacionDeleteDialog } from './tipo-identificacion.page-object';
import TipoIdentificacionUpdatePage from './tipo-identificacion-update.page-object';
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

describe('TipoIdentificacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoIdentificacionComponentsPage: TipoIdentificacionComponentsPage;
  let tipoIdentificacionUpdatePage: TipoIdentificacionUpdatePage;
  let tipoIdentificacionDeleteDialog: TipoIdentificacionDeleteDialog;
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

  it('should load TipoIdentificacions', async () => {
    await navBarPage.getEntityPage('tipo-identificacion');
    tipoIdentificacionComponentsPage = new TipoIdentificacionComponentsPage();
    expect(await tipoIdentificacionComponentsPage.title.getText()).to.match(/Tipo Identificacions/);

    expect(await tipoIdentificacionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tipoIdentificacionComponentsPage.noRecords, tipoIdentificacionComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tipoIdentificacionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tipoIdentificacionComponentsPage.table);
  });

  it('should load create TipoIdentificacion page', async () => {
    await tipoIdentificacionComponentsPage.createButton.click();
    tipoIdentificacionUpdatePage = new TipoIdentificacionUpdatePage();
    expect(await tipoIdentificacionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.tipoIdentificacion.home.createOrEditLabel/
    );
    await tipoIdentificacionUpdatePage.cancel();
  });

  it('should create and save TipoIdentificacions', async () => {
    await tipoIdentificacionComponentsPage.createButton.click();
    await tipoIdentificacionUpdatePage.setNombresInput('nombres');
    expect(await tipoIdentificacionUpdatePage.getNombresInput()).to.match(/nombres/);
    await tipoIdentificacionUpdatePage.setCodigoInput('codigo');
    expect(await tipoIdentificacionUpdatePage.getCodigoInput()).to.match(/codigo/);
    await waitUntilDisplayed(tipoIdentificacionUpdatePage.saveButton);
    await tipoIdentificacionUpdatePage.save();
    await waitUntilHidden(tipoIdentificacionUpdatePage.saveButton);
    expect(await isVisible(tipoIdentificacionUpdatePage.saveButton)).to.be.false;

    expect(await tipoIdentificacionComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tipoIdentificacionComponentsPage.table);

    await waitUntilCount(tipoIdentificacionComponentsPage.records, beforeRecordsCount + 1);
    expect(await tipoIdentificacionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TipoIdentificacion', async () => {
    const deleteButton = tipoIdentificacionComponentsPage.getDeleteButton(tipoIdentificacionComponentsPage.records.last());
    await click(deleteButton);

    tipoIdentificacionDeleteDialog = new TipoIdentificacionDeleteDialog();
    await waitUntilDisplayed(tipoIdentificacionDeleteDialog.deleteModal);
    expect(await tipoIdentificacionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /ucentralEventosApplicationApp.tipoIdentificacion.delete.question/
    );
    await tipoIdentificacionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tipoIdentificacionDeleteDialog.deleteModal);

    expect(await isVisible(tipoIdentificacionDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tipoIdentificacionComponentsPage.noRecords, tipoIdentificacionComponentsPage.table]);

    const afterCount = (await isVisible(tipoIdentificacionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tipoIdentificacionComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
