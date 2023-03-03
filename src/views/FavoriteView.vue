<template>
  <div v-if="cards.length === 0" class="cards__not-found">Not Favorited Cities</div>
  <div v-if="cards" class="cards">
    <CardWeather
      v-for="(card, index) of cards"
      @delete-item="deleteItem"
      :card="card"
      :key="card.id"
      :index="index"
      :pageFavorited="true"
    />
  </div>
  <ModalWeather :is-open="arrModals[0].isModalOpen" @close="handleModalClose">
    <template #popup-text>
      Delete this card??
      <div class="popup__buttons">
        <button @click="deleteItem" class="button">Confirm</button>
        <button @click="handleModalClose" class="button">Cancel</button>
      </div>
    </template>
  </ModalWeather>
</template>

<script setup>
import CardWeather from '@/components/CardWeather.vue'
import { getItem } from '@/helpers/persistanceStorage.js'
import { onMounted } from 'vue'
import ModalWeather from '@/components/ModalWeather.vue'
import { useCards } from '@/composables/cards'

const { cards, arrModals, handleModalClose, deleteItem } = useCards(true)

onMounted(() => {
  const cardsFavorited = getItem('favorited_cards')
  if (cardsFavorited) {
    cards.value = [...cardsFavorited]
  }
})
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  &__not-found {
    text-align: center;
    margin-top: 100px;
    font-size: 30px;
    font-weight: 700;
  }
}
.add-new-card__button {
  margin-bottom: 20px;
  margin-left: auto;
  display: flex;
  max-width: 200px;
  @media (max-width: $mobileSmall) {
    width: 100%;
    max-width: 100%;
  }
}
</style>
