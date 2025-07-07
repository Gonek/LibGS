class Btn extends Input{
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

  /**
   * Reset the state od the button
   */
  resetButton(){
    this.getRng().setValue(false);
  }
}
