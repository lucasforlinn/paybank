import { test, expect } from '@playwright/test';
import { get2FCode } from '../support/db.js';

test('Try to login using a invalid 2F code', async ({ page }) => {
  await page.goto('http://paybank-mf-auth:3000/');

  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(user.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();


  for (const digito of user.senha){
    await page.getByRole('button', { name: digito }).click();
  }

  await page.getByRole('button', { name: 'Continuar' }).click();    

  await page.getByRole('textbox', { name: '000000' }).fill('123456');
  await page.getByRole('button', { name: 'Verificar' }).click();

  
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');

});

test('Sucessful login', async ({ page }) => {
  await page.goto('http://paybank-mf-auth:3000/');
  
  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(user.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();


  for (const digito of user.senha){
    await page.getByRole('button', { name: digito }).click();
  }

  await page.getByRole('button', { name: 'Continuar' }).click();    

  await page.waitForTimeout(3000);
  const code = await get2FCode();

  await page.getByRole('textbox', { name: '000000' }).fill(code);
  await page.getByRole('button', { name: 'Verificar' }).click();

  await expect(page.locator('#account-balance')).toHaveText('R$ 5.000,00');
});