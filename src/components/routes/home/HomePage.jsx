import React, { Component } from 'react';
import Backendless from 'backendless';

const APP_ID = '402AB182-EB78-44E3-FF2F-08B037392D00';
const API_KEY = '2AF3DE22-A4C2-1CAA-FF44-0A4B1FD3FE00';
Backendless.initApp(APP_ID, API_KEY);


const Language = ({language, onClick}) => (
	<button onClick={() => onClick(language)}>{language}</button>
)
const Locations = ({setLocation, onClick}) => (
	<button onClick={() => onClick(setLocation)}>{setLocation}</button>
)
const Pages = ({setPage, onClick}) => (
	<button onClick={() => onClick(setPage)}>{setPage}</button>
)


export default class HomePage extends Component {
	constructor(props) {super(props)}
	state = {
			adminUser: null,
			currentLanguage: "en",
			languages: [],
			currentLocation: "Jamaica",
			locations: [],
			navigation: [],
			currentPage: "home",
		}

	componentDidMount(){
		this.backendlessGetLocations()
		this.backendlessUserLogin()
		this.backendlessNavigation()
	}

	componentDidUpdate(){
		console.log(this.state)
	}

	backendlessNavigation(){
		Backendless.Data.of("navigation").find()
			.then((res) => {
				const navigation = res.map(({name}) => name)
				this.setState({navigation})
			})
	}

	backendlessUserLogin(login = 'test@test.tt', password = 'password'){ // TD login form
		Backendless.UserService.login(login, password, true)
			.then((loggedInUser) => {
				this.setState({adminUser: loggedInUser.name})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	backendlessGetLocations(language = this.state.currentLanguage){
		Backendless.Data.of("language").find()
			.then((res) => {
				const languages = res.map(({name}) => name)
				this.setState({languages})
			})
			.then(() => { // get locations depends changeLanguage()
				const locationStorage = Backendless.Data.of("location");
				const whereClause = `location_to_language.name = '${language}'`;
				const queryBuilder = Backendless.DataQueryBuilder.create()
					.setRelated(["location_to_language"])
					.setWhereClause(whereClause)
					.setRelationsDepth(2)
					.setProperties("name");
				return locationStorage.find(queryBuilder)
			})
			.then((res) => {
				const locations = res.map(({name}) => name)
				this.setState({locations})
			}) 
			.catch((err) => {
			})
	}

	changeLanguage(currentLanguage) {
		this.setState({currentLanguage},this.backendlessGetLocations(currentLanguage))
	}

	changeLocation(currentLocation) {
		this.setState({currentLocation})
	}

	changePage(setPage) {
		this.setState({currentPage: setPage})
	}

	render() {
		return (
			<div>
				<div>
					<h1>User is: {this.state.adminUser}</h1>
				</div>					
				<div>
					<h1>Language is: {this.state.currentLanguage}</h1>
					{this.state.languages.map(language => (
						<Language key={ language } language={ language } onClick={::this.changeLanguage}/>
					))}

				</div>

				<div>
					<h1>Location is: {this.state.currentLocation}</h1>
					{this.state.locations.map(location => (
						<Locations key={ location } setLocation={ location } onClick={::this.changeLocation}/>
					))}
				</div>

				<div>
					<h1>Page is: {this.state.currentPage}</h1>
					{this.state.navigation.map(navigation => (
						<Pages key={ navigation } setPage={ navigation } onClick={::this.changePage}/>
					))}
				</div>

			</div>
		)
	}
}