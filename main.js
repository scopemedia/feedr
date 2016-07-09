/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

  var container = document.querySelector('#container')
  var state = {loading: true}
  var feedOrigin = '';
  // data.items.item.img
  var data = []


  // Loader State

  function renderLoading(data, into) {
    into.innerHTML = `
      <div id="pop-up" class="loader">
      </div>
    `
  }

  // Call loader

  renderLoading(state, container)

  // console.log(state.loading);

  // if (state.loading === true) {
  //   renderLoading(state, container)
  // } else {
  //   // renderArticles(data, container)
  //   console.log('time to render');
  // }




  function loadRSS(url) {
    fetch(url).then((response) => {
      return response.json()
    }).then((dataAsJson) => {
      // update state
      state = {loading: false}

      // Render Article Template

      if (url === 'https://crossorigin.me/http://mashable.com/stories.json') {
        console.log('Mashable');

        var feed = dataAsJson.hot;

        function renderImage(item) {

            return `
              <section class="featured-image">
                no image
              </section>
              <section class="article-content">
                <a href="${item.link}"><h3>${item.title}</h3></a>
                <h6>${item.channel}</h6>
              </section>
              <section class="impressions">
                ${item.shares.total}
              </section>
              <div class="clearfix"></div>
            `
        }


        // Render Section Module Template

        function renderArticles(data, into) {

          into.innerHTML = `
            <section id="main" class="wrapper">
              ${data.map((item) => {

                // if (item.data.preview.images) {
                //   console.log('yes to image')
                // }
                return `
                  <article class="article">
                    ${renderImage(item)}
                    <div class="clearfix"></div>
                  </article>
                `
              })}
            </section>
          `
        }

        renderArticles(feed, container);

      } else if (url === 'https://www.reddit.com/top.json') {
        console.log('Reddit');
        var feed = dataAsJson.data.children;

        function renderImage(item) {

          // console.log('Image - ' + item.data.preview.images[0].resolutions[0].url);

            return `
              <section class="featured-image">
                no image
              </section>
              <section class="article-content">
                <a href="${item.data.url}"><h3>${item.data.title}</h3></a>
                <h6>${item.data.subreddit}</h6>
              </section>
              <section class="impressions">
                ${item.data.ups}
              </section>
              <div class="clearfix"></div>
            `
        }


        // Render Section Module Template

        function renderArticles(data, into) {

          into.innerHTML = `
            <section id="main" class="wrapper">
              ${data.map((item) => {

                // if (item.data.preview.images) {
                //   console.log('yes to image')
                // }
                return `
                  <article class="article">
                    ${renderImage(item)}
                    <div class="clearfix"></div>
                  </article>
                `
              })}
            </section>
          `
        }

        renderArticles(feed, container);

      }



      // Render Popup

      function popUp(data, into) {

        into.innerHTML = `
          <div id="pop-up">
            <a href="#" class="close-pop-up">X</a>
            <div class="wrapper">
              <h1>Article title here</h1>
              <p>
              Article description/content here.
              </p>
              <a href="#" class="pop-up-action" target="_blank">Read more from source</a>
            </div>
          </div>
        `
      }


      // popUp(feed, popup);

    }).catch(function(err) {
      console.log('Error', err);
    });
  };



  // Call the loadRSS function with desired RSS feed

  loadRSS('https://www.reddit.com/top.json')
  // loadRSS('https://crossorigin.me/http://mashable.com/stories.json')


  // listener for click
  // render state
  // pop-up

//  If nav li a content is 'Reddit' then
//  loadRSS('https://www.reddit.com/top.json')



var switcher = document.querySelectorAll('nav li ul li a');
for (var i = 0; i < switcher.length; i++) {

  // Function that checks text content of link and loads matching RSS feed
  function clickMe() {
    if (this.textContent === 'Reddit') {
      loadRSS('https://www.reddit.com/top.json')
    } else if (this.textContent === 'Mashable') {
      loadRSS('https://crossorigin.me/http://mashable.com/stories.json')
    }
  }

  // Listens for clicks on links and calls function to switch RSS feed
  switcher[i].addEventListener("click", clickMe, false);

}
//



})()
