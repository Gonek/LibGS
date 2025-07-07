class BtnF extends Btn{

  constructor(name, service, event, fieldIndex, btnIndex, btnA1Pos){
    super(name, service, event, btnA1Pos);
    this.fieldIndex = fieldIndex;
    this.btnIndex = btnIndex;
  }

  getValue(){
    return this.getRng().getValue(this.fieldIndex);
  }

  setValue(value){
    this.getRng().setValue(value, this.fieldIndex);
  }

  resetButton(){
    this.getRng().setValue(false, this.btnIndex);
  }
}
