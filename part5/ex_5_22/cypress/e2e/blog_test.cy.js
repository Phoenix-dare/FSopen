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


    /////////******~~~~~~~******////////////////////

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'username', password: 'password' })

        cy.createBlog({
          title:'Testing with cypress',
          author:'user',
          url:'example.com',
          likes:0
        })

      })

      it('A blog can be created by logged-in user',  function() {
        cy.createBlog({
          title:'Testing with cypress',
          author:'user2',
          url:'example.com'
        })
        cy.contains('Testing with cypress')
        cy.contains('by user')
        cy.contains('Show more').click()
        cy.contains('link:-example.com')
      })

      it('user can like blog posts', function () {

        cy.contains('Testing with cypress').parent().find('button').as('submitbutton')
        cy.get('@submitbutton').click()
        cy.get('.likebutton').click()
        cy.contains('likes:1')

      })

      it('a logged in user can delete his/her own post',function () {

        cy.contains('Testing with cypress').parent().find('button').as('submitbutton')
        cy.get('@submitbutton').click()
        cy.get('.blog-container').should('contain','delete')
        cy.get('.deletebutton').click()
      })
      describe('sort by likes',function () {
        beforeEach(function (){
          cy.login({ username: 'username', password: 'password' })

          cy.createBlog({
            title:'Testing with cypress',
            author:'user',
            url:'example.com',
            likes:100
          })
          cy.createBlog({
            title:'Testing with cypress-most likes',
            author:'user',
            url:'example.com',
            likes:170
          })
          cy.createBlog({
            title:'Testing with cypress-least likes',
            author:'user',
            url:'example.com',
            likes:10
          })
          cy.visit('http://localhost:3000')
        })

        it('blogs can be sorted by likes',function () {


          cy.get('.blogs').eq(0).should('contain', 'Testing with cypress-most likes')
          cy.get('.blogs').eq(2).should('contain', 'Testing with cypress-least likes')


        })

      })

    })
    ////////****^^^^^^****************~~~~~~~~^^^^^^^ */




  })


})



