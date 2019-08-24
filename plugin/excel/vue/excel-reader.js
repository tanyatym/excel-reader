Vue.component('excel-reader', {
  template: `
  <div class="file-input">
    <input type='file' @change="openFile">
    <div class="output">
      <div v-for="(sheet, name) in book" :key="name">
        <h3>{{ name }}</h3>
        <table>
          <table-header :coll-names="sheet.header"></table-header>
          <table-row v-for="(row, i) in sheet.rows" :values="row" :key="i"></table-row>
        </table>
      </div>
    </div>
  </div>`,
  data: function () {
    return {
      file: null,
      sourceBook: null
    }
  },
  computed: {
    book() {
      const book = {}
      if (!this.sourceBook) return
      Object.keys(this.sourceBook).forEach(sheetName => {
        if (this.sourceBook[sheetName].length > 0) {
          const rows = this.sourceBook[sheetName].map(row => Object.values(row))
          const collNames = Object.keys(this.sourceBook[sheetName][0])
          book[sheetName] = {
            header: collNames,
            rows: rows
          }
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