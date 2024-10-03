
import order from '../fixtures/order.json';

describe('тестируем приложение', () => {
  beforeEach(() => {
    cy.visit('');
    cy.fixture('constants.json').as('constants');
    cy.fixture('ingredients.json').as('ingredients');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients',
      statusCode: 200
    }).as('getIngredients');
    cy.wait('@getIngredients');
  });
  describe('тестируем управление ингридиентами', () => {
    it('тестируем добавление ингредиента', function () {
      cy.addIngredient(this.constants.ingredientId)
    });
    it('тестируем добавления булки', function () {
      cy.addIngredient(this.constants.bunId)
    });
    it('тестируем удаление ингредиента', function () {
      cy.addIngredient(this.constants.ingredientId)
      const constructorIngredients = cy
        .get(
          `[data-cy-constructor-ingredient='${this.constants.ingredientId}']`
        )
        .should('exist');
      constructorIngredients.find('span.constructor-element__action').click();
    });
  });
  describe('тестируем открытие модальных окон', () => {
    it('тестируем открытие модального окна ингредиента', function () {
      const ingredient = cy
        .get(`[data-cy-add='${this.constants.ingredientId}']`)
        .should('exist');
      ingredient.get(`[data-cy-link='${this.constants.ingredientId}']`).click();
    });
    it('тестируем закрытие модального окна ингридиента по кнопке', function () {
      const ingredient = cy
        .get(`[data-cy-add='${this.constants.ingredientId}']`)
        .should('exist');
      const modalIngredient = ingredient
        .get(`[data-cy-link='${this.constants.ingredientId}']`)
        .click();
      modalIngredient.get(`[${this.constants.closeButton}]`).click();
      modalIngredient.should('not.exist');
    });
    it('тестируем закрытие модального окна ингридиента по оверлею', function () {
      const ingredient = cy
        .get(`[data-cy-add='${this.constants.ingredientId}']`)
        .should('exist');
      ingredient.get(`[data-cy-link='${this.constants.ingredientId}']`).click();
      const modalIngredient = cy.get(`[data-cy-modal-content]`).should('exist');
      cy.get(`[${this.constants.overlay}]`).click('top', { force: true });
      modalIngredient.should('not.exist');
    });
  });
  describe('тестируем пользовательский сценарий', () => {
    it('тестируем авторизацию пользователя', function () {
      const accessToken = this.constants.token;
      cy.setCookie('accessToken', accessToken);
      cy.getCookie('accessToken').should('exist');
      cy.visit('');
      cy.fixture('user.json').as('user');
      cy.intercept('GET', '/api/auth/user', {
        fixture: 'user',
        statusCode: 200
      }).as('getUser');
      cy.wait('@getUser');

      cy.addIngredient(this.constants.ingredientId)
      cy.addIngredient(this.constants.bunId)

      cy.get(`[data-cy='submitOrder']`).click();
      cy.fixture('order.json')
        .as('order')
        .then(() => {
          cy.intercept('POST', '/api/orders', {
            body: order,
            statusCode: 201
          }).as('orderBurger');
          cy.get(`[${this.constants.overlay}]`).click('top', { force: true });

          cy.wait('@orderBurger');
          cy.get('[data-cy=order-number]').should(
            'have.text',
            order.order.number
          );
        });

      cy.get(`[${this.constants.closeButton}]`).click();
      cy.get(
        `[data-cy-constructor-ingredient='${this.constants.ingredientId}']`
      ).should('not.exist');
      cy.get(
        `[data-cy-constructor-ingredient='${this.constants.bunId}']`
      ).should('not.exist');
    });
  });
});
