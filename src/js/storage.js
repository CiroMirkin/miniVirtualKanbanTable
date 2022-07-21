class StorageAdmin {
    constructor(storageNameId) {
        this.storageTableName = storageNameId
        this.storageArchiveName = `${this.storageTableName}-archive`

        this.show = new Show()
    }

    showTable() {
        const storageTable = JSON.parse(localStorage.getItem(this.storageTableName)) || []
        this.show.table(storageTable)
    }

    showArchive() {
        const storageArchive = JSON.parse(localStorage.getItem(this.storageArchiveName)) || []
        this.show.archive(storageArchive)
    }

    saveTable(table) {
        localStorage.setItem(this.storageTableName, JSON.stringify(table))
        this.showTable()
    }

    saveArchive(newArchiveTicket) {
        const storageArchive = JSON.parse(localStorage.getItem(this.storageArchiveName)) || []
        storageArchive.push(newArchiveTicket)
        localStorage.setItem(this.storageArchiveName, JSON.stringify(storageArchive))
        this.showArchive()
    }

}