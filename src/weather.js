export default function fetchData(api) {
	return fetch(api, {method: 'GET'})
	.then(response => response.json())
	.catch(error => console.error("Check credentials!"));
}