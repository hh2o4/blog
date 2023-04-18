<script lang="ts" setup>
import { computed, ref } from 'vue';

// ignore the error, vitepress needs the destructure
import { data } from '../../build-time-data/documents.data';

enum CATALOGUE_TYPE {
  BY_TIME,
  BY_AUTHOR,
}
let catalogueType = ref(CATALOGUE_TYPE.BY_TIME);

const postsList = computed(async () => {
  const { catalogueWithTime = {}, catalogueWithAuthor = {} } = data;

  return catalogueType.value === CATALOGUE_TYPE.BY_TIME
    ? catalogueWithTime
    : catalogueWithAuthor;
});

function setCatalogue(e) {
  catalogueType.value = e.value;
}
</script>

<template>
  <div :class="$style.buttons">
    <div>按时间归档</div>
    <div>按作者归档</div>
  </div>
  <div>
    <div v-for="(catalogue, index) in Object.keys(postsList)" :key="index">
      <h1>{{ catalogue }}</h1>
      <ul>
        <li
          v-for="(document, documentIndex) in postsList(catalogue)"
          :key="`${index}-${documentIndex}`"
        >
          <a :href="document.url">{{ document.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" module>
.buttons {
  display: flex;
}
</style>
