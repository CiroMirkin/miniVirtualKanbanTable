import Show from "./showTickets.js"
import WorkInProgress from "./workInProgress.js"

let table = {}

export default class KanbanTable {
    constructor() {
        this.workInProgress = new WorkInProgress()
        this.storage = new Storage('kanban')
        
        this.storage.updateTable()
    }

    addNewTicket(ticket) {
        this.storage.updateTable()
        if (this.hasThisColumnSpace(ticket.column)) {
            table.waiting.push(ticket)
            this.storage.saveTable()
        }
    }

    moveTicket(ticketId) {
        let ticket = this.getTicketToMove(ticketId)
        const tableColumnsName = Object.keys(table)

        for (let columnIndex = 0; columnIndex < tableColumnsName.length; columnIndex++) {
            let column = table[tableColumnsName[columnIndex]]
            const nextColumn = columnIndex + 1

            let ticketExits = column.findIndex(ticketInColumn => ticketInColumn.id === ticket.id)
            ticketExits = ticketExits !== -1


            if (ticketExits && nextColumn !== tableColumnsName.length && this.hasThisColumnSpace(tableColumnsName[nextColumn])) {
                table[tableColumnsName[columnIndex]] = column.filter(ticketInColumn => ticketInColumn.id !== ticket.id)
                ticket.column = tableColumnsName[nextColumn]

                table[tableColumnsName[nextColumn]].push(ticket)
                this.storage.saveTable()
                break
            }
        }
    }

    getTicketToMove(ticketId) {
        let ticket = {}
        this.storage.updateTable()

        Object.entries(table).forEach(([columnName, column]) => {
            const ticketInfo = column.find(ticketInColumn => ticketInColumn.id === ticketId)

            if (!!ticketInfo) {
                ticket = ticketInfo
            }
        })

        return ticket
    }

    hasThisColumnSpace(columnName) {
        return this.workInProgress.hasThisColumnSpace({
            columnName,
            columnLenght: table[columnName].length + 1
        })
    }

    deleteWaitingTicket(ticketId) {
        this.storage.updateTable()
        const columnName = 'waiting'
        table[columnName] = table[columnName].filter(ticket => ticket.id !== ticketId)

        this.storage.saveTable()
    }

    archiveFinishTicket(ticketId) {
        this.storage.updateTable()
        const ticket = table.finish.filter(ticketInColumn => ticketInColumn.id == ticketId)
        table.finish = table.finish.filter(ticketInColumn => ticketInColumn.id !== ticketId)

        this.storage.saveArchive(ticket.at(0))
        this.storage.saveTable()
    }
}

class Storage {
    constructor(storageName) {
        this._storageTableName = storageName
        this.storageArchiveName = `${this._storageTableName}-archive`

        this.show = new Show()
        this.updateTable()
        this.#showTable()
    }
    
    updateTable() {
        table = JSON.parse(localStorage.getItem(this.storageTableName)) || []
        
        if(!table.waiting) {
            table = {
                waiting: [],
                inProgress: [],
                finish: []
            }
        }
    }

    #showTable() {
        this.show.table(table)
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
    
    saveTable() {
        localStorage.setItem(this.storageTableName, JSON.stringify(table))
        this.#showTable()
    }
}