<template>
  <div>
    <div class="shadow-wrapper">
      <form
        role="form"
        method="patch"
        class="space-y-6 modal w-5/6 mx-auto p-4 bg-white rounded-lg shadow-lg overflow-y-scroll h-[435px] lg:h-[900px]"
        @submit.prevent="updateSettings"
      >
        <div class="modal-header flex items-center justify-between">
          <h3>Настройки онлайн-кассы</h3>
          <button type="button" @click="$emit('close')">
            <CloseIcon />
          </button>
        </div>

        <!-- Провайдер -->
        <div class="grid gap-2">
          <label for="provider" class="text-sm font-medium text-gray-700"> Провайдер </label>
          <select
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            name="okkm[provider]"
            id="provider"
            v-model="form.provider"
          >
            <option value="0">nanokassa.ru</option>
            <option value="1">initpro.ru</option>
            <option value="2">orangedata.ru</option>
            <option value="3">rekassa.kz</option>
            <option value="4">initpro.ru (V2)</option>
          </select>
          <span v-if="errors.provider" class="text-red-500 text-xs">{{ errors.provider }}</span>
        </div>

        <!-- ИНН -->
        <div class="grid gap-2">
          <label for="inn" class="text-sm font-medium text-gray-700"> ИНН </label>
          <input
            type="text"
            name="okkm[inn]"
            id="inn"
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            v-model="form.inn"
          />
          <span v-if="errors.inn" class="text-red-500 text-xs">{{ errors.inn }}</span>
        </div>

        <!-- Группа -->
        <div class="grid gap-2">
          <label for="group" class="text-sm font-medium text-gray-700"> Группа </label>
          <input
            type="text"
            name="okkm[group]"
            id="group"
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            v-model="form.group"
          />
          <span v-if="errors.group" class="text-red-500 text-xs">{{ errors.group }}</span>
        </div>

        <!-- Версия ФФД -->
        <div class="grid gap-2">
          <label for="ffd_version" class="text-sm font-medium text-gray-700"> Версия ФФД </label>
          <select
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            name="okkm[ffd_version]"
            id="ffd_version"
            v-model="form.ffd_version"
          >
            <option value="2">1.05</option>
            <option value="4">1.20</option>
          </select>
        </div>

        <!-- Адрес установки автомата -->
        <div class="grid gap-2">
          <label for="kassa_vend_address" class="text-sm font-medium text-gray-700">
            Адрес установки автомата
          </label>
          <input
            type="text"
            name="okkm[kassa_vend_address]"
            id="kassa_vend_address"
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            v-model="form.kassa_vend_address"
          />
          <span v-if="errors.kassa_vend_address" class="text-red-500 text-xs">{{
            errors.kassa_vend_address
          }}</span>
        </div>

        <!-- Адрес установки автомата -->
        <div class="grid gap-2">
          <label for="kassa_vend_address" class="text-sm font-medium text-gray-700">
            Место установки автомата
          </label>
          <input
            type="text"
            name="okkm[kassa_vend_address]"
            id="kassa_vend_address"
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            v-model="form.kassa_vend_place"
          />
          <span v-if="errors.kassa_vend_place" class="text-red-500 text-xs">{{
            errors.kassa_vend_place
          }}</span>
        </div>

        <!-- Адрес установки автомата -->
        <div class="grid gap-2">
          <label for="machine_number" class="text-sm font-medium text-gray-700">
            Номер автомата
          </label>
          <input
            type="text"
            name="okkm[machine_number]"
            id="machine_number"
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            v-model="form.machine_number"
          />
          <span v-if="errors.kassa_vend_place" class="text-red-500 text-xs">{{
            errors.kassa_vend_place
          }}</span>
        </div>

        <!-- Адрес установки автомата -->
        <div class="grid gap-2">
          <label for="rezhim_nalog" class="text-sm font-medium text-gray-700">
            Система налогообложения
          </label>
          <select
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 w-11/12"
            name="okkm[rezhim_nalog]"
            id="rezhim_nalog"
            v-model="form.ffd_version"
          >
            <option value="0">Общая система налогообложения</option>
            <option value="1">Упрощенная доход</option>
            <option value="2">Упрощенная доход минус расход</option>
            <option value="3">Единый налог на вмененный доход</option>
            <option value="4">Единый сельскохозяйственный налог</option>
            <option value="5" selected="selected">Патентная система налогообложения</option>
          </select>
          <span v-if="errors.kassa_vend_place" class="text-red-500 text-xs">{{
            errors.kassa_vend_place
          }}</span>
        </div>

        <div class="grid gap-2">
          <label for="product_nds" class="text-sm font-medium text-gray-700"> НДС на товары </label>
          <select
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            name="okkm[product_nds]"
            id="product_nds"
            v-model="form.ffd_version"
          >
            <option value="0">Ставка НДС 5%</option>
            <option value="1">Ставка НДС 7%</option>
            <option value="2">Ставка НДС 20%</option>
            <option value="3">Ставка НДС 10%</option>
            <option value="4">Ставка НДС 20/120</option>
            <option value="5">Ставка НДС 10/110</option>
            <option value="6">Ставка НДС 0</option>
            <option value="7" selected="selected">Без НДС</option>
          </select>
          <span v-if="errors.kassa_vend_place" class="text-red-500 text-xs">{{
            errors.kassa_vend_place
          }}</span>
        </div>

        <div class="grid gap-2 w-3/5">
          <label for="okkm[priznak_sposoba_rascheta]" class="text-sm font-medium text-gray-700">
            Признак способа расчета
          </label>
          <select
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            name="okkm[okkm[priznak_sposoba_rascheta]"
            id="okkm[priznak_sposoba_rascheta]"
            v-model="form.ffd_version"
          >
            <option value="1" selected="selected">
              Полная предварительная оплата до момента передачи предмета расчета
            </option>
            <option value="2">
              Частичная предварительная оплата до момента передачи предмета расчета
            </option>
            <option value="3">Аванс</option>
            <option value="4">
              Полная оплата, в том числе с учетом аванса (предварительной оплаты) в момент передачи
              предмета расчета
            </option>
            <option value="5">
              Частичная оплата предмета расчета в момент его передачи с последующей оплатой в кредит
            </option>
            <option value="6">
              Передача предмета расчета без его оплаты в момент его передачи с последующей оплатой в
              кредит
            </option>
            <option value="7">
              Оплата предмета расчета после его передачи с оплатой в кредит (оплата кредита)
            </option>
          </select>
          <span v-if="errors.kassa_vend_place" class="text-red-500 text-xs">{{
            errors.kassa_vend_place
          }}</span>
        </div>

        <div class="grid gap-2">
          <label for="priznak_predmeta_rascheta" class="text-sm font-medium text-gray-700">
            Признак предмета рассчета
          </label>
          <select
            class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            name="okkm[priznak_predmeta_rascheta]"
            id="priznak_predmeta_rascheta"
            v-model="form.ffd_version"
          >
            <option value="1" selected="selected">
              Реализуемый товар, за исключением подакцизного товара (1)
            </option>
            <option value="2">Реализуемый подакцизный товар (2)</option>
            <option value="3">Выполняемая работа (3)</option>
            <option value="4">Оказываемая услуга (4)</option>
            <option value="5">
              Прием ставок при осуществлении деятельности по проведению азартных игр (5)
            </option>
            <option value="6">
              Выплата денежных средств в виде выигрыша при осуществлении деятельности по проведению
              азартных игр (6)
            </option>
            <option value="8">
              Выплата денежных средств в виде выигрыша при осуществлении деятельности по проведению
              лотерей (8)
            </option>
            <option value="9">
              Предоставление прав на использование результатов интеллектуальной деятельности или
              средств индивидуализации (9)
            </option>
            <option value="10">
              Аванс, задаток, предоплата, кредит, взнос в счет оплаты, пеня, штраф, вознаграждение,
              бонус и иной аналогичный предмет расчета (10)
            </option>
            <option value="11">
              Вознаграждение пользователя, являющимся платежным агентом (11)
            </option>
            <option value="12">
              Предмет расчета, состоящем из предметов, каждому из которых может быть присвоено
              значение от «1» до «11» (12)
            </option>
            <option value="13">
              Предмет расчета, не относящемуся к предметам расчета, которым может быть присвоено
              значение от «1» до «12» (13)
            </option>
          </select>
          <span v-if="errors.kassa_vend_place" class="text-red-500 text-xs">{{
            errors.kassa_vend_place
          }}</span>
        </div>

        <div class="grid gap-2">
          <label for="">Email для отправки чеков</label
          ><input type="email" name="" id="" class="border rounded py-2 px-4" />
        </div>

        <!-- Кнопка Сохранить -->
        <div class="pt-4">
          <button
            type="submit"
            name="command"
            value="okkm_settings_save"
            class="btn btn-primary px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            :disabled="isSubmitting"
          >
            <span class="glyphicon glyphicon-ok"></span>
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CloseIcon from '../icons/CloseIcon.vue'
import axios from 'axios'

