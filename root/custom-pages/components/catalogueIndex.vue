<script lang="ts" setup>
import { computed, ref } from 'vue';

// ignore the error, vitepress needs the destructure
import { data } from '../../build-time-data/documents.data';

enum CATALOGUE_TYPE {
  BY_TIME,
  BY_AUTHOR,
}
let catalogueType = ref(CATALOGUE_TYPE.BY_TIME);

const postsList = computed(() => {
  const { catalogueWithTime = {}, catalogueWithAuthor = {} } = data;

  return catalogueType.value === CATALOGUE_TYPE.BY_TIME
    ? catalogueWithTime
    : catalogueWithAuthor;
});

function setCatalogue(value) {
  catalogueType.value = value;
}
</script>

<template>
  <div :class="$style.pageContainer">
    <div>
      <div :class="$style.buttons">
        <div
          @click="setCatalogue(CATALOGUE_TYPE.BY_TIME)"
          :class="{ [$style.active]: catalogueType === CATALOGUE_TYPE.BY_TIME }"
        >
          按时间归档
        </div>
        <div
          @click="setCatalogue(CATALOGUE_TYPE.BY_AUTHOR)"
          :class="{
            [$style.active]: catalogueType === CATALOGUE_TYPE.BY_AUTHOR,
          }"
        >
          按作者归档
        </div>
      </div>
      <div :class="$style.menu">
        <div
          v-for="(catalogue, index) in Object.keys(postsList)"
          :key="index"
          :class="$style.catalogue"
        >
          <h3>{{ catalogue }}</h3>
          <ul>
            <li
              v-for="(document, documentIndex) in postsList[catalogue]"
              :key="`${index}-${documentIndex}`"
            >
              <a :href="document.url">{{ document.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" module>
.buttons {
  display: flex;
  margin-top: 50px;
  div {
    border: solid 2px var(--vp-c-text-1);
    padding: 4px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s;
    &:not(:last-child) {
      margin-right: 8px;
    }
    &.active {
      color: var(--vp-c-brand);
      border-color: var(--vp-c-brand);
    }
    &:hover {
      color: var(--vp-c-brand);
      border-color: var(--vp-c-brand);
    }
  }
}

.pageContainer {
  display: flex;
  justify-content: center;
  padding: 0 32px;

  .menu {
    margin-top: 30px;
    .catalogue {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
    h3 {
      font-weight: bold;
    }
    ul {
      margin-top: 10px;
      li {
        color: var(--vp-c-brand);
        &:hover {
          text-decoration: underline;
        }
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
