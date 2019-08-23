var app = new Vue({
  el: "#excel-reader",
  template: `
    <div class="file-input">
      <input type='file' @change="openFile">
      <div class='output'>
        <div v-for="(sheet, name) in book" :key="name">
          <h3>{{ name }}</h3>
          <table>
            <tr>
              <th v-for="(value, collTitle) in sheet[0]" :key="collTitle">
                {{ collTitle }}
              </th>
            </tr>
            <tr v-for="(row, i) in sheet" :key="i">
              <td v-for="(value, key) in row" :key="key">
                {{ value }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      file: null,
      // excelReader: null,
      book: null
    }
  },
  
  computed: {

  },

  created () {
    // if (ExcelReader){
    //   this.excelReader = new ExcelReader()
    // }
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
