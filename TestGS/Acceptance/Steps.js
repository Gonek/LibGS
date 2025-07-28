class Steps{
    
    /**
     * Constructor for Steps
     * @param {AcceptanceTestBase} owner test for the steps
     */
    constructor(owner){
        this.test = owner;
    }

    /**
     * Simulate a click on the given button
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} rng Name of the range for you button
     * @param {String} A1Pos A1 position of the button
     */
    clickButton(sht, rng, A1Pos = undefined){
        getRng(rng).setValue(true);
        getObj(EventService).testButton(sht, rng, A1Pos);
    }

    /**
     * Simulate a change of value on the given combobox
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} rng Name of the range for you button
     * @param {Obj} value New value for the Cbox
     */
    changeCbox(sht, rng, value){
        getRng(rng).setValue(value);
        getObj(EventService).testButton(sht, rng);
    }

    /**
     * Simulate a click on the given button with field
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} name Name of the button field
     * @param {String} A1Pos A1 position of the button
     * @param {Integer} btnIndex position of the button in the rng
     */
    clickButtonWithField(sht, name, A1Pos, btnIndex){
        getRng(name).setValue(true, 1, btnIndex);
        getObj(EventService).testButton(sht, name, A1Pos);
    }

    /**
     * Simulate a change of value on the given combobox
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} name Name of the range for you button
     * @param {Integer} to Index in the validation criteria range for the combo box
     */
    changeCbox(sht, name, to){
        getRng(name).setValue(to);
        getObj(EventService).testButton(sht, name);
    }


    /**
     * Simulate a change of value on the given combobox
     * @param {String} sht Name of the Sheet where you button located
     * @param {String} name Name of the range for you button
     * @param {Integer} row Row of the date change in the rng
     * @param {Integer} col Column of the date change in the rng
     * @param {String} a1pos A1 position of the change
     * @param {String} to New value for the cell
     */
    changeField(sht, name, row, col, a1pos, to){
        getRng(name).setValue(to, row, col);
        getObj(EventService).testButton(sht, name, a1pos);
    }

    /**
     * Simulate an onOpen Event
     */
    onOpen(){
        getObj(EventService).onOpen();
    }
}