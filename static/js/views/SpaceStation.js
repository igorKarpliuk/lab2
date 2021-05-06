'use strict'

const SpaceStationModel = new SpaceStation() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#SpaceStation-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const SpaceStationData = {}
    formData.forEach((value, key) => {
        SpaceStationData[key] = value
    })

    SpaceStationModel.Create(SpaceStationData)
    e.target.reset()
  })
  form.addEventListener('delete',function(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const SpaceStationData = {}
    formData.forEach((value, key) => {
        SpaceStationData[key] = value
    })

    SpaceStationModel.Delete()
    e.target.reset()
  })
}

function initList () {
  window.jQuery('#SpaceStation-list').DataTable({
    data: SpaceStationModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Capacity', data: 'capacity' },
      { title: 'Need', data: 'need' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('SpaceStationsListDataChanged', function (e) {
    const dataTable = window.jQuery('#SpaceStation-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
