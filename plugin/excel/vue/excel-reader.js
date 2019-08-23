Vue.component('excel-reader', {
  el: '#excele-reader-template',
  data: function () {
    return {
      file: null,
      book: null
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
          this.book = book
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})