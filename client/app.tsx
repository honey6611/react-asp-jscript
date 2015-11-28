var React;

function App(props) {
	return <div id={props.id} className='pure'>
		A pure component {JSON.stringify(props)}
	</div>;
}

console.log('bla', {blubb: 'plisch'});
//console.log('bla1', {blubb: 'plisch2'});