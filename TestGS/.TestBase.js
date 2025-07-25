const ONLY_MARKER = 'X_';
const TEST_METHOD_MARKER = 'should';
const SCENARIO_METHOD_MARKER = 'scenario_';
const TIMEOUT_TRESHOLD_MS = 330000;
const TIMES = {
  ONCE : 1,
  TWICE : 2
}
const STATUS = {
  SUCCESS : 1,
  FAIL: 2,
  ERROR: 3
}

class TestBase{

  constructor(){
    this.testClassName = this.constructor.name;
    this.findTests();
  }

  findTests(){
    let functions = this.getAllMethodNames(this);
    this.testCases = [...functions].filter(name => name.startsWith(ONLY_MARKER));
    if (this.testCases.length == 0){
      this.testCases = [...functions].filter(name => name.startsWith(TEST_METHOD_MARKER) ||
                                                    name.startsWith(SCENARIO_METHOD_MARKER));
    }
  }

  runAllTests(){
    try{
      this.start();
      this.runAllTestsCore();
      this.end();
    }catch(e){
      this.timeOut(e);
    }
  }

  runMultipleTestClass(classes){
    try{
      this.start(); 
      this.runMultipleTestClassCore(classes);
      this.end();
    }catch(e){
      this.timeOut(e);
    }
  }

  runAllTestClass(unitTests, sheetTests, acceptanceTests){
    try{
      this.start();
      this.printUpdate('Start running all Unit tests', 'Unit tests');
      this.runMultipleTestClassCore(unitTests);

      this.printUpdate('Start running all Sheet tests', 'Sheet tests');
      this.runMultipleTestClassCore(sheetTests);

      this.printUpdate('Start running all Acceptance tests', 'Acceptance tests');
      this.runMultipleTestClassCore(acceptanceTests);
      this.end();
    }catch(e){
      this.timeOut(e);
    }
  }

  runMultipleTestClassCore(classes){
    classes.forEach((testClass) => {
      let testObj = new testClass();
      testObj.runAllTestsCore();
    });
  }

  runAllTestsCore(){
    if(testInfo.savedClassCheck(this)) return;
    this.printUpdate(`Start running all test for ${this.testClassName}`, this.testClassName, true);
    try{
      this.beforeAll();
      this.testCases.forEach(test => this.runTest(test));
    }finally{
      this.afterAll();
    }
    console.info(`Test finished for ${this.testClassName}`);
    console.info('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯');
  }

  runTest(test){
    this.timoutKillSwitch();
    if(testInfo.savedTestCheck(test.toString())) return;
    this.beforeEach();
    try{
      testInfo.currentStatus = STATUS.SUCCESS;
      console.log(`Start test: ${testInfo.currentTest}`);
      try{
        this[test]();
      }catch(e){
        testError(e);
      }
      this.testFinished();
    } finally {
      this.afterEach();
    }
  }

  testFinished(){
    testInfo.tests++;
    switch(testInfo.currentStatus){
      case STATUS.SUCCESS : console.info(`Test finished with: ✔️ SUCCESS`); break;
      case STATUS.FAIL : {
        testInfo.fails++; 
        console.warn('Test finished with: ⚠️ FAILURE');
        break;
      }
      case STATUS.ERROR : {
        testInfo.errors++; 
        console.warn('Test finished with: ❌ ERROR');
        break;
      }
    }
    console.log('');
    testSheet?.printTestNameAndResult(testInfo.currentTest, testInfo.currentStatus);
  }

  start(){
    testSheet?.start();
    testInfo.start();
  }

  timeOut(e){
    if(e instanceof TimeOutException){
      testSheet?.timeOut();
      console.info('Test runtime reached the treshold, progress got saved.');
      console.info('');
      console.info('Please execute the same test runner again to countinue!');
    }else{
      throw e;
    }
  }

  end(){
    testInfo.end();
    this.printResults();
    testSheet?.finished();
  }

  beforeAll(){
    clearDm();
  }

  afterAll(){
    clearDm();
    this.clear();
  }

  beforeEach(){
    this.clear();
  }

  afterEach(){}

  clear(){
    this.clearData();
    clearMockCalls();
  }

  clearData(){}

  printUpdate(consoleUpdate, sheetUpdate, isTestName = false){
    if(!testInfo.savedTest){
      console.info(consoleUpdate);
      console.info('');
      testSheet?.printUpdate(sheetUpdate, isTestName);
    }
  }

  printResults(){
    console.info(`🏁 All test finished! 🏁`);
    console.info(``);
    console.info(`Test run: ${testInfo.tests} 🎯`);
    console.info(`  🟢 Succeded: ${testInfo.tests - testInfo.fails - testInfo.errors}`);
    console.info(`  🟡 Failed: ${testInfo.fails}`);
    console.info(`  🔴 Errored: ${testInfo.errors}`);
    if (testInfo.messages.length > 0){
      console.info(``);
      console.info(`Test failure messages:`);
      testInfo.messages.forEach((message) => console.warn(message));
    }
    console.info(``);
    console.info(`Test took: ${testInfo.durration} ms ⏱️ ( ${testInfo.getTime().getMinutes()} min and ${testInfo.getTime().getSeconds()} sec )`);
    console.info(``);
    if(testInfo.fails + testInfo.errors >0){
      console.warn(`TEST RESULT : ❌ FAILURE`);
    } else {
      console.info(`TEST RESULT : ✔️ SUCCESS`);
    }
    testSheet?.printSummary(testInfo);
  }

  getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.add(k));
    }
    return methods;
  }

  timoutKillSwitch(){
    if(testSheet && (testInfo.getCurrentRunDuration() > TIMEOUT_TRESHOLD_MS)){
      testInfo.savedClass = testInfo.currentClass;
      testInfo.savedTest = testInfo.currentTest;
      testInfo.end();
      testSheet.saveProgress();
      throw new TimeOutException();
    } 
  }
}

