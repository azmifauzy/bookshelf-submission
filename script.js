        let newListBook = []
        let allBooks;

        function addClassToButton(e) {
                e.classList.add('bg-primary')
                e.classList.add('text-white')
                e.classList.add('fw-bold')
        }
        function removeClassFromButton(e) {
                document.querySelector(`${e}`).classList.remove('bg-primary')
                document.querySelector(`${e}`).classList.remove('text-white')
                document.querySelector(`${e}`).classList.remove('fw-bold')
        }
        function hideAnotherTable(e) {
            if(document.querySelector(`${e}`).classList.contains('show')) {
                document.querySelector(`${e}`).classList.remove('show')
            }
        }
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
        function setBook() {
          localStorage.setItem("books", JSON.stringify(allBooks))
          getBook()
          resetInput()
          newListBook = [];
          addTableRow(newListBook)
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

        document.querySelector('#keyword').addEventListener('keyup', function(e) {
          const keyword = e.target.value 
          let dataSudahDibaca = allBooks.filter((book) => book.isComplete == true && book.title.toString().toLowerCase().search(keyword.toString().toLowerCase()) >= 0)
          let dataBelumDibaca = allBooks.filter((book) => book.isComplete == false && book.title.toString().toLowerCase().search(keyword.toString().toLowerCase()) >= 0)
          showTableRow(dataSudahDibaca, true)
          showTableRow(dataBelumDibaca, false)
        })

        function showTableRow(data, isComplete) {
          tableRow = ``
          if(data.length > 0) {
            data.forEach(data => {
                  tableRow += `<tr>
                                    <td>${data.title}</td>
                                    <td>${data.author}</td>
                                    <td>${data.year}</td>
                                    <td>
                                      ${data.isComplete == false ? 
                                        `<span class="badge bg-warning">Belum</span>`
                                      :
                                        `<span class="badge bg-success">Sudah</span>`
                                      }
                                    </td>
                                    <td>
                                      <button class="btn btn-sm btn-danger" id="btnHapusBuku" data-id="${data.id}"><i class="bi bi-trash" id="btnHapusBuku" data-id="${data.id}"></i></button>
                                      <button class="btn btn-sm btn-primary" id="btnEditBuku" data-id="${data.id}" type="button" data-bs-toggle="modal" data-bs-target="#modalEditBuku"><i class="bi bi-pencil-square" id="btnEditBuku" data-id="${data.id}" type="button" data-bs-toggle="modal" data-bs-target="#modalEditBuku"></i></button>
                                    </td>
                                  </tr>`
            });
          } else {
            tableRow += `<tr><td colspan="5">Tidak ada Data</td></tr>`
          }

          if(isComplete) {
            document.querySelector('#tableBodySudahDibaca').innerHTML = tableRow
          } else {
            document.querySelector('#tableBodyBelumDibaca').innerHTML = tableRow
          }
        }
        function getBook() {
          let dataBuku = JSON.parse(localStorage.getItem("books")) || []
          allBooks = dataBuku

          let dataSudahDibaca = allBooks.filter((book) => book.isComplete == true)
          let dataBelumDibaca = allBooks.filter((book) => book.isComplete == false)
          showTableRow(dataSudahDibaca, true)
          showTableRow(dataBelumDibaca, false)
        }

        function addTableRow(dataListBook) {
          dataListBook.length == 0 ? 
          document.querySelector('#rowTableListBook').classList.add('d-none') : 
          document.querySelector('#rowTableListBook').classList.remove('d-none')
          let tableRow = ``;
          dataListBook.forEach(data => {
            tableRow += `<tr>
                            <td>${data.title}</td>
                            <td>${data.author}</td>
                            <td>${data.year}</td>
                            <td>
                              ${data.isComplete == false ? 
                                `<span class="badge bg-warning">Belum</span>`
                              :
                                `<span class="badge bg-success">Sudah</span>`
                              }
                            </td>
                            <td>
                              <button class="btn btn-sm btn-danger" id="btnHapusListBook" data-id="${data.id}"><i class="bi bi-trash" id="btnHapusListBook" data-id="${data.id}"></i></button>
                            </td>
                          </tr>`
          });
          document.querySelector('#tableBody').innerHTML = tableRow
        }

        function hapusBuku(param) {
          let indeksByParam = allBooks.findIndex((function (e) {
            return e.id === Number(param)
          }))
          allBooks.splice(indeksByParam, 1)
          setBook()
          getBook()
        }

        window.addEventListener('load', function() {
          getBook()
        })

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

        document.addEventListener('click', function(e) {
            if(e.target.id === "btnSudahDibaca") {
                addClassToButton(e.target)
                removeClassFromButton("#btnBelumDibaca")
                hideAnotherTable("#belumDibaca")
            } 
            if(e.target.id === "btnBelumDibaca") {
                addClassToButton(e.target)
                removeClassFromButton("#btnSudahDibaca")
                hideAnotherTable("#sudahDibaca")
            }

            if(e.target.id === "btnListBuku") {
              e.preventDefault()
              validateInput("listBuku") && listBook()
            }
            if(e.target.id === "btnHapusBuku") {
              e.preventDefault()
                Swal.fire({
                    title: 'Hapus Buku?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        hapusBuku(e.target.getAttribute('data-id'))
                        Swal.fire(
                        'Terhapus!',
                        'Data Buku telah Terhapus.',
                        'success'
                        )
                        document.querySelector('#btnClose').click()
                    }
                })
            }
            if(e.target.id === "btnEditBuku") {
              e.preventDefault()
              let dataBuku = allBooks.filter((buku) => buku.id === Number(e.target.getAttribute('data-id')))
              const inputEditBook = document.querySelectorAll('.inputEditBook')
              inputEditBook[0].value = dataBuku[0].title
              inputEditBook[1].value = dataBuku[0].author
              inputEditBook[2].value = parseInt(dataBuku[0].year)
              document.querySelector('#btnUpdateBuku').setAttribute('data-id', dataBuku[0].id)
              if(dataBuku[0].isComplete) {
                inputEditBook[3].setAttribute('checked', true)
              } else {
                inputEditBook[3].removeAttribute('checked')
              }
            }

            if(e.target.id === "btnUpdateBuku") {
              e.preventDefault()
              validateInput("updateBuku") && 
              Swal.fire({
                    title: 'Update Buku?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, update it!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        updateBook(e.target.getAttribute('data-id'))
                        Swal.fire(
                        'Terupdate!',
                        'Data Buku telah Terupdate.',
                        'success'
                        )
                        document.querySelector('#btnClose').click()
                    }
                })
              
            }

            if(e.target.id === "btnHapusListBook") {
              e.preventDefault()
              e.target.closest('tr').remove()
              let indeksByParam = newListBook.findIndex((function (z) {
                return z.id === Number(e.target.getAttribute('data-id'))
              }))
              newListBook.splice(indeksByParam, 1)
              allBooks = newListBook
            }
            
            if(e.target.id === "btnSimpan") {
                e.preventDefault()
                Swal.fire({
                    title: 'Simpan Buku?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Save it!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        setBook()
                        Swal.fire(
                        'Tersimpan!',
                        'Data Buku telah Tersimpan.',
                        'success'
                        )
                        document.querySelector('#btnClose').click()
                    }
                })
            }
        })