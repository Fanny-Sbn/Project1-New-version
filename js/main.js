import { pageLoader } from "./page-loader.js";
import { listenIntroEvents } from "./event-intro-min.js";
import { listenGame1Events } from "./event-game1-min.js";
import { listenGame2Events } from "./event-game2-min.js";
import { listenGame3Events } from "./event-game3-min.js";

// GAME VARS
const states = [
  {
    html: "views/intro.html",
    css: "styles/intro.css",
    js: listenIntroEvents,
  },
  {
    html: "views/game1.html",
    css: "styles/games.css",
    js: listenGame1Events,
  },
  {
    html: "views/game2.html",
    css: "styles/games.css",
    js: listenGame2Events,
  },
  {
    html: "views/game3.html",
    css: "styles/games.css",
    js: listenGame3Events,
  }
];

// INITIAL GAME LOGIC
var index = 0;

function displayView(html) {
  document.getElementById("dynamic-css").href = states[index].css;
  document.getElementById("board").innerHTML = html;
  states[index].js(loadPage); // loadPage va être rappelé
  index++;
}

function loadPage(index) {
  pageLoader(states[index].html, displayView);
}

loadPage(index);



