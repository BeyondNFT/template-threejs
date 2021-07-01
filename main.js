/**
 * Preload function to fetch data etc...
 * You should also be able to do calls to API etc...
 */
function preload() {
	// current owner (if known, else default to 0x0)
	const owner = beyondHelpers.get('owner', '0x0000000000000000000000000000000000000000');
	// viewer parameter (only if we know about it, else empty so we default to OxO)
	const viewer = beyondHelpers.get('viewer', '0x0000000000000000000000000000000000000000');
	// tokenURI
	const tokenURI = beyondHelpers.get('tokenURI', './__metadata.json');

	// locally metadata does not exist, you can set a default here if you need it
	let creator = '0x0000000000000000000000000000000000000000';
	let metadata = {
		creator
	};

	try {
		metadata = fetch(tokenURI)
		.then(res => res.json());
	} catch(e) {}

	return {
		owner,
		viewer,
		creator,
		metadata,
	};
}


(async () => {

	const meta = await preload();

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	const animate = function () {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	};

	animate();
})()