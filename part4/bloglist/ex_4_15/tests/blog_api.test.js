const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const app = require('../app')
const blogHelper = require('../utils/blog_helper')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of blogHelper.blogs) {
        let newBlog = new Blog(blog)
        await newBlog.save()
    }
})


describe('Blog tests', () => {

    test('get request fetches all blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogHelper.blogs.length)
    })




    test('blog\'s unique identifier is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()

    })

    test('post request creates a new blog entry', async () => {
        const newBlog = {
            title: "Async/Await",
            author: "Harry Potter",
            url: "http://blog.wizard.com/the-boy-who-lived/2016/05/01/Hogwarts.html",
            likes: 2
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
    })


    test('likes defaults to zero if request is missing the likes',async ()=>{
        const newBlog = {
            title: "Async/Await",
            author: "Harry Potter",
            url: "http://blog.wizard.com/the-boy-who-lived/2016/05/01/Hogwarts.html"
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        
        const response = await api.get('/api/blogs')

        expect(response.body[response.body.length-1].likes).toBe(0)
      


    })

})

///////////////////****************///////// */


describe('Blog user adminstration', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('Hogwarts', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })

  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await blogHelper.usersInDb()
  
      const newUser = {
        username: 'Harry Potter',
        name: 'Harry Potter',
        password: 'patronum086',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await blogHelper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })
afterAll(() => {
    mongoose.connection.close()
})