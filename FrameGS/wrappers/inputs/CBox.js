class CBox extends Input{
  getValue(){
    return this.getRng().getValue();
  }

  setValue(value){
    this.getRng().setValue(value);
  }
}