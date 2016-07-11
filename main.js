/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

  var container = document.querySelector('#container')
  var state = {loading: true}

  // Loader State

  function renderLoading(data, into) {
    into.innerHTML = `
      <div id="pop-up" class="loader">
      </div>
    `
  }


// States
//  - Leading state
//  - Defatult state



  // Call loader

  renderLoading(state, container)

  // console.log(state.loading);

  // if (state.loading === true) {
  //   renderLoading(state, container)
  // } else {
  //   // renderArticles(data, container)
  //   console.log('time to render');
  // }


//  Function takes in Reddit json and returns an object with values

  function redditDataProcessor(dataAsJson) {
    var i = -1
    var articleData = dataAsJson.data.children.map((item) => {
      i++;
      return {
        articleTitle: item.data.title,
        articleDescription: item.title,
        articleCategory: item.data.subreddit,
        articleCount: item.data.ups,
        articleLink: item.data.url,
        articleImage: item.data.thumbnail,
        dataID: i
      }
    })
    return articleData
  }


  //  Function takes in Mashable json and returns an object with values

  function mashableDataProcessor(dataAsJson) {
    var i = -1
    var articleData =  dataAsJson.hot.map((item) => {
      i++;
      return {
        articleTitle: item.title,
        articleDescription: item.content.plain ,
        articleCategory: item.channel,
        articleCount: item.shares.total,
        articleLink: item.link,
        articleImage: item.image,
        dataID: i
      }
    })
    return articleData
  }

  //  Function takes in Mashable json and returns an object with values

    function nytDataProcessor(dataAsJson) {
      var i = -1
      var articleData =  dataAsJson.results.map((item) => {
        i++;
        return {
          articleTitle: item.title,
          articleDescription: item.abstract,
          articleCategory: item.abstract,
          articleCount: '',
          articleLink: 'image',
          articleImage: 'http://placehold.it/200x200',
          dataID: i
        }
      })
      return articleData
    }


  //function takes in json and returns

  function loadRSS(url, dataProcessor) {
    fetch(url).then((response) => {
      renderLoading(state, container)
      return response.json()
    }).then((dataAsJson) => {
      // update state
      state = {loading: false}
      // Render Article Template

      var processedData = dataProcessor(dataAsJson)



// Create function to render Section around articles
//  - Function takes 2 parameters
//    1 - The Processed Data from the feed (Which contains an object with the key value pairs)
//    2 - The location to render into

      function renderArticleList(data, into) {

        into.innerHTML = `
          <section id="main" class="wrapper">
            ${data.map((item) => {
              return `
                <article class="article">
                  ${renderArticle(item)}
                  <div class="clearfix"></div>
                </article>
              `
            }).join('')}
          </section>
        `

// Create Function to render articles
//  - Returns article content with processedDate values

        function renderArticle(item) {

          return `
            <section class="featured-image">
              <img src="${item.articleImage}" alt="" />
            </section>
            <section class="article-content">
              <a href="#0" data-id="${item.dataID}"><h3>${item.articleTitle}</h3></a>
              <h6>${item.articleCategory}</h6>
            </section>
            <section class="impressions">
              ${item.articleCount}
            </section>
            <div class="clearfix"></div>
          `

        }


//   Add listener to the article link which pops up the article modal
//   - Creates a variable for the link
//   - Add the listener whcih calls the trigger on popup

        var popupLink = document.querySelectorAll('.article-content a')

        for (var i = 0; i < popupLink.length; i++) {
          popupLink[i].addEventListener("click", popUpTrigger, false);
        }


        function popUpTrigger() {
          var popupID = this.getAttribute('data-id')
          popUp(processedData[popupID], articlepopup);
        }


      }

// Call function to render Article List
//  - Function takes 2 parameters
//    1 - The Processed Data from the feed (Which contains an object with the key value pairs)
//    2 - The location to render into

      renderArticleList(processedData, container);



//  Create function to Render Popup
//  - Takes in 2 parameters
//    1 - The article data - Needs to be the correct data
//    2 - Container in whcih to inject the html

      function popUp(data, into) {
        into.innerHTML = `
          <div id="pop-up">
            <a href="#" class="close-pop-up">X</a>
            <div class="wrapper">
              <h1>${data.articleTitle}</h1>
              <p>
              ${data.articleDescription}
              </p>
              <a href="${data.articleLink}" class="pop-up-action" target="_blank">Read more from source</a>
            </div>
          </div>
        `


//  Create function to close popup modal
//  - Create a variable for close icon
//  - Add event listener to button
//  - When button is clicked call the popUpClose function which clears the html
//    content f

        var popupCloseBtn = document.querySelector('.close-pop-up')

        popupCloseBtn.addEventListener("click", popUpClose, false);

// Close Popup by injecting empty html into the articlepopup conatiner
        function popUpClose() {
          into.innerHTML = `
          `
        }

      }


    }).catch(function(err) {
      console.log('Error', err);
      alert('Error fetching the RSS feed. Please try again or choose one of the other feeds.')
    });
  };


// listener for click
// render state
// pop-up



var switcher = document.querySelectorAll('nav li ul li a');
    switcherName = document.querySelector('nav ul li a span');

for (var i = 0; i < switcher.length; i++) {

  // Function that checks text content of link and loads matching RSS feed
  function clickMe() {
    if (this.textContent === 'Reddit') {
      updateName('Reddit')
      loadRSS('https://www.reddit.com/top.json', redditDataProcessor)
    } else if (this.textContent === 'Mashable') {
      updateName('Mashable')
      loadRSS('https://crossorigin.me/http://mashable.com/stories.json', mashableDataProcessor)
    } else if (this.textContent === 'The New York Times') {
      updateName('The New York Times')
      loadRSS('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=292be8f89bfb4a96921390a6946d011a', nytDataProcessor)
    }
  }

  // Function to update Feed name in switcher
  function updateName(name) {
    switcherName.innerHTML = name;
  }

  // Listens for clicks on links and calls function to switch RSS feed
  switcher[i].addEventListener("click", clickMe, false);

}
//


// Logo reset
//  - On click of the logo load the default feed.

// Cache the logo variable
var logo = document.querySelector('h1');

// Listen for click on logo
logo.addEventListener("click", tester, false);

// Trigger function to reset feed
function tester() {
  loadRSS('https://www.reddit.com/top.json', redditDataProcessor)
  updateName('Reddit')
}


// Default state for Feedr
//  - Calls the RSS function with a feed url
//  - Updates the feed name in the selector

  loadRSS('https://www.reddit.com/top.json', redditDataProcessor)
  updateName('Reddit')


})()
