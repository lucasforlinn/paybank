import { test, expect } from '@playwright/test';
import { get2FCode } from '../support/db.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashPage } from '../pages/DashPage.js';

test('Try to login using a invalid 2F code', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.acessaPagina();

  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
 
  await loginPage.fill2FCode('123456');

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');

});

test('Sucessful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.acessaPagina();
  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);

  await page.getByRole('heading', {name: 'Verificação em duas etapas'}).waitFor({timeout: 3000});
  const code = await get2FCode();

  await loginPage.fill2FCode(code);
  
  await expect(await dashPage.getBalance()).toHaveText('R$ 5.000,00');
}); 