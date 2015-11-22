
var Page = {
	body: function renderBody() {
		var el = React.createElement(App, null);
		var s = ReactDOMServer.renderToStaticMarkup(el);
		return s;
	},
	language: function renderLanguage() {
		return 'en';
	},
	scripts: function renderScripts() {
		return '<script>console.log("blubb");</script>';
	},
	styles: function renderStyles() {
		return '<link rel="stylesheet" type="text/css" href="#">';
	},
	title: function renderTitle() {
		return 'Classic ASP React.js Playground';
	}
};
