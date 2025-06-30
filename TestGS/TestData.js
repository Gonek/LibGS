class TestInfo{
  constructor(){
    this.tests = 0;
    this.fails = 0;
    this.errors = 0;
    this.messages = [];
    this.startTime = 0;
    this.durration = 0;
    this.time;
    this.currentStatus;
    this.currentClass;
    this.currentTest;
    this.savedClass;
    this.savedTest;
    this.isAcceptanceTest;
    this.isTestInProgress = false;
  }

  load(testInfo){
    this.tests = testInfo.tests;
    this.fails = testInfo.fails;
    this.errors = testInfo.errors;
    this.messages = testInfo.messages;
    this.startTime = new Date();
    this.durration = testInfo.durration;
    this.savedClass = testInfo.savedClass;
    this.savedTest = testInfo.savedTest;
  }

  error(message){
    this.messages.push(`${this.currentClass}.${this.currentTest} : ${message}`);
  }

  start(){
    this.startTime = new Date();
    this.isTestInProgress = true;
  }

  end(){
    this.durration = this.durration + this.getCurrentRunDuration();
    this.isTestInProgress = false;
  }

  savedClassCheck(testClass){
    this.currentClass = testClass.constructor.name;
    this.isAcceptanceTest = testClass instanceof AcceptanceTestBase;
    return this.savedClass && this.savedClass != this.currentClass;
  }

  savedTestCheck(test){
    this.currentTest = test;
    if(this.savedTest && this.savedTest != test) {
      return true;
    }else{
      this.savedClass = '';
      this.savedTest = '';
      return false;
    }
  }

  getCurrentRunDuration(){
    return new Date() - this.startTime;
  }

  getTime(){
    return this.time = this.time || new Date(this.durration);
  }
}

var testInfo = new TestInfo();