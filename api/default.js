Response.contentType = 'application/json';
Response.write(JSON.stringify({
    bla: 'plisch',
    path: '' + Request('path')
}));
