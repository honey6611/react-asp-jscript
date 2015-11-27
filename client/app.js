function App(props) {
	return React.createElement(
		'div', { id: props.id, className: 'pure' }, 
		'A pure component',
		JSON.stringify(props)
	);
}


console.log('bla', {blubb: 'plisch'});
//console.log('bla', {blubb: 'plisch'});