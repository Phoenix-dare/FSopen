const listHelper= require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a6k54517f9",
    title: "Big O",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xxOP/KBNHHH8.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]




test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })


describe('total likes',() =>{


test('of empty list is zero',() =>{
    const emptyblog = []
    const result =listHelper.totalLikes(emptyblog)
    expect(result).toBe(0)

})

test('when list contains one item, equals number of likes of that item ',() =>{
    const [singleBlog] = blogs
    const result =listHelper.totalLikes([singleBlog])
    expect(result).toBe(7)

})

test('when list contains two items,returns sum of likes in both',() =>{
    const [first,second] = blogs
    const result =listHelper.totalLikes([first,second])
    expect(result).toBe(12)

})


test('when list contains many items',() =>{
    
    const result =listHelper.totalLikes(blogs)
    expect(result).toBe(48)

})

  })

  
describe('favorite blog',() =>{


    test('of empty list is zero',() =>{
        const emptyblog = []
        const result =listHelper.favouriteBlog(emptyblog)
        expect(result).toBe(0)
    
    })
    
    test('when list contains one item, equals number of likes of that item ',() =>{
      const [singleBlog] = blogs
      const result =listHelper.favouriteBlog([singleBlog])
      expect(result).toEqual(singleBlog)
  
  })
    
    
    test('when list contains two items',() =>{
      const [first,second]=blogs
      const result =listHelper.favouriteBlog([first,second])
      expect(result).toEqual(first)
  
  })
    
    

    test('when list contains many items',() =>{
        
        const result =listHelper.favouriteBlog(blogs)
        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          })
    
    })

      })



      
describe('most blogs',() =>{


  test('of empty list is zero',() =>{
      const emptyblog = []
      const result =listHelper.mostBlogs(emptyblog)
      expect(result).toBe(0)
  
  })
  
  
  test('when list contains one item',() =>{
    const [singleBlog] = blogs
    const result =listHelper.mostBlogs([singleBlog])
    expect(result).toEqual({author:singleBlog.author,
    blogs:1})
  
  })

  test('when list contains many items',() =>{
      
      const result =listHelper.mostBlogs(blogs)
      expect(result).toEqual({"author": "Edsger W. Dijkstra",
      "blogs": 3, })
  
  })

    })