<%@ language="JScript" codepage="65001" enableSessionState=false %>
<script src="lib/shims.min.js" language="JScript" runat="server"></script>
<script language="JavaScript" runat="server">
	
	Response.contentType = 'application/json';
	Response.write(JSON.stringify({
		bla: 'plisch',
		path: '' + Request('path')
	}));
	
</script>