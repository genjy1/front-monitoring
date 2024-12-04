<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <!-- <h4 class="text-lg font-semibold text-gray-700">{{ title }}</h4> -->
        <button type="button" class="text-gray-500 hover:text-gray-700" @click="$emit('close')">
          <span class="text-xl font-bold">&times;</span>
        </button>
      </div>

      <!-- Body -->
      <div class="p-4 space-y-4">
        <div class="text-sm text-gray-600">
          <p>
            В этом окне отображаются все параметры выбранной позиции или нескольких выбранных
            позиций.
          </p>
          <p>
            Если поле отмечено звездочкой, значит его значение различается для нескольких выбранных
            позиций. Если вы введете новое значение, оно будет сохранено для каждой из них. Для
            сброса изменений закройте это окно.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 border border-gray-200">
            <tbody>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Товар</td>
                <td class="px-4 py-2">
                  <select
                    v-model="form.productCode"
                    class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  >
                    <option value="">Выберите товар...</option>
                    <!-- <option v-for="product in products" :key="product.id" :value="product.code">
                      {{ product.name }}
                    </option> -->
                  </select>
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Код позиции</td>
                <td class="px-4 py-2">{{ form.positionCode }}</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Режим</td>
                <td class="px-4 py-2">
                  <div class="flex items-center space-x-4">
                    <label class="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="enabled"
                        value="1"
                        class="text-indigo-500 focus:ring-indigo-300"
                        v-model="form.enabled"
                      />
                      <span>Включить</span>
                    </label>
                    <label class="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="enabled"
                        value="0"
                        class="text-indigo-500 focus:ring-indigo-300"
                        v-model="form.enabled"
                      />
                      <span>Выключить</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Блокирована</td>
                <td class="px-4 py-2">Да</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Доступна</td>
                <td class="px-4 py-2">Да</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Наименование позиции</td>
                <td class="px-4 py-2">
                  <input
                    v-model="form.name"
                    name="name"
                    type="text"
                    class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    placeholder="Наименование позиции"
                    maxlength="20"
                  />
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Цена</td>
                <td class="px-4 py-2">
                  <input
                    v-model="form.price"
                    name="price"
                    type="number"
                    class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    placeholder="Цена товара"
                    min="0"
                    step="0.01"
                  />
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">НДС</td>
                <td class="px-4 py-2">0</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Акциз</td>
                <td class="px-4 py-2">0</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Емкость</td>
                <td class="px-4 py-2">0</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Остаток</td>
                <td class="px-4 py-2">0</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Срок хранения</td>
                <td class="px-4 py-2">0</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Годен до</td>
                <td class="px-4 py-2">
                  <input
                    v-model="form.expDatetime"
                    id="exp_datetime"
                    name="exp_datetime"
                    type="datetime-local"
                    class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Доворот</td>
                <td class="px-4 py-2">Да</td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray-600">Независимая</td>
                <td class="px-4 py-2">
                  <div class="flex items-center space-x-4">
                    <label class="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="independent"
                        value="1"
                        class="text-indigo-500 focus:ring-indigo-300"
                        v-model="form.independent"
                      />
                      <span>Да</span>
                    </label>
                    <label class="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="independent"
                        value="0"
                        class="text-indigo-500 focus:ring-indigo-300"
                        v-model="form.independent"
                      />
                      <span>Нет</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-4 py-2 font-medium text-gray">Дополнительная выдача</td>
                <td class="px-4 py-2">Да</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end px-4 py-2 border-t border-gray-200">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          @click="$emit('close')"
        >
          Закрыть
        </button>
        <button
          type="button"
          class="ml-2 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
          @click="$emit('save')"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  productCode: '',
  positionCode: '111',
  enabled: '1',
  name: '',
  price: '',
  expDatetime: '',
  independent: '1',
})
defineProps({
  title: String,
  form: Object,
  products: Array,
})
</script>
