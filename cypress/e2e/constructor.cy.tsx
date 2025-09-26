describe('Constructor Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
    
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });
    cy.setCookie('accessToken', 'fake-access-token');
    
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
    cy.clearCookies();
  });

  it('should display the main title', () => {
    cy.contains('Соберите бургер').should('be.visible');
  });

  it('should display ingredients sections', () => {
    cy.contains('Булки').should('be.visible');
    cy.contains('Соусы').should('be.visible');
    cy.contains('Начинки').should('be.visible');
  });

  it('should display constructor area', () => {
    cy.get('[data-testid="constructor"]').should('be.visible');
  });

  it('should add ingredient to constructor', () => {
    cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
    cy.get('[data-testid="constructor"]').trigger('drop');
    
    cy.get('[data-testid="constructor"]').should('contain', 'Краторная булка N-200i');
  });

  it('should open ingredient modal on click', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').should('contain', 'Краторная булка N-200i');
  });

  it('should close ingredient modal on close button click', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    
    cy.get('[data-testid="modal-close"]').click();
    
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should close ingredient modal on overlay click', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order successfully', () => {
    cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
    cy.get('[data-testid="constructor"]').trigger('drop');
    
    cy.get('[data-testid="constructor"]').should('contain', 'Краторная булка N-200i');
    
    cy.get('[data-testid="order-button"]').click();
    
    cy.wait('@createOrder');
    
    cy.get('[data-testid="order-modal"]').should('be.visible');
    cy.get('[data-testid="order-modal"]').should('contain', '12345');
    
    cy.get('[data-testid="modal-close"]').click();
    
    cy.get('[data-testid="constructor"]').should('not.contain', 'Краторная булка N-200i');
  });

  it('should show order button', () => {
    cy.contains('Оформить заказ').should('be.visible');
  });
});
