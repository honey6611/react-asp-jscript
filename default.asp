<%@ language="VBScript" codepage="65001" %>
<script src="server/shims.min.js" language="JScript" runat="server"></script>
<script language="JScript" runat="server">
	(function (console) {
		var slice = [].slice;
		var buffer = [];
		
		console.log = function log() {
			buffer.push(['LOG:'].concat(slice.call(arguments)));
		};
		
		console.error = function error() {
			buffer.push(['ERROR:'].concat(slice.call(arguments)));
		};
		
		console.info = function info() {
			buffer.push(['INFO:'].concat(slice.call(arguments)));
		};
		
		console.warn = function warn() {
			buffer.push(['WARN:'].concat(slice.call(arguments)));
		};
		
		console.flush = function flush() {
			if (buffer.length) {
				Response.write('<pre>');
				buffer.forEach(function (args, i) {
					Response.write((i+1) + ') -> ' + JSON.stringify(args, null, 2) + '\n');
				});
				Response.write('</pre>');
			}
		};
	}(console = {}));
</script>
<script src="server/react.js" language="JScript" runat="server"></script>
<script src="server/react-dom.js" language="JScript" runat="server"></script>
<script src="client/app.js" language="JScript" runat="server"></script>
<script src="server/index.js" language="JScript" runat="server"></script>
<!DOCTYPE html>
<html lang="<%= Page.language() %>">
<head>
	<title><%= Page.title() %></title>
	<%= Page.styles() %>
</head>
<body>
	<div id="app"><%= Page.body() %></div>
	<%= console.flush() %>
	<%= Page.scripts() %>
</body>
</html>