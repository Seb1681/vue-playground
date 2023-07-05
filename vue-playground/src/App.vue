<template>
  <div>
    <input type="text" placeholder="Component name" v-model="headerName">
    <small v-if="invalid" style="color: red">*Component name is required</small>
    <br><br>
    <button @click="addNewField">Add new field</button>
    <button @click="addNewArea">Add new area</button>
    <button @click="addNewNumber">Add new number</button>
    <br>
    <div v-for="i in res" :key="i">
      <hr>
      <div v-if="i.hide">
        <button @click="i.hide = !i.hide">Unhide</button>
      </div>
      <div v-else>
        <button @click="i.hide = !i.hide">Hide</button>
        <br>
        <FieldComponent v-if="i.type=='text'" :parentData="i"/>
        <AreaComponent v-if="i.type=='area'" :parentData="i"/>
        <NumberComponent v-if="i.type=='number'" :parentData="i"/>
      </div>
    </div>
    <br>
    <hr>
    <br>
    <h3>Entered value</h3>
    <div v-for="item in this.res" :key="item.header">
      <div v-if="item.value">
        <p>{{ item.header }}: {{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FieldComponent from './components/FieldComponent';
import AreaComponent from './components/AreaComponent';
import NumberComponent from './components/NumberComponent';

export default {
  data(){
    return{
      headerName: '',
      invalid: false,
      display: [],
      count: 0,
      res: [
        // {
        //   "type": "area",
        //   "header": "Area Header",
        //   "hide": true,
        // },
        // {
        //   "type": "text",
        //   "header": "Text Header",
        //   "hide": false,
        // },
        // {
        //   "type": "number",
        //   "header": "Number Header",
        //   "hide": false,
        // },
      ]
    }
  },
  methods:{
    addNewField(){
      if (this.headerName == '') {
        this.invalid = true
        return
      }
      this.res.push({
        "type": "text",
        "header": this.headerName,
        "hide": false,
      })
      this.headerName = '';
      this.invalid = false

    },
    addNewArea(){
      if (this.headerName == '') {
        this.invalid = true
        return
      }
      this.res.push({
          "type": "area",
          "header": this.headerName,
          "hide": false,
        })
      this.headerName = '';
      this.invalid = false
    },
    addNewNumber(){
      if (this.headerName == '') {
        this.invalid = true
        return
      }
      this.res.push({
          "type": "number",
          "header": this.headerName,
          "hide": false,
        })
      this.headerName = '';
      this.invalid = false
    },
  },
  created() {
  },
  components: {
    FieldComponent,
    AreaComponent,
    NumberComponent
  }
}
</script>

<style>
</style>
