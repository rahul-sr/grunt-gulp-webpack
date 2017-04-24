import text from './script2.js';
import '../scss/style.scss';
import image1 from './image1.js';
import image2 from './image2.js';
import image3 from './image3.js';

var app = document.getElementById('app');

app.innerHTML = `
	<div id="content">
		<p>
			<h1>Webpack</h1>
			<p>${text}</p>
			${image1}<br>
			${image3}<br>
			${image2}<br>
		</p>
	</div>
`;

if(module.hot){
	module.hot.accept();
}
