function updateBook(param) {
    const inputEditBook = document.querySelectorAll('.inputEditBook')
    let indeksByParam = allBooks.findIndex((function (e) {
      return e.id === Number(param)
    }))
    const newData = {
          id: Number(param),
          title: inputEditBook[0].value,
          author: inputEditBook[1].value,
          year: Number(inputEditBook[2].value),
          isComplete: inputEditBook[3].checked
      };
    allBooks[indeksByParam] = newData
    setBook()
  }

  function setBook() {
    localStorage.setItem("books", JSON.stringify(allBooks))
    getBook()
    resetInput()
    newListBook = [];
    addTableRow(newListBook)
  }

  function getBook() {
    let dataBuku = JSON.parse(localStorage.getItem("books")) || []
    allBooks = dataBuku

    let dataSudahDibaca = allBooks.filter((book) => book.isComplete == true)
    let dataBelumDibaca = allBooks.filter((book) => book.isComplete == false)
    showTableRow(dataSudahDibaca, true)
    showTableRow(dataBelumDibaca, false)
  }

  function hapusBuku(param) {
    let indeksByParam = allBooks.findIndex((function (e) {
      return e.id === Number(param)
    }))
    allBooks.splice(indeksByParam, 1)
    setBook()
    getBook()
  }