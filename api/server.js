

var __APP_STATE__ = (function () {
	var rootUrl = '';
	var port = 80;
	var baseDir = '' + Request.serverVariables('SCRIPT_NAME');
	var parts;
	
	if (!/\/$/.test(baseDir)) {
		parts = baseDir.split('/');
		baseDir = parts.slice(0, parts.length - 1).join('/');
	}
	
	if (Request.serverVariables('HTTPS') !== 'off') {
		rootUrl = 'http';
	}
	else {
		rootUrl = 'https';
	}
	
	rootUrl += '://' + Request.serverVariables('HTTP_HOST');
	
	port = parseInt(Request.serverVariables('SERVER_PORT'), 10);
	
	if (port !== 80 && port !== 443) {
		rootUrl += ':' + port;
	}
	
	rootUrl += baseDir + '/';
	
	return {
		rootUrl: rootUrl,
		data: JSON.parse(fetch(rootUrl + 'api/init.asp').responseText)
	};
}());

var Page = (function () {
	return {
		isStatic: false,
		body: function renderBody() {
			var el = React.createElement(App, __APP_STATE__);
			return Page.isStatic
				? ReactDOMServer.renderToStaticMarkup(el)
				: ReactDOMServer.renderToString(el);
		},
		language: function renderLanguage() {
			return 'en';
		},
		scripts: function renderScripts() {
			if (Page.isStatic) {
				return '';
			}
			
			return [
				'<script src="node_modules/react/dist/react.js"></script>',
				'<script src="node_modules/react-dom/dist/react-dom.js"></script>',
				'<script src="client/app.js"></script>',
				'<script>',
					'ReactDOM.render(React.createElement(App, ' + JSON.stringify(__APP_STATE__) + '),document.querySelector("#app"));',
				'</script>',
			].join('');
		},
		header: function renderHeader() {
			return [
				'<link rel="stylesheet" type="text/css" href="#">',
			].join('');
		},
		title: function renderTitle() {
			return 'Classic ASP React.js Playground';
		}
	};
}());
