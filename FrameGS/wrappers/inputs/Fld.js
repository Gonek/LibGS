class Fld extends Input{

  constructor(name, service, event, a1Range){
    super(name, service, event, a1Range);
  }

   /**
   * Check if the given position in the field a1 pos range. 
   * @returns {Boolean} True if the position is in range
   */
    isSamePos(a1Pos){
        let col = this.getCol(a1Pos);
        let row = this.getRow(a1Pos);
        let range = this.a1Pos.split(":");
        if(col >= this.getCol(range[0]) && col <= this.getCol(range[1])){
            if(row >= this.getRow(range[0]) && row <= this.getRow(range[1])){
                return true;
            }
        }
        return false;
    }  

    getCol(a1Pos){
        return a1Pos.charAt(0);
    }

    getRow(a1Pos){
        return parseInt(a1Pos.substring(1))
    }
}