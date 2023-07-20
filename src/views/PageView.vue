<!-- 1. Log page > call API that returns the page data
1. Loads a page, based on the server response, calls the correct external component, -->

<template>
    <h1>Page ID: {{ pageID }}</h1>
    <component :is="dynamicComponent" :data="data"></component>
</template>

<script>
import { markRaw } from "vue";
import apiService from '../apiService';

export default {
    data() {
        return {
            dynamicComponent: null,
            page: '',
            serverResponse: {
                module:"",
                pageid:"",
                mode:"",
                session:"",
                request:{},
                grid:[],
                event:[],
                status:"",
                message:"",
                userid:"",
                header:{}
            },
            data: {},
            // data: {
            //     headerRes: {
            //         isAdd: false,
            //         isEdit: true,
            //         isDelete: true,
            //         enabled: true,
            //     },
            //     formRes:[
            //     {
            //         _id: 1,
            //         label: "Text field",
            //         type: "textField",
            //         value: "",
            //         defaultValue: "type 123",
            //         enabled: true,
            //         icon: true,
            //         regex: "^[a-zA-Z]+$", // key down
            //         maxLength: 5,
            //         visible: true,
            //         errFocus: false,
            //         required: true,
            //         labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
            //         sendBackServer: true,
            //     },
            //     { // set special day
            //         _id: 2,
            //         label: "Date field",
            //         type: "dateField",
            //         value: "",
            //         defaultValue: "07/13/2023",
            //         dateFormat: "dd/mm/yy",
            //         enabled: true,
            //         icon: true,
            //         visible: true,
            //         errFocus: false,
            //         required: false,
            //         labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
            //         format: "",
            //         sendBackServer: true
            //     },
            //     {
            //         _id: 3,
            //         label: "Number field",
            //         type: "numberField",
            //         value: "",
            //         defaultValue: 13,
            //         enabled: true,
            //         icon: false,
            //         regex: "^[0-9]+$",
            //         maxLength: 10,
            //         visible: true,
            //         errFocus: false,
            //         required: false,
            //         labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
            //         sendBackServer: true
            //     },
            //     { // show password
            //         _id: 4,
            //         label: "Password field",
            //         type: "passwordField",
            //         inputType: "password",
            //         value: "",
            //         defaultValue: "password",
            //         enabled: true,
            //         icon: false,
            //         maxLength: 18,
            //         visible: true,
            //         errFocus: false,
            //         required: true,
            //         labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
            //         sendBackServer: true
            //     }],
            //     tableRes: {
            //         rows: 5,
            //         pagination: true,
            //         rowHover: true, // can put more
            //         columns: [
            //             { name: "Status", field: "status", visible: true, minWidth: "min-width: 6rem"},
            //             { name: "ID", field: "id", visible: true , minWidth: "min-width: 5rem"},
            //             { name: "Name", field: "name", visible: true , minWidth: "min-width: 12rem"},
            //             { name: "Age", field: "age", visible: true , minWidth: "min-width: 5rem"},
            //             { name:"Networth", field:"networth", visible: true , minWidth: "min-width: 12rem"},
            //             { name:"Amount", field:"amount", visible: true , minWidth: "min-width: 6rem"}
            //         ],
            //         data: [
            //             { status: 'Active', id: 1, name: 'John', age: 21, networth: 50, currency: "RM", amount: 30200},
            //             { status: 'Inactive', id: 2, name: 'Jane', age: 22, networth: 3540 , currency: "RM", amount: 30100},
            //             { status: 'Active', id: 3, name: 'Bob', age: 23, networth: 42101 , currency: "RM", amount: 30050},
            //             { status: 'Inactive', id: 4, name: 'Alice', age: 24, networth: 64573 , currency: "RM", amount: 30040},
            //             { status: 'Active', id: 5, name: 'Mike', age: 25, networth: 5431 , currency: "RM", amount: 30020},
            //             { status: 'Active', id: 6, name: 'Sarah', age: 26, networth: 432311 , currency: "RM", amount: 30100},
            //             { status: 'Inactive', id: 7, name: 'David', age: 27, networth: 631 , currency: "RM", amount: 30050},
            //             { status: 'Active', id: 8, name: 'Emily', age: 28, networth: 769553 , currency: "RM", amount: 30040},
            //             { status: 'Inactive', id: 9, name: 'Michael', age: 29, networth: 1436, currency: "RM", amount: 30300 },
            //             { status: 'Active', id: 10, name: 'Olivia', age: 30, networth: 13582, currency: "RM", amount: 300 }
            //         ],
            //     },
            // }
        }
    },
    created() {
        this.pageID = this.$route.params.pageID;
        // Fetch data from the API
        apiService.fetchData()
            .then(response => {
                this.data = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        this.loadComponent();
    },
    methods: {
        loadComponent() {
            // C:\\Users\\SebastianSoon\\Project\\HelloWorld.vue
            import('../../../ExternalVue.vue')
            .then(component => {
                this.dynamicComponent = markRaw(component.default || component);
            })
            .catch(error => {
                console.error('Failed to load component:', error);
            });
        }
    }
}
</script>