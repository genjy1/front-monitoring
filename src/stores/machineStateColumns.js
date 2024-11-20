// columnsStore.js
import { defineStore } from 'pinia'

export const useMachineStateColumnsStore = defineStore('columns', {
  state: () => ({
    number: [false, 'Номер'],
    name: [false, 'Имя'],
    address: [false, 'Адрес'],
    status: [false, 'Статус'],
    condition: [false, 'Состояние'],
    errors: [false, 'Ошибки'],
    waterLevel: [false, 'Уровень воды'],
    temperature: [false, 'Температура'],
    cashCounter: [false, 'Счётчик денег'],
    cashBox: [false, 'Кэшбокс'],
    stacker: [false, 'Стэкер'],
    change: [false, 'Сдача'],
    tubes: [false, 'Тубы'],
    recycling: [false, 'Рециклинг'],
    balance: [false, 'Баланс'],
    goodsSold: [false, 'Продано товаров'],
    revenue: [false, 'Выручка'],
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
