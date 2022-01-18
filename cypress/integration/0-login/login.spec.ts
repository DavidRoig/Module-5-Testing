describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should user input has the focus when it clicks on it', () => {
    cy.visit('/');

    cy.findByRole('textbox').click();

    cy.findByRole('textbox').should('have.focus');
  });

  it('should show an alert with a message when type invalid credentials', () => {
    const user = 'wrong';
    const password = 'password';

    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);

    cy.findByRole('button').click();
    cy.findByRole('alert').should('be.visible');
  });

  it('should navigate to main page when credentials are right', () => {
    const user = 'admin';
    const password = 'test';

    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);

    cy.findByRole('button').click();
    cy.url().should('include', 'submodule-list');
  });
});
