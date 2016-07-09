/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

  var container = document.querySelector('#container')
  var state = {loading: true}

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

      var feed = dataAsJson.data.children;

      // Render Article Template

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
              // console.log('date map - ' + item.data.preview.images[0].resolutions[0].url);
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

    }).catch(function(err) {
      console.log('Error', err);
    });
  };



  // Call the loadRSS function with desired RSS feed

  loadRSS('https://www.reddit.com/top.json')


  // listener for click
  // render state
  // pop-up


})()
