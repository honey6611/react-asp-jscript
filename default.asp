<%@ language="VBScript" codepage="65001" enableSessionState=false %>
<script src="api/lib/shims.min.js" language="JScript" runat="server"></script>
<script src="node_modules/react/dist/react.js" language="JScript" runat="server"></script>
<script src="node_modules/react-dom/dist/react-dom.js" language="JScript" runat="server"></script>
<script src="node_modules/react-dom/dist/react-dom-server.js" language="JScript" runat="server"></script>
<script src="client/app.js" language="JScript" runat="server"></script>
<script src="api/lib/fetch.js" language="JScript" runat="server"></script>
<script src="api/server.js" language="JScript" runat="server"></script>
<script language="JScript" runat="server">Page.isStatic = true;</script>
<% Response.contentType = "html" %><!DOCTYPE html><html lang="<%= Page.language() %>"><head><meta charset="utf-8"><title><%= Page.title() %></title><%= Page.header() %></head><body><div id="app"><%= Page.body() %></div><%= console.flush() %><%= Page.scripts() %></body></html>