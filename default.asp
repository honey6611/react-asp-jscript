<%@ language="VBScript" codepage="65001" enableSessionState=false %>
<script src="api/lib/shims.min.js" language="JScript" runat="server"></script>
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
<script src="api/lib/react.js" language="JScript" runat="server"></script>
<script src="api/lib/react-dom.js" language="JScript" runat="server"></script>
<script src="client/app.js" language="JScript" runat="server"></script>
<script src="api/lib/fetch.js" language="JScript" runat="server"></script>
<script src="api/server.js" language="JScript" runat="server"></script>
<script language="JScript" runat="server">Page.isStatic = true;</script>
<% Response.contentType = "html" %><!DOCTYPE html><html lang="<%= Page.language() %>"><head><meta charset="utf-8"><title><%= Page.title() %></title><%= Page.header() %></head><body><div id="app"><%= Page.body() %></div><%= console.flush() %><%= Page.scripts() %></body></html>