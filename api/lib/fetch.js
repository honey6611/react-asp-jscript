
function fetch(url, options) {
	options = options || {};
	
	var method = options.method || 'GET';
	var body = options.body || null;
	var async = !(options.sync || false);
	//var params = options.params || {};
	
	var xhr = new ActiveXObject('MSXML2.ServerXMLHTTP');
	xhr.open(method, url, async);
	xhr.send(body);
	
	return {
		then: function (onSuccess) {
			onSuccess(xhr.responseText);
		}
	};
}