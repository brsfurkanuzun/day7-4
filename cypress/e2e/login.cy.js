describe('Login formu', () => {
  const validEmail = 'user@example.com';
  const validPassword = 'Abcd1234!';

  describe('Basarili gonderim', () => {
    it('gecerli form ile Success sayfasina gider', () => {
      cy.visit('/');
      cy.get('[data-cy=email]').type(validEmail).blur();
      cy.get('[data-cy=password]').type(validPassword).blur();
      cy.get('[data-cy=terms]').check();
      cy.get('[data-cy=login-submit]').should('not.be.disabled').click();
      cy.url().should('include', '/success');
      cy.get('[data-cy=success-title]').should('be.visible');
    });
  });

  describe('Hata durumlari', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('gecersiz email: tek hata mesaji, dogru metin, buton disabled', () => {
      cy.get('[data-cy=email]').type('yanlis').blur();
      cy.get('[data-cy=form-error]').should('have.length', 1);
      cy.get('[data-cy=form-error]').should('contain', 'Geçerli bir e-posta');
      cy.get('[data-cy=login-submit]').should('be.disabled');
    });

    it('gecersiz email ve sifre: iki hata, sifre mesaji, buton disabled', () => {
      cy.get('[data-cy=email]').type('bademail').blur();
      cy.get('[data-cy=password]').type('123').blur();
      cy.get('[data-cy=form-error]').should('have.length', 2);
      cy.get('[data-cy=form-error][data-field=password]').should('contain', 'Şifre en az 8 karakter');
      cy.get('[data-cy=login-submit]').should('be.disabled');
    });

    it('email ve sifre dogru, sartlar isaretli degil: buton disabled', () => {
      cy.get('[data-cy=email]').type(validEmail).blur();
      cy.get('[data-cy=password]').type(validPassword).blur();
      cy.get('[data-cy=login-submit]').should('be.disabled');
    });
  });
});
