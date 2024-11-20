import { defineStore } from 'pinia'

export const useGoodsStateColumnsStore = defineStore('columns', {
  state: () => ({
    number: [true, 'Номер автомата'],
    address: [false, 'Адрес'],
    machine: [false, 'Автомат'],
    goodNumber: [false, 'Номер продукта'],
    goodCode: [false, 'Код продукта'],
    good: [false, 'Продукт'],
    valid: [false, 'Годен до'],
    capacity: [false, 'Вместимость'],
    remains: [false, 'Остаток'],
    add: [false, 'Добавить'],
  }),
  actions: {
    toggleColumn(column) {
      column[0] = !column[0] // Переключение состояния видимости столбца
      this.saveColumns() // Сохраняем изменения сразу
    },
    loadColumns() {
      const savedColumns = localStorage.getItem('columns')
      if (savedColumns) {
        const parsedColumns = JSON.parse(savedColumns)
        Object.keys(parsedColumns).forEach((key) => {
          this[key] = parsedColumns[key]
        })
      }
    },
    saveColumns() {
      localStorage.setItem('columns', JSON.stringify(this.$state))
    },
  },
})
