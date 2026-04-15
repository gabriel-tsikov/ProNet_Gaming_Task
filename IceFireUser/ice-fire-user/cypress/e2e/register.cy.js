describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/register');
    });
  
    it('should render the register form', () => {
      cy.get('form').should('exist');
      cy.get('input[formcontrolname="username"]').should('exist');
      cy.get('input[formcontrolname="password"]').should('exist');
      cy.get('input[formcontrolname="confirmPassword"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should have an invalid form when empty', () => {
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/register');
    });
  
    it('should not submit if passwords do not match', () => {
      cy.get('input[formcontrolname="username"]').type('user');
      cy.get('input[formcontrolname="password"]').type('pass');
      cy.get('input[formcontrolname="confirmPassword"]').type('fail');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/register');
    });
  
    it('should submit the form and attempt register', () => {
      cy.get('input[formcontrolname="username"]').type('user');
      cy.get('input[formcontrolname="password"]').type('pass');
      cy.get('input[formcontrolname="confirmPassword"]').type('pass');
      cy.get('button[type="submit"]').click();
    });
  });