<template>
  <div>
    <h3>{{ this.numCom.header }}</h3>
    <input type="email" name = "email" placeholder="Number" v-model="this.numCom.value"/>
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
      numCom: this.parentData
    }
  }
}
</script>

<style scoped>
</style>
