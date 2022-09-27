let newListBook = []
let allBooks;
function listBook() {
    const inputAddBook = document.querySelectorAll('.inputAddBook')
    const newData = {
          id: +new Date,
          title: inputAddBook[0].value,
          author: inputAddBook[1].value,
          year: Number(inputAddBook[2].value),
          isComplete: inputAddBook[3].checked
      };
      newListBook.push(newData)
      allBooks.push(newData)
      addTableRow(newListBook)
      resetInput()
  }

  function resetInput() {
    const inputAddBook = document.querySelectorAll('.inputAddBook')
    inputAddBook[0].value = ""
    inputAddBook[1].value = ""
    inputAddBook[2].value = ""
  }

  function validateInput(q) {
      let inputAddBook;
      if(q === "listBuku") {
        inputAddBook = document.querySelectorAll('.inputAddBook')
      } else {
        inputAddBook = document.querySelectorAll('.inputEditBook')
      }

      inputAddBook[0].value === "" ? inputAddBook[0].parentElement.querySelectorAll('.fst-italic')[0].innerHTML = 'please required this field' : inputAddBook[0].parentElement.querySelectorAll('.fst-italic')[0].innerHTML = ''
      inputAddBook[1].value === "" ? inputAddBook[1].parentElement.querySelectorAll('.fst-italic')[0].innerHTML = 'please required this field' : inputAddBook[1].parentElement.querySelectorAll('.fst-italic')[0].innerHTML = ''
      inputAddBook[2].value === "" ? inputAddBook[2].parentElement.querySelectorAll('.fst-italic')[0].innerHTML = 'please required this field' : inputAddBook[2].parentElement.querySelectorAll('.fst-italic')[0].innerHTML = ''

      if(inputAddBook[0].value === "" || inputAddBook[1].value === "" || inputAddBook[2].value === "") {
        return false;
      } else {
        return true
      }
  }