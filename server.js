/*global Request, Response*/
/*global React, ReactDOM, ReactDOMServer*/
/*global App*/
/*global fetch*/

// Exposing all the exported libraries in the global scope 
Object.keys(window).map(function (key) {
	return key + ' = window.' + key + ';';
}).forEach(eval);

var Page = (function () {
	
	function getRootUrl() {
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
        
        //Response.write(rootUrl + baseDir + '/');
		
		return rootUrl + baseDir + '/';
	}
	
	function requestParam(name, defaultValue) {
		defaultValue = defaultValue || '';
		
		var value = '' + Request(name);
		
		if (value === 'undefined') {
			value = defaultValue;
		}
		
		return value;
	}
	
	var __APP_STATE__ = (function () {
		var path = requestParam('u', '/');
		var session = requestParam('s');
		var rootUrl = getRootUrl();
		var apiUrl = rootUrl + 'api?sid=' + session;
		var dataUrl = apiUrl + '&path=' + path;
		
		var dataText = '';
		fetch(dataUrl, { sync: true }).then(function (responseText) {
			dataText = responseText;
		});
		
		var pkg = { version: 'unspecified' };

        try {
		    fetch('file://' + Server.mapPath('package.json'), { sync: true })
			    .then(function (responseText) {
				    pkg = JSON.parse(responseText);
                });
        }
        catch (e) {
            console.error('' + e);
        }
				
		return {
			api: apiUrl,
			data: JSON.parse(dataText),
			rootUrl: rootUrl,
			session: session,
			version: pkg.version
		};
	}());

	return {
		isStatic: false,
		body: function () {
			var el = React.createElement(App, __APP_STATE__);
			return Page.isStatic
				? ReactDOMServer.renderToStaticMarkup(el)
				: ReactDOMServer.renderToString(el);
		},
		language: function () {
			return 'en';
		},
		scripts: function () {
			if (Page.isStatic) {
				return '';
			}
			
			return [
				'<script src="node_modules/react/dist/react.js"></script>',
				'<script src="node_modules/react-dom/dist/react-dom.js"></script>',
				'<script src="client/app.js"></script>',
				'<script>',
					'ReactDOM.render(',
						'React.createElement(App,' + JSON.stringify(__APP_STATE__),
					'),document.querySelector("#app"));',
				'</script>'
			].join('');
		},
		header: function () {
			return [
				//'<link rel="stylesheet" type="text/css" href="#">',
			].join('');
		},
		title: function () {
			return 'Classic ASP React.js Playground';
		}
	};
}());
