describe('Navigation', () => {
    it('should navigate to the archive page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
   
      // Find a link with an href attribute containing "archive" and click it
      cy.get('a[href*="archive"]').click()
   
      // The new url should include "/archive"
      cy.url().should('include', '/archive')
   
      // The new page should contain an h3 with "Archive"
      cy.get('h3').contains('Archive')
    })
});