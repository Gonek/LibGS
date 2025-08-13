class Input{

  constructor(name, service, event, a1Pos = undefined){
    this.name = name;
    this.service = service
    this.event = event;
    this.a1Pos = a1Pos;
    this.rng = undefined;
  }

  /**
   * Return attached Rng object, create one in case it's not created yet. 
   * @returns {Rng} rng object
   */
  getRng(){
    if(!this.rng) 
      this.rng = getRng(this.name);
    return this.rng
  }


  /**
   * Check if the A1 position of the input equals to the given A1 position. 
   * @returns {Boolean} True if the positions are equals
   */
  isSamePos(a1Pos){
    if(this.a1Pos){
      return a1Pos == this.a1Pos;
    } else {
      return a1Pos == this.getRng().getA1Pos();
    }
  }

  /**
   * Run the assigned function. 
   */
  run(){
    let serviceObj = getObj(this.service);
    serviceObj[this.event](this);
  }

  toString(){
    return `Input()`;
  }
}
