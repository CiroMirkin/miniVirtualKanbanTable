class StorageAdmin {
    constructor(storageNameId) {
        this.storageTableName = storageNameId
        this.storageArchiveName = `${this.storageTableName}-archive`

        this.table = {}
        this.#updateTable()

        this.show = new Show()
        this.workInProgress = new WorkInProgress()
    }

    #updateTable() {
        this.table = JSON.parse(localStorage.getItem(this.storageTableName)) || []
    }

    hasThisColumnSpace(columnName) {
        return this.workInProgress.hasThisColumnSpace({
            columnName,
            columnLenght: this.table[columnName].length + 1
        })
    }

    getTicketToMove(ticketId) {
        let ticket = {}
        this.#updateTable()

        Object.entries(this.table).forEach(([columnName, column]) => {
            const ticketInfo = column.find(ticketInColumn => ticketInColumn.id === ticketId)

            if (!!ticketInfo) {
                ticket = ticketInfo
            }
        })

        return ticket
    }

    moveTicket(ticketId) {
        let ticket = this.getTicketToMove(ticketId)
        const tableColumnsName = Object.keys(this.table)

        for (let columnIndex = 0; columnIndex < tableColumnsName.length; columnIndex++) {
            let column = this.table[tableColumnsName[columnIndex]]
            const nextColumn = columnIndex + 1

            let ticketExits = column.findIndex(ticketInColumn => ticketInColumn.id === ticket.id)
            ticketExits = ticketExits !== -1


            if (ticketExits && nextColumn !== tableColumnsName.length && this.hasThisColumnSpace(tableColumnsName[nextColumn])) {
                this.table[tableColumnsName[columnIndex]] = column.filter(ticketInColumn => ticketInColumn.id !== ticket.id)
                ticket.column = tableColumnsName[nextColumn]

                this.table[tableColumnsName[nextColumn]].push(ticket)
                this.saveTable()
                break
            }
        }
    }

    addNewTicket(ticket) {
        this.#updateTable()
        if (this.hasThisColumnSpace(ticket.column)) {
            this.table.waiting.push(ticket)
            this.saveTable()
        }
    }

    deleteWaitingTicket(ticketId) {
        this.#updateTable()
        const columnName = 'waiting'
        this.table[columnName] = this.table[columnName].filter(ticket => ticket.id !== ticketId)

        this.storage.saveTable()
    }

    saveTable() {
        localStorage.setItem(this.storageTableName, JSON.stringify(this.table))
        this.showTable()
    }

    showTable() {
        this.#updateTable()
        this.show.table(this.table)
    }

    archiveTicket(ticketId) {
        this.#updateTable()
        const ticket = this.table.finish.filter(ticketInColumn => ticketInColumn.id == ticketId)
        this.table.finish = this.table.finish.filter(ticketInColumn => ticketInColumn.id !== ticketId)

        this.saveArchive(ticket.at(0))
        this.saveTable()
    }

    saveArchive(newArchiveTicket) {
        const archive = JSON.parse(localStorage.getItem(this.storageArchiveName)) || []
        archive.push(newArchiveTicket)

        localStorage.setItem(this.storageArchiveName, JSON.stringify(archive))
        this.showArchive()
    }

    showArchive() {
        const archive = JSON.parse(localStorage.getItem(this.storageArchiveName)) || []
        this.show.archive(archive)
    }
}