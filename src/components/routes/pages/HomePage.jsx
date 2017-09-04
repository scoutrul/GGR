import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bdGetLocation } from 'modules/actions/changeLanguage'

import { Items } from 'components/presentational/Items'

import { DB } from 'api/index'

class HomePage extends Component {
	constructor(props){
	  super(props)
	}
	state = {
			adminUser: null,
			currentLanguage: "en",
			languages: [],
			currentLocation: "Jamaica",
			locations: [],
			navigation: [],
			currentPage: "Home",
		};

	componentDidMount(){
		this.backendlessGetLocations()
		this.backendlessUserLogin()
		this.backendlessNavigation()
	}

	componentDidUpdate(){
		console.log(this.state)
	}

	backendlessNavigation(){
		DB.Data.of("navigation").find()
			.then((res) => {
				const navigation = res.map(({name}) => name);
				this.setState({navigation})
			})
	}

	backendlessUserLogin(login = 'test@test.tt', password = 'password'){ // TD login form
		DB.UserService.login(login, password, true)
			.then((loggedInUser) => {
				this.setState({adminUser: loggedInUser.name})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	backendlessGetLocations(language = this.state.currentLanguage){
		DB.Data.of("language").find()
			.then((res) => {
				const languages = res.map(({name}) => name);
				this.setState({languages})
			})
			.then(() => { // get locations depends changeLanguage()
				const locationStorage = DB.Data.of("location");
				const whereClause = `location_to_language.name = '${language}'`;
				const queryBuilder = Backendless.DataQueryBuilder.create()
					.setRelated(["location_to_language"])
					.setWhereClause(whereClause)
					.setRelationsDepth(2)
					.setProperties("name");
				return locationStorage.find(queryBuilder)
			})
			.then((res) => {
				const locations = res.map(({name}) => name);
				this.setState({locations})
			}) 
			.catch((err) => {
			})
	}

	changeLanguage(currentLanguage) {
		this.setState({currentLanguage}, function(){this.backendlessGetLocations(currentLanguage)})
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
						<Items key={ language } name={ language } onClick={::this.changeLanguage}/>
					))}

				</div>

				<div>
					<h1>Location is: {this.state.currentLocation}</h1>
					{this.state.locations.map(location => (
						<Items key={ location } name={ location } onClick={::this.changeLocation}/>
					))}
				</div>

				<div>
					<h1>Page is: {this.state.currentPage}</h1>
					{this.state.navigation.map(navigation => (
						<Items key={ navigation } name={ navigation } onClick={::this.changePage}/>
					))}
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    currentLanguage : state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage : () => dispatch({
      type : 'CHANGE_LANGUAGE'
    })
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)