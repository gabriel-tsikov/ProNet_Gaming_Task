describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render the login form', () => {
    cy.get('form').should('exist');
    cy.get('input[formcontrolname="username"]').should('exist');
    cy.get('input[formcontrolname="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should have an invalid form when empty', () => {
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
  });

  it('should have a valid form when filled', () => {
    cy.get('input[formcontrolname="username"]').type('user');
    cy.get('input[formcontrolname="password"]').type('pass');
  });

  it('should submit the form and attempt login', () => {
    cy.get('input[formcontrolname="username"]').type('user');
    cy.get('input[formcontrolname="password"]').type('pass');
    cy.get('button[type="submit"]').click();
  });

  it('should not submit if form is invalid', () => {
    cy.get('input[formcontrolname="username"]').clear();
    cy.get('input[formcontrolname="password"]').clear();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });
});