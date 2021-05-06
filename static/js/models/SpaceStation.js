class SpaceStation extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('SpaceStations')
      this.fields = this.fields.concat(['number', 'capacity', 'need'])
    }
  }