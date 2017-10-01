class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this.config = config;
            this.state = [];
            this.state.push(this.config.initial);
            this.prev = [];
        } else {
            throw new Error();
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state[this.state.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.state.push(state);
            this.prev = [];
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
      
    trigger(event) {
        if (this.config.states[this.getState()].transitions[event]) {
            this.state.push(this.config.states[this.getState()].transitions[event]);
            this.prev = [];
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = [];
        this.state.push(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.config.states)
        } else if (event) {
            var keys = [],
                states = ["normal", "busy", "hungry", "sleeping"];

            for (var i = 0; i < states.length; i++) {
                if(this.config.states[states[i]].transitions[event]) {
                    keys.push(states[i]);
                }
            }            
            return keys;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state.length === 1) {
            return false;
        } else if (this.state.length !== 1) {
            this.prev.push(this.state.pop());
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.prev.length < 1) {
            return false;
        } else {
            this.state.push(this.prev.pop());
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = [];
        this.state.push(this.config.initial);
        this.prev = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/