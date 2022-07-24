import StorageAdmin from "./storage.js"

export default class KanbanTable {
    constructor() {
        this.table = {}

        this.storage = new StorageAdmin('kanban')
    }

    showSavedTickets() {
        this.storage.showTable()
    }

    showSavedArchive() {
        this.storage.showArchive()
    }

    addNewTicket(ticket) {
        this.storage.addNewTicket(ticket)
    }

    moveTicket(ticketId) {
        this.storage.moveTicket(ticketId)
    }

    deleteWaitingTicket(ticketId) {
        this.storage.deleteWaitingTicket(ticketId)
    }

    archiveFinishTicket(ticketId) {
        this.storage.archiveTicket(ticketId)
    }
}