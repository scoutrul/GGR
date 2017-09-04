export const bdGetLocation = (language = this.state.currentLanguage) => () =>
{
  Backendless.Data.of("language").find()
    .then((res) => {
      const languages = res.map(({name}) => name);
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
      const locations = res.map(({name}) => name);
      this.setState({locations})
    })
    .catch((err) => {
    })
}
