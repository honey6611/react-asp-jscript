
function fetch(url, options) {
	options = options || {};
	
	var method = options.method || 'GET';
	var data = options.data || null;
	//var params = options.params || {};
	
	var xhr = new ActiveXObject('MSXML2.ServerXMLHTTP');
	xhr.open(method, url, false);
	
	xhr.send(data);
	
	return {
		responseText: xhr.responseText
	};
}