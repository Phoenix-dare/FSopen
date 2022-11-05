const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
       
    
return blogs.length === 0 ? 0 : blogs.reduce((acc, item) => acc + item.likes, 0)

}


const favouriteBlog = (blogs) => {
    if(blogs.length === 0 ){
        return 0
    } else if(blogs.length === 1){
        return blogs[0]
    } else {
    const mostLiked= blogs.sort((a,b) => b.likes - a.likes)
    return mostLiked[0]
    }
}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}