
let topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
let numberToFetch = 50 //how many stories do you want?
let bucketOfNumbers = []

//this function gets the ids of the stories
async function fetchNewsNumbers() {
    await fetch(topStoriesUrl).then((res) => {
        return res.json()
    }).then((topStoriesIdNumbers) => {
        for (let i = 0; i < numberToFetch; i++) {
            bucketOfNumbers[i] = topStoriesIdNumbers[i]
            console.log(bucketOfNumbers[i])
        }
    }).catch((err) => {
        console.log('ERROR', err)
    })

    let newsStories = document.querySelectorAll('.newsStory')
    let titles = document.querySelectorAll('.title')
    let urls = document.querySelectorAll('.url')

    for (let x = 0; x < newsStories.length; x++) {
        let title = titles[x]
        let newsStory = newsStories[x]
        let url = urls[x]
        let storyID = bucketOfNumbers[x]
        newsStory.style.backgroundColor = "red"
        let storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`
        //console.log(storyUrl)
        getTheStories(storyUrl, title, url)
    }
}
//this function takes arguments about the story ids, some queryselectors and puts it into the html
async function getTheStories(storyUrl, title, url) {
    await fetch(storyUrl).then((res) => {
        return res.json()
    }).then((storyMetadata) => {
            console.log(storyMetadata)
        title.innerHTML = storyMetadata.title
        url.innerHTML = storyMetadata.url
        }
    ).catch((err) => {
        console.log('ERROR', err)
    })
}
fetchNewsNumbers()
getTheStories()