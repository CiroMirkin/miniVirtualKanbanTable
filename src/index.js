"use strict"

class KanbanTable {
    constructor() {
        this.table = {
            waiting: [],
            inProgress: [],
            finish: []
        }

        this.workInProgress = new WorkInProgress()
        this.workInProgress.showWorkInProgressLimits()

        this.storage = new StorageAdmin('kanban')
    }

    showSavedTickets() {
        this.storage.showTable()
    }

    showSavedArchive() {
        this.storage.showArchive()
    }

    hasThisColumnSpace(columnName) {
        return this.workInProgress.hasThisColumnSpace({
            columnName,
            columnLenght: this.table[columnName].length + 1
        })
    }

    addNewTicket(ticket) {
        if(this.hasThisColumnSpace(ticket.column)) {
            this.table.waiting.push(ticket)
            this.storage.saveTable(this.table)
        }
    }

    getTicketToMove(ticketId) {
        let ticket = { }

        Object.entries(this.table).forEach((column) => {
            const ticketInfo = column[1].find(ticketInColumn => ticketInColumn.id === ticketId)

            if(!!ticketInfo) {
                ticket = ticketInfo
            }
        })

        return ticket
    }

    moveTicket(ticketId) {
        let ticket = this.getTicketToMove(ticketId) 
        const tableColumnsName = Object.keys(this.table)

        for (let columnIndex = 0; columnIndex < tableColumnsName.length; columnIndex++) {
            const column = this.table[tableColumnsName[columnIndex]]
            const ticketExits = column.findIndex(ticketInColumn => ticketInColumn.id === ticket.id)

            if (
                ticketExits !== -1 &&
                (columnIndex + 1) !== tableColumnsName.length &&
                this.hasThisColumnSpace(tableColumnsName[columnIndex + 1])
            ) {
                this.table[tableColumnsName[columnIndex]] = column.filter(cardInColumn => cardInColumn.id !== ticket.id)
                ticket.column = tableColumnsName[columnIndex + 1]
                this.table[tableColumnsName[columnIndex + 1]].push(ticket)
                break
            }
        }

        this.storage.saveTable(this.table)
    }

    deleteWaitingTicket(ticketId) {
        const columnName = 'waiting'
        this.table[columnName] = this.table[columnName].filter(ticket => ticket.id !== ticketId)
    
        this.storage.saveTable(this.table)
    }

    archiveFinishCard(ticketId) {
       const ticket = this.table.finish.filter(ticketInColumn => ticketInColumn.id == ticketId)
       this.table.finish = this.table.finish.filter(ticketInColumn => ticketInColumn.id !== ticketId)

       this.storage.saveArchive(ticket.at(0))
       this.storage.saveTable(this.table)
    }
}

const kanbanTable = new KanbanTable()
kanbanTable.showSavedTickets()

const kandanTableElement = document.getElementById('kandanTable')

const clasesBtnAndHisFunction = {
    'kandanCard__btn--more': (e) => {
        e.target.parentElement.classList.toggle('kandanCard--more')
        e.target.innerText = e.target.innerText == 'Mas' ? 'Menos' : 'Mas'
    },
    'kandanCard__btn--move': (e) => {
        kanbanTable.moveTicket(e.target.parentElement.id)
    },
    'kandanCard__btn--delete': (e) => {
        kanbanTable.deleteWaitingTicket(e.target.parentElement.id) 
    },
    'kandanCard__btn--archive': (e) => {
        kanbanTable.archiveFinishCard(e.target.parentElement.id)
    },
    'archiveOfCardsBtn': (e) => {
        kanbanTable.showSavedArchive()
    }
}

kandanTableElement.addEventListener('click', (e) => {
    Object.entries(clasesBtnAndHisFunction).forEach(([className, btnFunction]) => {
        if (e.target.classList[1] === className) {
            btnFunction(e)
        }
    })
})

const newTicketBtn = document.getElementById('newTicketBtn')
const newTicketForm = document.getElementById('newTicketForm')

newTicketBtn.addEventListener('click', () => {
    document.getElementById('newTicket').classList.toggle('newTicket--show')
})

const newTicketTitleInput = document.getElementById('addNewCardInputTitle')
const newTicketTitleDescription = document.getElementById('addNewCardInputDescription')

newTicketForm.addEventListener('submit', (e) => {
    e.preventDefault()

    kanbanTable.addNewTicket({
        id: generateID(),
        title: newTicketTitleInput.value,
        description: newTicketTitleDescription.value,
        column: 'waiting'
    })

    newTicketTitleInput.value = ''
    newTicketTitleDescription.value = ''
    document.getElementById('newTicket').classList.remove('newTicket--show')
})