defineProps(['show'])

const route = useRoute()
const id = route.params.id

// Реактивные данные формы
const form = ref({
  provider: '',
  kassaid: '',
  kassatoken: '',
  inn: '',
  group: '',
  ffd_version: '',
  serial_number: '',
  kassa_vend_address: '',
})

// Объект для хранения ошибок
const errors = ref({
  provider: '',
  kassaid: '',
  kassatoken: '',
  inn: '',
  group: '',
  ffd_version: '',
  serial_number: '',
  kassa_vend_address: '',
})

const isSubmitting = ref(false)

const validateForm = () => {
  let valid = true
  errors.value = {
    provider: '',
    kassaid: '',
    kassatoken: '',
    inn: '',
    group: '',
    ffd_version: '',
    serial_number: '',
    kassa_vend_address: '',
  }

  if (!form.value.provider) {
    errors.value.provider = 'Провайдер обязателен'
    valid = false
  }
  if (!form.value.kassaid) {
    errors.value.kassaid = 'Уникальный номер кассы обязателен'
    valid = false
  }
  if (!form.value.kassatoken) {
    errors.value.kassatoken = 'Пароль для кассы обязателен'
    valid = false
  }
  if (!form.value.inn || !/^\d{10,12}$/.test(form.value.inn)) {
    errors.value.inn = 'ИНН должен быть числом длиной от 10 до 12 символов'
    valid = false
  }
  if (!form.value.group) {
    errors.value.group = 'Группа обязательна'
    valid = false
  }
  if (!form.value.ffd_version) {
    errors.value.ffd_version = 'Выберите версию ФФД'
    valid = false
  }
  if (!form.value.serial_number) {
    errors.value.serial_number = 'Серийный номер обязателен'
    valid = false
  }
  if (!form.value.kassa_vend_address) {
    errors.value.kassa_vend_address = 'Адрес установки автомата обязателен'
    valid = false
  }

  return valid
}

