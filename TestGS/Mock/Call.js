class Call{
    constructor(prop, args, order) {
        this.prop = prop;
        this.args = args;
        this.order = order;
        this.count = 1;
    }

    isEqual(call){
        return call.prop == this.prop && (call.args=='any' || arraysEqual(call.args,this.args));
    }

    incCount(){
        this.count++;
    }
}