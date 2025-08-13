class Btn extends Input{

  constructor(name, service, event, btnA1Pos, dataIndex = undefined){
    super(name, service, event, btnA1Pos);
    this.dataIndex = dataIndex;
  }

  /**
   * Run the assigned function and reset the button state after it's finished ( or failed ). 
   */
  run(){
    try{
      super.run();
    } catch (error) {
      if(!testInfo?.isTestInProgress){
        alert(error + " " + error.stack);
      }else{
        throw error;
      }
    } finally {
      this.resetButton();
    }
  }

  getData(){
    return this.getRng().getValue(1, this.dataIndex);
  }

  setData(value){
    this.getRng().setValue(value, 1, this.dataIndex);
  }

  /**
   * Reset the state od the button
   */
  resetButton(){
    this.getRng().setValue(false);
  }
}
