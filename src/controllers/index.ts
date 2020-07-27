// Packages
import fs   = require('fs');

/**
 * Connects all the controllers to the server.
 */
function connectControllers(server, db) {
  return fs.readdirSync(__dirname).forEach(file => {
    const isController = file.slice(-1)  != "~"
      && file.slice(-7)  != "test.js" 
      && file.slice(0,5) != "index";
    if(isController) require(`./${file}`)(server, db);
  }, {});
}

export function init(server, db) { connectControllers(server, db) }
