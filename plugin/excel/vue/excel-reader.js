Vue.component('excel-reader', {
  template: '#excel-reader-template',
  data: function () {
    return {
      file: null,
      sourceBook: null
    }
  },
  computed: {
    book() {
      const book = { header: [], rows: [] }
      if (!this.sourceBook) return 
       Object.keys(this.sourceBook).forEach(sheetName => {
         if (this.sourceBook[sheetName].length > 0) {
          const rows = this.sourceBook[sheetName].map(row => Object.values(row))
          const collNames = Object.keys(this.sourceBook[sheetName][0])
          book[sheetName] = { header: collNames, rows: rows }
         }
       })
       return book
    }
  },
  methods: {
    openFile(event) {
      if (typeof parseExcel !== 'function') {
        return
      }
      const file = event.target.files[0]
      parseExcel(file)
        .then(book => {
          console.log('excelBook', book)
          this.sourceBook = book
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})