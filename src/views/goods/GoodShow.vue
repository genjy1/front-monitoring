<template>
  <HeaderComponent />
  <div class="container mt-28 w-4/5 mx-auto my-0" :class="isSending ? 'cursor-wait' : ''">
    <div class="errors-wrapper">
      <ErrorMessageComponent :text="serverError" v-if="serverError" />
      <Preloader v-if="isLoading" />
    </div>
    <div class="card-wrapper lg:grid md:grid-cols-2 gap-[20px]" v-bind="$attrs">
      <div class="image-wrapper bg-[#F1F1F1] rounded">
        <img
          :src="good.image === null ? placeholder : `http://127.0.0.1:8000/${good.image}`"
          :alt="`${good.name} image`"
          class="rounded-lg lg:size-96 mx-auto my-0 lg:relative lg:my-16"
          crossorigin="anonymous"
        />
      </div>
      <div
        class="info-wrapper justify-between flex flex-col bg-[#F1F1F1] sm:rounded-3xl sm:px-4 sm:py-4 sm:border-2 border rounded border-[#3D4070] py-2 px-2 sm:mt-0 mt-8"
      >
        <header class="header sm:rounded-lg sm:px-4 sm:border-2 border-[#3D4070] self-start w-full">
          <h1
            class="info-header uppercase text-3xl tracking-wide text-center font-medium md:capitalize"
          >
            {{ good.name }}
          </h1>
        </header>
        <div class="info-container lg:self-end">
          <div class="characteristics-wrapper grid md:grid-cols-3 gap-4">
            <div class="char-wrapper flex flex-col gap-2">
              <span class="px-4">Код товара</span>
              <div
                class="border sm:border-2 rounded-full px-4 py-2 border-[#3D4070] flex items-center justify-between hover:bg-[#3D4070] hover:text-white transition-all ease-linear"
                :title="good.code"
              >
                {{ shortenedMessage(good.code) + '...' }}
                <button type="button" @click="copyText(good.code)" class="hover:text-white">
                  <CopyIcon class="hover:text-white" />
                </button>
              </div>
            </div>
            <div class="char-wrapper flex flex-col gap-2">
              <span class="px-4">Остаток</span>
              <div
                class="border sm:border-2 rounded-full px-4 py-2 border-[#3D4070] flex items-center justify-between hover:bg-[#3D4070] hover:text-white transition-all ease-linear"
              >
                {{ good.remains }}
                <button type="button" @click="copyText(good.remains)" class="hover:text-white">
                  <CopyIcon class="hover:text-white text-white" />
                </button>
              </div>
            </div>
            <div class="char-wrapper flex flex-col gap-2">
              <span class="px-3 text-nowrap">Срок годности</span>
              <div
                class="border sm:border-2 rounded-full px-4 py-2 border-[#3D4070] flex items-center justify-between hover:bg-[#3D4070] hover:text-white transition-all ease-linear"
              >
                {{ good.valid || 'Истёк' }}
                <button
                  type="button"
                  @click="copyText(good.valid || 'Истёк')"
                  class="hover:text-white"
                >
                  <CopyIcon class="hover:text-white" />
                </button>
              </div>
            </div>
            <div
              class="char-wrapper flex flex-col gap-2 px-1 lg:col-span-3 sm:px-6 sm:py-3 sm:border-2 sm:rounded-lg sm:border-[#3D4070]"
            >
              <p class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa dolorum!
                Officiis deserunt, quos cupiditate dolore, maxime labore cum unde eveniet molestiae
                adipisci aliquam pariatur praesentium corporis ad impedit optio. Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Sapiente voluptate voluptatem repudiandae
                laboriosam iste ad adipisci, fugit rem modi nemo corporis perferendis dolore aut
                quae autem labore expedita nisi architecto?
              </p>
            </div>
          </div>
        </div>
        <div class="edit-btn__wrapper flex">
          <button
            class="edit-btn absolute lg:static top-[7.5rem] right-10 bg-white/50 backdrop-blur lg:bg-transparent border-2 w-12 border-[#3D4070] px-4 py-2 lg:w-full rounded-lg h-12 hover:bg-[#3D4070] hover:text-white transition-all sm:self-end self-start"
            @click="openModal()"
          >
            <div class="hidden lg:block">Редактировать</div>
            <div class="lg:hidden block w-6 relative right-1.5"><EditIcon /></div>
          </button>
        </div>
      </div>
    </div>
    <div
      class="overlay fixed top-0 left-0 z-[9999] backdrop-blur w-screen h-screen"
      v-if="isOpen"
      @click="isOpen = false"
    >
      <div class="modal w-4/5 lg:w-2/5 mx-auto mt-24 rounded-lg" @click.stop>
        <header
          class="modal-header flex items-center justify-between bg-white border-2 border-[#3D4070] rounded-lg px-8 py-4"
        >
          <span>Редактирование товара {{ `#${good.id}` }}</span>
          <button class="close" @click="handleClose()"><CloseIcon /></button>
        </header>
        <div class="modal-body bg-white border-2 border-[#3D4070] rounded-lg px-8 py-8 mt-8">
          <form @submit.prevent="postGood" class="grid grid-rows-2 gap-16">
            <input
              type="text"
              v-model="changes.code"
              placeholder="Код товара"
              class="px-4 py-4 border-2 border-[#3D4070] rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#656ab8] transition-all"
            />
            <input
              type="text"
              v-model="changes.name"
              placeholder="Наименование"
              class="px-4 py-4 border-2 border-[#3D4070] rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#656ab8] transition-all"
            />
            <div class="file-input-wrapper">
              <!-- Скрытый input -->
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                class="hidden"
                @input="handleFileChange"
              />
              <!-- Кастомная кнопка -->
              <label
                for="fileInput"
                class="custom-button border-[#3D4070] rounded-lg bg-white transition-all flex items-center justify-between text-gray-500 hover:cursor-pointer"
              >
                {{ 'Выбрать изображение' }}
                <ChooseImage />
              </label>
              <!-- Превью изображения -->
              <div v-if="previewUrl" class="image-preview">
                <img :src="previewUrl" alt="Preview" class="preview-image max-w-[128px]" />
              </div>
            </div>
            <button
              type="submit"
              class="px-4 py-4 border-2 border-[#3D4070] rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#656ab8] transition-all"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessageComponent from '@/components/messages/ErrorMessageComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import Preloader from '@/components/Preloader.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import ChooseImage from '@/components/icons/ChooseImage.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const isSending = ref(false)
