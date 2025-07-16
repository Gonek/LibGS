class AbstractEventService {

  constructor(btns){
    this.btns = btns;
  }

  onEdit(e){
    try{
      let sheetId = e.source.getSheetId();
      let a1Pos = e.range.getA1Notation();
      this.checkButtons(sheetId, a1Pos);
    }catch(error){
      this.errorHandler(error);
    }
  }

  onOpen(onOpen){
    try{
      onOpen();
    }catch(error){
      this.errorHandler(error);
    }
  }

  errorHandler(error){
    if(!testInfo?.isTestInProgress){
      alert(error + " " + error.stack);
    }else{
      throw error;
    }
  }

  testButton(sheetName, btnName, A1Pos = undefined){
    this.checkButtons(sheetName, A1Pos ? A1Pos: getRng(btnName).getA1Pos());
  }

  checkButtons(sheetId, a1Pos){
    let sheetBtns = this.btns.find(s => s[0] == sheetId);
    if(sheetBtns){
      let btn = sheetBtns[1].find(btn => btn.isSamePos(a1Pos, btn));
      if(btn){
        btn.run();
      }
    }             
  }
}