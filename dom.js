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
                                ${ data.isComplete == false ? 
                                `<button class="btn btn-sm btn-success" id="btnMoveRak" data-id="${data.id}" type="button" ><i class="bi bi-arrow-left-right" id="btnMoveRak" data-id="${data.id}" type="button" ></i> Pindah Rak</button>`
                                    : 
                                    `<button class="btn btn-sm btn-success" id="btnMoveRak" data-id="${data.id}" type="button" ><i class="bi bi-arrow-left-right" id="btnMoveRak" data-id="${data.id}" type="button" ></i> Pindah Rak</button>`
                                }
                                
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

function moveRak(param) {
    getBook()
    let indeksByParam = allBooks.findIndex((function (e) {
    return e.id === Number(param)
    }))
    const newData = {
    id: Number(param),
    title: allBooks[indeksByParam]["title"],
    author: allBooks[indeksByParam]["author"],
    year: Number(allBooks[indeksByParam]["year"]),
    isComplete: allBooks[indeksByParam]["isComplete"] == true ? false : true
    };
    allBooks[indeksByParam] = newData
    setBook()
    getBook()
}