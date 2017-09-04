import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Items } from 'components/presentational/Items'

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.currentLanguage,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeLanguage:(name) => {
      dispatch(changeLanguageAction(name))
    }
  }
}

const changeLanguageAction = (currentLanguage) => {
  return {
    type: 'CHANGE_LANGUAGE',
    currentLanguage
  }
}

class changeLanguage extends Component (){
  constructor(props){
    super(props)
  }
  
  render(){
    return(
      {
        this.props.languages.map(language => (
          <Items key={ language } name={ language } onClick={props.handleChangeLanguage}/>
        ))
      }
    )
  }
}

export connect(mapStateToProps, mapDispatchToProps)(changeLanguage);