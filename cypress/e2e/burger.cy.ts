import ingredients from '../fixtures/ingredients.json';
import user from '../fixtures/user.json';
import order from '../fixtures/order.json';

describe('тестируем приложение', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 200,
      body: ingredients
    }).as('getIngredients');
  });
  describe('тестируем управление ингридиентами', () => {
    it('тестируем добавление ингредиента', () => {
      cy.wait('@getIngredients');
      const ingredient = cy
        .get(`[data-cy-add='643d69a5c3f7b9001cfa093e']`)
        .should('exist');

      ingredient.find('button').contains('Добавить').click();
    });
    it('тестируем добавления булки', () => {
      cy.wait('@getIngredients');
      const bun = cy
        .get('[data-cy-add=643d69a5c3f7b9001cfa093c]')
        .should('exist');
      bun.find('button').contains('Добавить').click();
    });
    it('тестируем удаление ингредиента', () => {
      cy.wait('@getIngredients');
      const ingredient = cy
        .get(`[data-cy-add='643d69a5c3f7b9001cfa093e']`)
        .should('exist');
      ingredient.find('button').contains('Добавить').click();
      const constructorIngredients = cy
        .get(`[data-cy-constructor-ingredient='643d69a5c3f7b9001cfa093e']`)
        .should('exist');
      constructorIngredients.find('span.constructor-element__action').click();
    });
  });
  describe('тестируем открытие модальных окон', () => {
    it('тестируем открытие модального окна ингредиента', () => {
      cy.wait('@getIngredients');
      const ingredient = cy
        .get(`[data-cy-add='643d69a5c3f7b9001cfa093e']`)
        .should('exist');
      ingredient.get(`[data-cy-link='643d69a5c3f7b9001cfa093e']`).click();
    });
    it('тестируем закрытие модального окна ингридиента по кнопке', () => {
      cy.wait('@getIngredients');
      const ingredient = cy
        .get(`[data-cy-add='643d69a5c3f7b9001cfa093e']`)
        .should('exist');
      const modalIngredient = ingredient
        .get(`[data-cy-link='643d69a5c3f7b9001cfa093e']`)
        .click();
      modalIngredient.get(`[data-cy-close-button]`).click();
      modalIngredient.should('not.exist');
    });
    it('тестируем закрытие модального окна ингридиента по оверлею', () => {
      cy.wait('@getIngredients');
      const ingredient = cy
        .get(`[data-cy-add='643d69a5c3f7b9001cfa093e']`)
        .should('exist');
      ingredient.get(`[data-cy-link='643d69a5c3f7b9001cfa093e']`).click();
      const modalIngredient = cy.get(`[data-cy-modal-content]`).should('exist');
      cy.get(`[data-cy-close-overlay]`).click('top', { force: true });
      modalIngredient.should('not.exist');
    });
  });
  describe('тестируем пользовательский сценарий', () => {
    // it('тестируем вход пользователя', () => {
    //   cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
    //     statusCode: 200,
    //     body: user
    //   }).as('loginUser');
    //   cy.visit('http://localhost:4000/login');
    //   cy.get('[data-cy=email]').type('kerzolys@gmail.com');
    //   cy.get('[data-cy=password]').type('gfhjkm');
    //   cy.get('[data-cy=submit]').click();
    // });
    it('тестируем авторизацию пользователя', () => {
      const accessToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFlOTg2MTE5ZDQ1MDAxYjUwNzllMSIsImlhdCI6MTcyNzYyMzk2NSwiZXhwIjoxNzI3NjI1MTY1fQ.OG3bbO_LvHoStguslF9dG_38Lox1UfPPXSsKWrLASkQ';
      cy.setCookie('accessToken', accessToken);
      cy.getCookie('accessToken').should('exist');
      cy.visit('http://localhost:4000');
      cy.intercept('GET', '/api/auth/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
      cy.wait('@getUser');
      const ingredient = cy
        .get(`[data-cy-add='643d69a5c3f7b9001cfa093e']`)
        .should('exist');

      ingredient.find('button').contains('Добавить').click();
      const bun = cy
        .get('[data-cy-add=643d69a5c3f7b9001cfa093c]')
        .should('exist');
      bun.find('button').contains('Добавить').click();

      cy.get(`[data-cy='submitOrder']`).click();
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
        statusCode: 201,
        body: order
      }).as('orderBurger');
      cy.get(`[data-cy-close-overlay]`).click('top', { force: true });

      cy.wait('@orderBurger');
      cy.get('[data-cy=order-number]').should('have.text', order.order.number);
      cy.get(`[data-cy-close-button]`).click();
      cy.get(
        `[data-cy-constructor-ingredient='643d69a5c3f7b9001cfa093e']`
      ).should('not.exist');
      cy.get(
        `[data-cy-constructor-ingredient='643d69a5c3f7b9001cfa093e']`
      ).should('not.exist');
    });
  });
});
