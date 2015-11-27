<script src="lib/shims.min.js" language="JScript" runat="server"></script>
<script language="JScript" runat="server">
	Response.contentType = 'application/json';
	Response.write(JSON.stringify({
		bla: 'plisch'
	}));
</script>