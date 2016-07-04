/**
 * Project 2: Feedr
 * ====
 *
 * See the README.md for instructions
 */

(function() {

  var container = document.querySelector('#container')
  var state = {}

  renderLoading(state, container)


  // Loader State

  function renderLoading(data, into) {
    into.innerHTML = `
      <div id="pop-up" class="loader">
      </div>
    `
  }

})()
