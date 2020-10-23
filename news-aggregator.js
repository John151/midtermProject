
let bestOrTop = "topstories" //different input if we're looking for the top or best stories
let topStoriesUrl = `https://hacker-news.firebaseio.com/v0/${bestOrTop}.json?print=pretty`

let numberToFetch = 54 //how many stories do you want?
let bucketOfNumbers = [] //array of numbers to fetch news stories
let containersExist = false; //condition to tell us whether we've made our html already
let randomNumber = 0 //this will become a random number

//these will let us find html elements and change them
let topStories = document.querySelector("#top")
let bestStories = document.querySelector("#best")
let jumbotron = document.querySelector(".jumbotron")
let todaysDate = document.querySelector("#todays-date")

let today = new Date().toDateString()
todaysDate.innerHTML = today;

//array of changing backgrounds, a news site should seem like its frequently updating
let backgrounds = ["thomas-charters-zAi2Is48-MA-unsplash",
    "roman-kraft-_Zua2hyvTBk-unsplash",
    "markus-winkler-aId-xYRTlEc-unsplash",
    "luis-cortes-DRL63jJ0L2Y-unsplash",
    "julius-drost-nsrSyI-JUYg-unsplash",
    "jon-sailer-Z0iKshy-8QU-unsplash",
    "hayden-walker-ihiEd-_4TNY-unsplash",
    "billow926-4zUYkqjdwrY-unsplash",
    "adeolu-eletu-E7RLgUjjazc-unsplash",
    "absolutvision-WYd_PkCa1BY-unsplash",
    "matt-popovich-wajusTqz_FI-unsplash",
    "priscilla-du-preez-I79wWVFyhEQ-unsplash",
    "markus-spiske-2G8mnFvH8xk-unsplash",
    "nijwam-swargiary-FPNnKfjcbNU-unsplash",
    "mr-cup-fabien-barral-Mwuod2cm8g4-unsplash",
    "jon-tyson-XmMsdtiGSfo-unsplash",
    "joshua-rawson-harris-KRELIShKxTM-unsplash"
]

//changes the background upon page load
randomNumber = Math.floor(Math.random() * 17);
let backgroundPath = `url("pictures/${backgrounds[randomNumber]}.jpg")`
document.body.style.backgroundImage = backgroundPath;
jumbotron.style.backgroundImage = backgroundPath;


//function changes webpage to best liked stories
//also treats event like a reload, getting new image
bestStories.addEventListener('click', function (){
    bestOrTop = "beststories";
    this.classList.add('btn-lg');
    topStories.classList.remove('btn-lg');

    topStoriesUrl = `https://hacker-news.firebaseio.com/v0/${bestOrTop}.json?print=pretty`

    containersExist = true;

    randomNumber = Math.floor(Math.random() * 17);
    let backgroundPath = `url("pictures/${backgrounds[randomNumber]}.jpg")`
    document.body.style.backgroundImage = backgroundPath;
    jumbotron.style.backgroundImage = backgroundPath;

    bucketOfNumbers.splice(0, bucketOfNumbers.length);

    fetchNewsNumbers();
    getTheStories()
});

topStories.addEventListener('click', function(){
    bestOrTop = "topstories";
    this.classList.add('btn-lg');
    bestStories.classList.remove('btn-lg');

    topStoriesUrl = `https://hacker-news.firebaseio.com/v0/${bestOrTop}.json?print=pretty`

    containersExist = true;

    randomNumber = Math.floor(Math.random() * 17);
    let backgroundPath = `url("pictures/${backgrounds[randomNumber]}.jpg")`
    jumbotron.style.backgroundImage = backgroundPath;
    document.body.style.backgroundImage = backgroundPath;

    bucketOfNumbers.splice(0, bucketOfNumbers.length);

    fetchNewsNumbers();
    getTheStories()
})

//this function gets the ids of the stories
async function fetchNewsNumbers() {
    await fetch(topStoriesUrl).then((res) => {
        return res.json()
    }).then((topStoriesIdNumbers) => {
        for (let i = 0; i < numberToFetch; i++) {
            bucketOfNumbers[i] = topStoriesIdNumbers[i]
        }
    }).catch((err) => {
        console.log('ERROR', err)
    })
    let mainContainer = document.querySelector('#main-container')
    let containerID = ""
    for (let x = 0; x < bucketOfNumbers.length; x++) {
        if (containersExist === false){ //this code only executes if we haven't made the html elements yet
            if (x === 0 || x % 3 === 0) {//i want 1 row for every 3 columns
                let newContainerItem = document.createElement("div");
                newContainerItem.classList.add("row");
                newContainerItem.classList.add("align-items-center");
                containerID = "containerID" + x;
                newContainerItem.id = containerID;
                mainContainer.appendChild(newContainerItem)
            }
            let newNewsItem = document.createElement("div");
            newNewsItem.classList.add("newsStory");
            newNewsItem.classList.add("col-sm");
            newNewsItem.classList.add("mx-2");
            newNewsItem.id = "newsItemId" + x;
//here we're adding the news item elements to the page, these will be filled with titles and links
            let container = document.querySelector("#" + containerID);
            container.appendChild(newNewsItem);
            let storyID = bucketOfNumbers[x]
            let storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`
            getTheStories(storyUrl, newNewsItem.id)
        }
        else {
            newNewsItem = "newsItemId" + x;//newsItemID;
            let storyID = bucketOfNumbers[x]
            let storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`
            getTheStories(storyUrl, newNewsItem)
        }
        }
}
//this function takes arguments about the story ids, some queryselectors and puts it into the html
async function getTheStories(storyUrl, x) {
    await fetch(storyUrl).then((res) => {
        return res.json()
    }).then((storyMetadata) => {
        let emptyNewsSpace = document.querySelector("#" + x)
        let headline = storyMetadata.title
        let url = storyMetadata.url;
        emptyNewsSpace.innerHTML = `<a href=${url}>${headline}</a>`
        ;
        }
    ).catch((err) => {
        console.log('ERROR', err)
    })
}
fetchNewsNumbers()
getTheStories()