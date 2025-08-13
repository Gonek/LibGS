class BtnF extends Btn{

  constructor(name, service, event, btnA1Pos, fieldIndex, btnIndex, dataIndex = undefined){
    super(name, service, event, btnA1Pos);
    this.fieldIndex = fieldIndex;
    this.btnIndex = btnIndex;
    this.dataIndex = dataIndex;
  }

  getValue(){
    return this.getRng().getValue(1, this.fieldIndex);
  }

  getData(){
    return this.getRng().getValue(1, this.dataIndex);
  }

  setValue(value){
    this.getRng().setValue(value, 1, this.fieldIndex);
  }

  setData(value){
    this.getRng().setValue(value, 1, this.dataIndex);
  }

  resetButton(){
    this.setValue('');
    this.setButtonState(false);
  }

  setButtonState(bool){
    this.getRng().setValue(bool, 1, this.btnIndex);
  }
}
