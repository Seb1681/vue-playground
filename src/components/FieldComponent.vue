<template>
    <div>
        <h3>{{ this.textCom.header }}</h3>
        <input type="email" name = "email" placeholder="Field" v-model="this.textCom.value"/>
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
        textCom: this.parentData
    }
  }
}
</script>

  