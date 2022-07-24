"use strict"

export default class WorkInProgress {
    constructor() {
        this.workInProgressLimits = { waiting: 4, inProgress: 2, finish: 4 }
        this.showWorkInProgressLimits()
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
