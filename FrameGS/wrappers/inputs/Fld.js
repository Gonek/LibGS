class Fld extends Input{

  constructor(name, service, event, a1Range){
    this.name = name;
    this.service = service;
    this.event = event;
    this.a1Pos = a1Range;
    this.rng = undefined;
  }

   /**
   * Check if the given position in the field a1 pos range. 
   * @returns {Boolean} True if the position is in range
   */
    isSamePos(a1Pos){
        let col = getCol(a1Pos);
        let row = getRow(a1Pos);
        let range = this.a1Pos.split(":");
        if(col >= this.getCol(range[0]) && col <= this.getCol(range[1])){
            if(row >= this.getRow(range[0]) && row <= this.getRow(range[1])){
                return true;
            }
        }
        return false;
    }  

    getCol(a1Pos){
        return a1Pos.substring(1,1);
    }

    getRow(a1Pos){
        parseInt(a1Pos.substring(2))
    }
}