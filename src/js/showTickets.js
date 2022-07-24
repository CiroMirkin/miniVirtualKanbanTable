export default class Show {
    constructor() {
        this.typesOfTicketsAndHisButtons = {
            waiting: `
                <button class="kandanCard__btn kandanCard__btn--more">Mas</button>
                <button class="kandanCard__btn kandanCard__btn--move">mover</button>
                <button class="kandanCard__btn kandanCard__btn--delete">Eliminar</button>
            `,
            inProgress: `
                <button class="kandanCard__btn kandanCard__btn--more">Mas</button>
                <button class="kandanCard__btn kandanCard__btn--move">mover</button>
            `,
            finish: `
                <button class="kandanCard__btn kandanCard__btn--more">Mas</button>
                <button class="kandanCard__btn kandanCard__btn--archive">archivar</button>
            `
        }
    }

    generateCardElement(ticket) {
        let ticketElement = ''

        Object.entries(this.typesOfTicketsAndHisButtons).forEach(([ticketColumn, ticketButtons]) => {
            if (ticket.column === ticketColumn) {
                ticketElement = `<li class="kandanCard" id="${ticket.id}">
                    <header class="kandanCard__title">${ticket.title}</header>
                    <p class="kandanCard__description">${ticket.description}</p>
                    ${ticketButtons}
                </li>`
            }
        })

        return ticketElement
    }

    table(ticketColumns) {
        Object.entries(ticketColumns).forEach(([columnName, column]) => {
            const columnElement = document.getElementById(columnName)
            const columnContent = column.map(ticket => this.generateCardElement(ticket)).join('')

            columnElement.innerHTML = columnContent
        })
    }

    archive(ticketsArchive) {
        const archiveOfCardsElement = document.getElementById('archiveOfCards')
        const archiveOfCardsBtn = document.querySelector('.archiveOfCardsBtn')
        
        archiveOfCardsElement.classList.toggle('archiveOfCards--show')
        archiveOfCardsBtn.innerText = archiveOfCardsBtn.innerText == 'Ver tickets archivados' ? 'Ocultar tickets archivados' : 'Ver tickets archivados'  
        
        archiveOfCardsElement.innerHTML = ticketsArchive.map(ticket => 
            `<li class="archiveOfCards__cards-card" id="${ticket.id}">
                <header class="archiveOfCards__cards-cardTitle">${ticket.title}</header>
                <p class="archiveOfCards__cards-cardDescription">${ticket.description}</p>
            </li>`
        ).join('')
    }
}