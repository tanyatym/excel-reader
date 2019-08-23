var app = new Vue({
  el: "#excel-reader",
  data: function () {
    return {
      file: null,
      // excelReader: null,
      book: null
    }
  },

  methods: {
    openFile (event) {
      if (typeof parseExcel !== 'function') {
        return
      }
      console.log('event.target', event.target)
      const file = event.target.files[0]
      parseExcel(file)
          .then(book => {
              console.log('excelBook', book)
              this.book = book
          })
          .catch(err => {
              console.error(err)
          })
    }
  }
})
