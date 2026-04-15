describe('Houses List Page', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYnJpZWwiLCJpYXQiOjE3NzYxOTc0NTksImV4cCI6MTc3NjIwMTA1OX0.san4dXCNMeSnMJE4C3F3-sWtSJ_5_nLuFil-aoAys28';

  beforeEach(() => {
    window.localStorage.setItem('jwt_token', token);
    cy.visit('/houses');
  });

  it('should render the houses list', () => {
    cy.contains('h2', 'All Houses').should('be.visible');
    cy.get('app-house-card').should('have.length.greaterThan', 0);
  });

  it('should filter houses by search', () => {
    cy.get('input[placeholder="Search by house name…"]')
      .should('be.visible')
      .clear()
      .type('stark');

    cy.get('app-house-card').should(($cards) => {
      expect($cards.length).to.be.greaterThan(0);

      const text = $cards.text().toLowerCase();
      expect(text).to.include('stark');
    });
  });

  it('should add and remove a favorite', () => {
    cy.get('app-house-card')
      .first()
      .find('button')
      .click();

    cy.contains('Favorites').click();

    cy.get('app-house-card')
      .should('have.length.greaterThan', 0);

    cy.get('app-house-card')
      .first()
      .find('button')
      .click();

    cy.contains('No favorites yet.').should('be.visible');
  });

  it('should paginate', () => {
    cy.contains('button', 'Next').click();

    cy.contains(/Page\s*2/i).should('be.visible');

    cy.contains('button', 'Prev').click();

    cy.contains(/Page\s*1/i).should('be.visible');
  });

  it('should add a house to favorites from list and remove it from favorites page', () => {
    cy.get('app-house-card')
      .first()
      .find('button')
      .click();

    cy.contains('Favorites').click();

    cy.get('app-house-card')
      .should('have.length.greaterThan', 0);

    cy.get('app-house-card')
      .first()
      .find('button')
      .click();

    cy.contains('No favorites yet.').should('be.visible');
  });
});