const route = useRoute()
const id = route.params.id
const isLoading = ref(true)
const serverError = ref('')
const good = ref([])
const isOpen = ref(false)
const changes = ref({
  name: '',
  code: '',
  image: null,
})
const selectedFileName = ref('') // Имя файла
const previewUrl = ref('') // URL для предпросмотра
const textToCopy = ref(null)
const image = ref()
const placeholder = '/src/assets/placeholder.png'

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    console.log('Текст скопирован:', text)
  } catch (err) {
    console.error('Ошибка при копировании:', err)
  }
}

// Обработчик изменения файла
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFileName.value = file.name

    // Генерация URL для предпросмотра
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
    }
    reader.readAsDataURL(file)

    // Сохраняем файл в changes
    changes.value.image = file
  }
}

// Открытие модального окна
const openModal = () => {
  isOpen.value = !isOpen.value
}

// Отправка данных
const postGood = async () => {
  try {
    const formData = new FormData()
    formData.append('name', changes.value.name)
    formData.append('code', changes.value.code)
    formData.append('image', changes.value.image)

    const response = await axios.post(`/good/${id}/update`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    console.log(response)
  } catch (error) {
    console.error('Error updating:', error)
  }
}

const toBase64 = (userFile) => {
  return new Promise((resolve, reject) => {
    if (!userFile) {
      reject(new Error('No file selected!'))
      return
    }

    const reader = new FileReader()

    // Resolve the promise with the result on successful reading
    reader.onload = () => {
      resolve(reader.result)
    }

    // Reject the promise on error
    reader.onerror = (error) => {
      reject(error)
    }

    // Read the file as a data URL
    reader.readAsDataURL(userFile)
  })
}

const shortenedMessage = (message) => {
  // Проверяем, что message - это строка
  if (typeof message !== 'string') {
    return '' // Если это не строка, возвращаем пустую строку
  }

  // Обрезаем строку, если её длина больше 16
  return message.length > 8 ? message.slice(0, 8) : message
}
const handleClose = () => {
  isOpen.value = false // Закрытие модального окна
  changes.value = {
    // Очистка данных формы
    name: '',
    code: '',
    file: null, // Сбрасываем файл
  }
}

const getGood = async (id) => {
  try {
    const response = await axios.get(`/good/${id}/show`)
    good.value = response.data.good
  } catch (error) {
    console.error('Ошибка:', error.response || error.message)
    serverError.value = 'Ошибка при загрузке данных.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getGood(id)
})
</script>
<style scoped>
.custom-button {
  border: 2px solid #3d4070;
  padding: 1rem 1rem;
  border-radius: 12px;
  background-color: white;
  outline: none;
  transition: all 0.3s;
}

.custom-button:focus {
  outline: 2px solid #656ab8;
}
</style>
