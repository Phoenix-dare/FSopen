describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown on homepage', function () {
    cy.contains('login')
    cy.contains('blogs')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      cy.get('.username').type('username')
      cy.get('.password').type('password')
      cy.get('.login-button').click()

      cy.contains('Login Successful')
        .should('have.css', 'color', 'rgb(0, 0, 0)')
        .should('have.css', 'background', 'rgb(144, 238, 144)')
    })

    it('fails with wrong credentials', function() {

      cy.get('.username').type('username')
      cy.get('.password').type('wrongpassword')
      cy.get('.login-button').click()

      cy.contains('Wrong credentials')
        .should('have.css', 'color', 'rgb(0, 0, 0)')
        .should('have.css', 'background', 'rgb(255, 0, 0)')
    })
  })

})