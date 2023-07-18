<template>
  <div class="autocomplete">
    <input
      type="text"
      class="w-full rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      @input="onChange"
      v-model="search"
      @keydown.tab="onArrowTab"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
    />
    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results bg-input"
    >
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchAutocomplete",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: -1,
    };
  },
  watch: {
    items: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.results = value;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit("selected", result);
    },
    filterResults() {
      this.results = this.items.filter((item) => {
        return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    onChange() {
      this.$emit("input", this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    onArrowTab(event) {
      event.preventDefault();
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      } else {
        this.arrowCounter = 0;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
  width: auto;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: auto;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #0d9488;
  color: black;
}
</style>
