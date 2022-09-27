
        

        window.addEventListener('load', function() {
          getBook()
        })
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

            if(e.target.id === "btnMoveRak") {
              e.preventDefault()
              Swal.fire({
                    title: 'Pindah Rak?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, move it!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        moveRak(e.target.getAttribute('data-id'))
                        Swal.fire(
                        'Terupdate!',
                        'Data Buku telah Terupdate.',
                        'success'
                        )
                    }
                })
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