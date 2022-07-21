"use strict"

class WorkInProgress {
    constructor() {
        this.workInProgressLimits = { waiting: 4, inProgress: 2, finish: 4 }
    }

    showWorkInProgressLimits() {
        Object.entries(this.workInProgressLimits).forEach(([progressName, progressLimit]) => {
            document.getElementById(`cardsCountColumn-${progressName}`).innerText = `(${progressLimit})`
        })
    }

    hasThisColumnSpace({ columnName, columnLenght }) {
        return columnLenght > this.workInProgressLimits[columnName] ? false : true
    }
}

// export default WorkInProgress