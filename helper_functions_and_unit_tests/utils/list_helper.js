const _ = require('lodash')

const dummyTest = (blogs) => {
    return 1
}

const totalLikes = (listOfBlogs) => {
    if(listOfBlogs.length === 0) return 0
    else {
        return listOfBlogs.reduce((acc, item) => {
            return acc + item.likes 
        }, 0)
    }
}

const favoriteBlog = (listOfBlogs) => {
   const likes = listOfBlogs.map(blog => blog.likes)
   const mostLikes = Math.max(...likes)

   if(listOfBlogs.length === 0) {
        return 0
   }
   else if(listOfBlogs.length === 1) {
        const result = listOfBlogs[0]
        return {
            title: result.title,
            author: result.author,
            likes: result.likes
        }
    }
   
   else {
        const result = listOfBlogs.filter(blog => blog.likes === mostLikes)[0]
        return {
            title: result.title,
            author: result.author,
            likes: result.likes
        }
    } 
}

const mostBlogs = (listOfBlogs) => {
    const authorsObj = _.groupBy(listOfBlogs, 'author')
    const authorsTotalBlogs = []
    //push a new object which includes author and authors total blogs to an new array
    for(const [author, authorsBlogs] of Object.entries(authorsObj)) {
        authorsTotalBlogs.push({
            author, 
            blogs: authorsBlogs.length
        })
    }
    //return the author object with most blogs from 'blogsArr' array
    return _.maxBy(authorsTotalBlogs, (author) => author.blogs)
}

const mostLikes = (listOfBlogs) => {
    const authorsObj = _.groupBy(listOfBlogs, 'author')
    const authorsTotalLikes = []
    //push a new object which includes author and authors total likes to an new array
    for(const [author, authorsBlogs] of Object.entries(authorsObj)) {
        authorsTotalLikes.push({
            author, 
            likes: _.sumBy(authorsBlogs, (blog) => blog.likes)
        })
    }
    //return the author object with most likes from 'authorsTotalLikes' array
    return _.maxBy(authorsTotalLikes, (author) => author.likes)
}

module.exports =  {
    dummyTest,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}