var title = require('./script1.js');
var text = require('./script3.js');

var heading = document.getElementById('heading'),
    content = document.getElementById('content');

heading.innerHTML = title;
content.innerHTML = text;
