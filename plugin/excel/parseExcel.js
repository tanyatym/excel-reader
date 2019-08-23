/**
 * @typedef {Object<string, *>} Row
 * @typedef {Row[]} Sheet
 * @typedef {Object<string, Sheet>} Book
 */
/**
 * @param {File} file
 * @return {Promise<Book>}
 */
const parseExcel = function (file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {

    if (file.name.substr(-5) !== '.xlsx') {
      reject("Wrong file format (accept .xlsx)")
      return
    }
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
      return
    };

    reader.onload = (e) => {
      const book = {};
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      workbook.SheetNames.forEach(sheetName => {
        const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
        book[sheetName] = XL_row_object
      })
      resolve(book);
    };
    reader.readAsBinaryString(file);
  });
};