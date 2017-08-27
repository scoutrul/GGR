import React from 'react';
import Backendless from 'backendless';

const APP_ID = '402AB182-EB78-44E3-FF2F-08B037392D00';
const API_KEY = '2AF3DE22-A4C2-1CAA-FF44-0A4B1FD3FE00';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

Backendless.UserService.login( 'test@test.tt', 'pass', true )
	.then( function( loggedInUser ) {
		// console.log(loggedInUser)
		// console.log(userObjectId, userToken, userObject)

		// Backendless.Data.of( "test" ).save( {text:'savedObject'} )
		//  .then( function( savedObject ) {
		//   console.log(savedObject);
		//   })
		//  .catch( function( error ) {
		//   });
		// Backendless.Data.describe( 'language' )
		//  .then( function( schemaProps ) {
		//  	console.log(schemaProps);
		//   })
		//  .catch( function( error ) {
		//   });

	})
	.catch( function( error ) {
		console.log(error)
	});

	var queryBuilder = Backendless.DataQueryBuilder.create()
		.setRelated( "language_parent")
		.setWhereClause( "name = 'sp'" ); 

	Backendless.Data.of( "location" ).find( queryBuilder )
	 .then( function( res ) {
	 	console.log(res)
	  })
	 .catch( function( error ) {
	  });


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
				<li>connect to the DB as admin user</li>
				<li>- ask for login and pass</li>
				<li>- if this = admin do next </li>
				<li>fetch all tables</li>
				<li>- show tables with content and relations</li>
				<li>map all entaries</li>
				<li>change data field</li>
			</ul>
		</div>
	);
}
