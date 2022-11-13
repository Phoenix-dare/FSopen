const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const app = require('../app')
const blogHelper = require('../utils/blog_helper')

const api = supertest(app)
let token = null
beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('Hogwarts', 10)
    const user = new User({ username: 'root', passwordHash })
    const userForToken = { username: 'root', id: user.id }
    token = jwt.sign(userForToken, process.env.SECRET)
    await user.save()
    return token
})

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

    test("blog's unique identifier is named id", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('post request creates a new blog entry', async () => {
        const blogsInitially = await api.get('/api/blogs')

        const newBlog = {
            title: 'Async/Await',
            author: 'Harry Potter',
            url: 'http://blog.wizard.com/the-boy-who-lived/2016/05/01/Hogwarts.html',
            likes: 2,
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsFinally = await api.get('/api/blogs')

        expect(blogsFinally.body.length).toBe(blogsInitially.body.length + 1)
    })

    test('attempting to create a blog without authorization fails', async () => {
        const newBlog = {
            title: 'Async/Await',
            author: 'Harry Potter',
            url: 'http://blog.wizard.com/the-boy-who-lived/2016/05/01/Hogwarts.html',
            likes: 2,
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('token missing or invalid')
    })

    test('likes defaults to zero if request is missing the likes', async () => {
        const newBlog = {
            title: 'Async/Await',
            author: 'Harry Potter',
            url: 'http://blog.wizard.com/the-boy-who-lived/2016/05/01/Hogwarts.html',
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body[response.body.length - 1].likes).toBe(0)
    })

    test('blogs with empty fields in title and url is considered invalid', async () => {
        const newBlog = {
            title: '',
            author: 'Harry Potter',
            url: '',
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.message).toContain(
            'title and url should be provided'
        )
    })
})

///////////////////****************///////// */

describe('Blog user adminstration', () => {
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

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('invalid username with  characters less than 3 ,throws an error', async () => {
        const usersAtStart = await blogHelper.usersInDb()

        const newUser = {
            username: 'Ha',
            name: 'harry',
            password: 'gryffindor',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toMatch(
            'Username must be atleast 3 characters'
        )

        const usersAtEnd = await blogHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('invalid password with  characters less than 3 ,throws an error', async () => {
        const usersAtStart = await blogHelper.usersInDb()

        const newUser = {
            username: 'Harry',
            name: 'harrry',
            password: 'go',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toMatch(
            'Password must be atleast 3 characters'
        )

        const usersAtEnd = await blogHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('invalid credentials with  no username and password throws an error', async () => {
        const usersAtStart = await blogHelper.usersInDb()

        const newUser = {
            username: '',
            name: 'harrry',
            password: '',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toMatch(
            'username and password are required'
        )

        const usersAtEnd = await blogHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await blogHelper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'admin',
            password: '12344',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toMatch('username must be unique')

        const usersAtEnd = await blogHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
