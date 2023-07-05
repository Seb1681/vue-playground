<template>
  <div>
    <h3>{{ this.areaCom.header }}</h3>
    <textarea rows="2" cols="50" v-model="this.areaCom.value">
    </textarea>
  </div>
</template>

<script>
export default{
  props: {
        parentData: {
            type: Object,
            default() {
                return {
                }
            }
        }
  },
  data() {
    return {
      areaCom: this.parentData
    }
  }
}
</script>

<style scoped>
</style>