// Получение настроек
const getSettings = async () => {
  try {
    const response = await axios.get(`/machine/${id}/settings/kassa`)
    const settings = response.data.kassa_settings[0]
    const parsedSettings = JSON.parse(settings)

    if (settings) {
      // Обновляем свойства объекта form вручную
      form.value.provider = parsedSettings.provider || ''
      form.value.kassaid = parsedSettings.kassaid || ''
      form.value.kassatoken = parsedSettings.kassatoken || ''
      form.value.inn = parsedSettings.inn || ''
      form.value.group = parsedSettings.group || ''
      form.value.ffd_version = parsedSettings.ffd_version || ''
      form.value.serial_number = parsedSettings.serial_number || ''
      form.value.kassa_vend_address = parsedSettings.kassa_vend_address || ''
    } else {
      console.warn('Настройки не найдены.')
    }
  } catch (error) {
    console.error('Ошибка при получении настроек:', error)
  }
}

// Функция для обновления настроек
const updateSettings = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  try {
    const response = await axios.patch(`/machine/${id}/settings/kassa/update`, {
      online_kassa_data: form.value,
    })
    console.log('Обновление настроек прошло успешно:', response.data)
  } catch (error) {
    console.error('Ошибка при обновлении настроек:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Загружаем настройки при монтировании компонента
onMounted(() => {
  getSettings()
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
