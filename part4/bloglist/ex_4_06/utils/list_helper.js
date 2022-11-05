const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {


    return blogs.length === 0 ? 0 : blogs.reduce((acc, item) => acc + item.likes, 0)

}


const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0]
    } else {
        const mostLiked = blogs.sort((a, b) => b.likes - a.likes)
        return mostLiked[0]
    }
}
const mostBlogs = (blogs) => {
    if (blogs.length == 0){
        return 0
    }
    const authors = blogs.map(item => item.author)

        let maxcount = 0;
        let mostFreq;
        for (let i = 0; i < authors.length; i++) {
            let count = 0;
            for (let j = 0; j < authors.length; j++) {
                if (authors[i] == authors[j])
                    count++;
            }

            if (count > maxcount) {
                maxcount = count;
                mostFreq = authors[i];
            }
        }

        return {
            author:mostFreq,
            blogs:maxcount
            }
    
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}