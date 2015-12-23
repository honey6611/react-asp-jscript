
function fetch(url, options) {
	options = options || {};
	
	var method = options.method || 'GET';
	var body = options.body || null;
	var async = !(options.sync || false);
	//var params = options.params || {};
    var xhr;
    var fs;
    var file;
    var responseBuffer;
    
    if (!async && url.indexOf('file://') === 0) {
        responseBuffer = [];
        url = url.replace('file://', '');
        console.log('url:', url);
        fs = Server.createObject('Scripting.FileSystemObject');
        file = fs.openTextFile(url, 1, false);//, -1);
        
        while (!file.atEndOfStream) {
            responseBuffer.push(file.readLine());
        }
    }
    else {
        xhr = new ActiveXObject('MSXML2.ServerXMLHTTP');
        xhr.open(method, url, async);
        xhr.send(body);
    }
	
	return {
		then: function (onSuccess) {
			onSuccess(responseBuffer ? responseBuffer.join('') : xhr.responseText);
		}
	};
}