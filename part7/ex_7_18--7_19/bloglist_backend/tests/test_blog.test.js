const listHelper = require('../utils/list_helper')
const blogHelper = require('../utils/blog_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

//////////////////

describe('total likes', () => {
    test('of empty list is zero', () => {
        const emptyblog = []
        const result = listHelper.totalLikes(emptyblog)
        expect(result).toBe(0)
    })

    test('when list contains one item, equals number of likes of that item ', () => {
        const [singleBlog] = blogHelper.blogs
        const result = listHelper.totalLikes([singleBlog])
        expect(result).toBe(7)
    })

    test('when list contains two items,returns sum of likes in both', () => {
        const [first, second] = blogHelper.blogs
        const result = listHelper.totalLikes([first, second])
        expect(result).toBe(12)
    })

    test('when list contains many items', () => {
        const result = listHelper.totalLikes(blogHelper.blogs)
        expect(result).toBe(36)
    })
})

/////////////////////////////

describe('favorite blog', () => {
    test('of empty list is zero', () => {
        const emptyblog = []
        const result = listHelper.favouriteBlog(emptyblog)
        expect(result).toBe(0)
    })

    test('when list contains one item', () => {
        const [singleBlog] = blogHelper.blogs
        const result = listHelper.favouriteBlog([singleBlog])
        expect(result).toEqual(singleBlog)
    })

    test('when list contains two items', () => {
        const [first, second] = blogHelper.blogs
        const result = listHelper.favouriteBlog([first, second])
        expect(result).toEqual(first)
    })

    test('when list contains many items', () => {
        const result = listHelper.favouriteBlog(blogHelper.blogs)
        expect(result).toEqual({
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0,
        })
    })
})

describe('most blogs', () => {
    test('of empty list is zero', () => {
        const emptyblog = []
        const result = listHelper.mostBlogs(emptyblog)
        expect(result).toBe(0)
    })

    test('when list contains one item', () => {
        const [singleBlog] = blogHelper.blogs
        const result = listHelper.mostBlogs([singleBlog])
        expect(result).toEqual({ author: singleBlog.author, blogs: 1 })
    })
    test('when list contains many items', () => {
        const result = listHelper.mostBlogs(blogHelper.blogs)
        expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
})
///////////////////////

describe('most liked', () => {
    test('of empty list is zero', () => {
        const emptyblog = []
        const result = listHelper.mostLikes(emptyblog)
        expect(result).toBe(0)
    })

    test('when list contains one item', () => {
        const [singleBlog] = blogHelper.blogs
        const result = listHelper.mostLikes([singleBlog])
        expect(result).toEqual({
            author: singleBlog.author,
            totalLikes: singleBlog.likes,
        })
    })
    test('when list contains many items', () => {
        const result = listHelper.mostLikes(blogHelper.blogs)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', totalLikes: 17 })
    })
})
