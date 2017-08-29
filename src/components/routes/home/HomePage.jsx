import React from 'react';
import Backendless from 'backendless';

const APP_ID = '402AB182-EB78-44E3-FF2F-08B037392D00';
const API_KEY = '2AF3DE22-A4C2-1CAA-FF44-0A4B1FD3FE00';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

Backendless.UserService.login( 'test@test.tt', 'password', true )
	.then( function( loggedInUser ) {
		console.log(`hello User "${loggedInUser.name}"`)

		var locationStorage = Backendless.Data.of( "location" );
		var whereClause = "name LIKE 'sp'";
		var queryBuilder = Backendless.DataQueryBuilder.create()
			.setRelated( ["location_to_language"] )
			.setWhereClause( whereClause)
			.setRelationsDepth( 2 )
			.setProperties("id, name");

		locationStorage.find( queryBuilder ).then( function( res ) {
					console.log(res)
			})
			.catch(function(err){
				console.log(err)
			})
	})
	.catch(function(err){
		console.log(err)
	})




export default function HomePage() {
	return (
		<div>
			<div>
				Research result: <br/>
				Table "Language": 

			</div>
			<h1>
				Backend + React
			</h1>
			<ul>
				<li>fetch table data</li>
				<li>edit by input, save</li>
			</ul>
		</div>
	);
}
