<template>
    <div>
        <!-- Header -->
        <div class="card">
            <Toolbar>
                <template v-slot:start>
                    <Button :disabled="!headerRes.isAdd" label="Add" icon="pi pi-plus" class="p-button-success mr-2" />
                    <Button v-if="headerRes.isEdit" label="Edit" icon="pi pi-folder-open" class="p-button-warning mr-2" />
                    <Button v-if="headerRes.isDelete" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2" />
                </template>
                <template v-slot:end>
                    <Button @click="headerRes.enabled = true" label="Ok" icon="pi pi-check" class="p-button-success mr-2" />
                    <Button @click="headerRes.enabled = false" label="Cancel" icon="pi pi-times" class="p-button-danger mr-2" />
                    <a class="ml-2">Some Label - 912012</a>
                </template>
            </Toolbar>
        </div>

        <!-- Form inputs -->
        <div class="card">
            <div class="grid p-fluid mt-3">
                <div v-for="item in formRes" :key="item._id" class="field col-12 md:col-6">
                    <div v-if="item.visible">
                        <div v-if="item.type=='textField'">
                            <h6>{{ item.label }}  <span v-if="item.required" style="color: red">*</span></h6>
                            <span :class="{ 'p-input-icon-left' : item.icon }">
                                <!-- for now is a fixed icon -->
                                    <i v-if="item.icon" class="pi pi-user" />
                                    <InputText
                                        :class="{'p-invalid': item.errFocus}"
                                        type="text"
                                        :placeholder=item.defaultValue
                                        v-model="item.value"
                                        :disabled="!item.enabled"
                                        :maxlength="item.maxLength"
                                        @keydown="validateInput($event, item.regex)">
                                    </InputText>
                            </span>
                            <small v-if="item.errFocus" style="color: red;">Invalid input. Only alphabetic characters are allowed.<br/></small>
                            <small class="ml-1">{{ item.value.length }}/{{ item.maxLength }}</small>
                        </div>
                        <div v-else-if="item.type=='dateField'">
                            <h6>{{ item.label }}  <span v-if="item.required" style="color: red">*</span></h6>
                            <Calendar :showIcon="item.icon" :showButtonBar="true" v-model="item.value" :placeholder="item.defaultValue"
                            :dateFormat="item.dateFormat"></Calendar>
                        </div>
                        <div v-else-if="item.type=='numberField'">
                            <h6>{{ item.label }}  <span v-if="item.required" style="color: red">*</span></h6>
                            <span :class="{ 'p-input-icon-left' : item.icon }">
                                <!-- for now is a fixed icon -->
                                    <i v-if="item.icon" class="pi pi-user" />
                                    <InputText
                                        v-model="item.value"
                                        :class="{'p-invalid': item.errFocus}"
                                        type="text"
                                        :placeholder=item.defaultValue
                                        :disabled="!item.enabled"
                                        :maxlength="item.maxLength"
                                        @keydown="validateInput($event, item.regex)">
                                    </InputText>
                            </span>
                            <small v-if="item.errFocus" style="color: red;">Invalid input.</small>
                            <small class="ml-1">{{ item.value.length }}/{{ item.maxLength }}</small>
                        </div>
                        <div v-else-if="item.type=='passwordField'">
                            <h6>{{ item.label }}  <span v-if="item.required" style="color: red">*</span></h6>
                            <span class="p-input-icon-right" :class="{ 'p-input-icon-left' : item.icon }">
                                <!-- for now is a fixed icon -->
                                    <i v-if="item.icon" class="pi pi-user" />
                                    <InputText
                                        :class="{'p-invalid': item.errFocus}"
                                        :type="item.inputType"
                                        :placeholder=item.defaultValue
                                        v-model="item.value"
                                        :disabled="!item.enabled"
                                        :maxlength="item.maxLength"
                                        :pattern="item.regex">
                                    </InputText>
                                    <i @click="item.inputType =='password' ? item.inputType ='text' : item.inputType='password'" class="pi pi-search" />
                            </span>
                            <small v-if="item.errFocus" style="color: red;">Invalid input.</small>
                            <small class="ml-1">{{ item.value.length }}/{{ item.maxLength }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Table -->
        <div class="grid">
            <div class="col-12">
                <div class="card">
                    <h5>Some Table</h5>
                    <DataTable
                        :paginator="tableRes.pagination"
                        class="p-datatable-gridlines"
                        :rows="tableRes.rows"
                        :rowHover="tableRes.rowHover"
                        :value="tableRes.data">
                        <template #header>
                            <div class="flex justify-content-between flex-column sm:flex-row">
                                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                                <span class="p-input-icon-left mb-2">
                                    <i class="pi pi-search" />
                                    <InputText placeholder="Keyword Search" style="width: 100%" />
                                </span>
                            </div>
                        </template>
                        <template #empty> No Data. </template>
                        <template #loading> Loading data. Please wait. </template>
                        <div v-for="column in tableRes.columns" :key="column">
                            <Column v-if="column.visible" :field="column.field" :header="column.name" :style="column.minWidth">
                                <template #body="{ data }">
                                    {{ data[column.field].toLocaleString() }}
                                </template>
                            </Column>
                            <!-- {{ data[column.field] }} -->
                        </div>
                    </DataTable>
                </div>
            </div>
        </div>

        <!-- <div>
            <button @click="loadComponent">Load External Component</button>
            <component :is="dynamicComponent"></component>
        </div> -->
    </div>
</template>


<script>
// import { markRaw } from "vue";

export default {
    // created() {
    //     const currentDate = new Date();
    //     const month = currentDate.getMonth() + 1;
    //     const day = currentDate.getDate();
    //     const year = currentDate.getFullYear();
    //     this.currentDate = `${month}/${day}/${year}`;
    // },
    data() {
        return{
        dynamicComponent: null,
            headerRes: {
                isAdd: false,
                isEdit: true,
                isDelete: true,
                enabled: true,
            },
            formRes:[
            {
                _id: 1,
                label: "Text field",
                type: "textField",
                value: "",
                defaultValue: "type 123",
                enabled: true,
                icon: true,
                regex: "^[a-zA-Z]+$", // key down
                maxLength: 5,
                visible: true,
                errFocus: false,
                required: true,
                labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
                sendBackServer: true,
            },
            { // set special day
                _id: 2,
                label: "Date field",
                type: "dateField",
                value: "",
                defaultValue: "07/13/2023",
                dateFormat: "dd/mm/yy",
                enabled: true,
                icon: true,
                visible: true,
                errFocus: false,
                required: false,
                labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
                format: "",
                sendBackServer: true
            },
            {
                _id: 3,
                label: "Number field",
                type: "numberField",
                value: "",
                defaultValue: 13,
                enabled: true,
                icon: false,
                regex: "^[0-9]+$",
                maxLength: 10,
                visible: true,
                errFocus: false,
                required: false,
                labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
                sendBackServer: true
            },
            { // show password
                _id: 4,
                label: "Password field",
                type: "passwordField",
                inputType: "password",
                value: "",
                defaultValue: "password",
                enabled: true,
                icon: false,
                maxLength: 18,
                visible: true,
                errFocus: false,
                required: true,
                labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
                sendBackServer: true
            }],
            tableRes: {
                rows: 5,
                pagination: true,
                rowHover: true, // can put more
                columns: [
                    { name: "Status", field: "status", visible: true, minWidth: "min-width: 6rem"},
                    { name: "ID", field: "id", visible: true , minWidth: "min-width: 5rem"},
                    { name: "Name", field: "name", visible: true , minWidth: "min-width: 12rem"},
                    { name: "Age", field: "age", visible: true , minWidth: "min-width: 5rem"},
                    { name:"Networth", field:"networth", visible: true , minWidth: "min-width: 12rem"},
                    { name:"Amount", field:"amount", visible: true , minWidth: "min-width: 6rem"}
                ],
                data: [
                    { status: 'Active', id: 1, name: 'John', age: 21, networth: 50, currency: "RM", amount: 30200},
                    { status: 'Inactive', id: 2, name: 'Jane', age: 22, networth: 3540 , currency: "RM", amount: 30100},
                    { status: 'Active', id: 3, name: 'Bob', age: 23, networth: 42101 , currency: "RM", amount: 30050},
                    { status: 'Inactive', id: 4, name: 'Alice', age: 24, networth: 64573 , currency: "RM", amount: 30040},
                    { status: 'Active', id: 5, name: 'Mike', age: 25, networth: 5431 , currency: "RM", amount: 30020},
                    { status: 'Active', id: 6, name: 'Sarah', age: 26, networth: 432311 , currency: "RM", amount: 30100},
                    { status: 'Inactive', id: 7, name: 'David', age: 27, networth: 631 , currency: "RM", amount: 30050},
                    { status: 'Active', id: 8, name: 'Emily', age: 28, networth: 769553 , currency: "RM", amount: 30040},
                    { status: 'Inactive', id: 9, name: 'Michael', age: 29, networth: 1436, currency: "RM", amount: 30300 },
                    { status: 'Active', id: 10, name: 'Olivia', age: 30, networth: 13582, currency: "RM", amount: 300 }
                ],
            },
        }
    },
    methods: {
        validateInput(event, regexPattern) {
            // Create a regular expression object from the pattern
            const regex = new RegExp(regexPattern);
            if (!regex.test(event.key)) // if it does not pass
                event.preventDefault();
        },
        // loadComponent() {
        //     import('C:\\Users\\SebastianSoon\\Project\\HelloWorld.vue')
        //     .then(component => {
        //         this.dynamicComponent = markRaw(component.default || component);
        //         console.log(this.dynamicComponent)
        //         this.dynamicComponent.methods.sayHelloWorld("Testing");
        //     })
        //     .catch(error => {
        //         console.error('Failed to load component:', error);
        //     });
        // }
    }
}
</script>
