class StorageAdim {
    constructor(storageNameId) {
        this.storageNameId = storageNameId
        this.storageArchiveNameId = `${this.storageNameId}-archive`

        this.render = new Render()
    }

    showTable() {
        const storageTable = JSON.parse(localStorage.getItem(this.storageNameId)) || []

        this.render.table(storageTable)
    }

    showArchive() {
        const storageArchive = JSON.parse(localStorage.getItem(this.storageArchiveNameId)) || []

        this.render.archive(storageArchive)
    }

    saveTable(table) {
        localStorage.setItem(this.storageNameId, JSON.stringify(table))
        this.showTable()
    }

    saveArchive(archive) {
        localStorage.setItem(this.storageArchiveNameId, JSON.stringify(archive))
        this.showArchive()
    }

}