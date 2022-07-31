"use strict"
import KanbanTable from "./js/kanbanTable.js"
import { generateID } from "./js/generateID.js"

const kanbanTable = new KanbanTable('kanban')
kanbanTable.showTable()

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
        kanbanTable.archiveFinishTicket(e.target.parentElement.id)
    },
    'archiveOfCardsBtn': (e) => {
        kanbanTable.showArchive()
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

    if(!!newTicketTitleInput.value) {
        kanbanTable.addNewTicket({
            id: generateID(),
            title: newTicketTitleInput.value,
            description: newTicketTitleDescription.value,
            column: 'waiting'
        })
    
        newTicketTitleInput.value = ''
        newTicketTitleDescription.value = ''
        document.getElementById('newTicket').classList.remove('newTicket--show')
    }
})
