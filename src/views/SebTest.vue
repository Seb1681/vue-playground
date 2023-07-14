<template>
    <div class="card">
        <h5>Header here</h5>
        <div class="grid p-fluid mt-3">
            <!-- <div class="field col-12 md:col-12">
                <span class="p-float-label">
                    <InputText type="text" id="inputtext" v-model="value1" />
                    <label for="inputtext">InputText</label>
                </span>
            </div> -->
            <div v-for="item in res" :key="item._id" :class="col">
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
                                    :pattern="item.regex">
                                </InputText>
                        </span>
                        <small v-if="item.errFocus" style="color: red;">Invalid input. Only alphabetic characters are allowed.<br/></small>
                        <small class="ml-1">{{ item.value.length }}/{{ item.maxLength }}</small>
                    </div>
                    <div v-else-if="item.type=='dateField'">
                        <h6>{{ item.label }}  <span v-if="item.required" style="color: red">*</span></h6>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="item.value" :placeholder="item.defaultValue"></Calendar>
                    </div>
                    <div v-if="item.type=='numberField'">
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
                                    :pattern="item.regex">
                                </InputText>
                        </span>
                        <small v-if="item.errFocus" style="color: red;">Invalid input.</small>
                        <small class="ml-1">{{ item.value.length }}/{{ item.maxLength }}</small>
                    </div>
                    <div v-if="item.type=='passwordField'">
                        <h6>{{ item.label }}  <span v-if="item.required" style="color: red">*</span></h6>
                        <span :class="{ 'p-input-icon-left' : item.icon }">
                            <!-- for now is a fixed icon -->
                                <i v-if="item.icon" class="pi pi-user" />
                                <InputText
                                    :class="{'p-invalid': item.errFocus}"
                                    type="password"
                                    :placeholder=item.defaultValue
                                    v-model="item.value"
                                    :disabled="!item.enabled"
                                    :maxlength="item.maxLength"
                                    :pattern="item.regex">
                                </InputText>
                        </span>
                        <small v-if="item.errFocus" style="color: red;">Invalid input.</small>
                        <small class="ml-1">{{ item.value.length }}/{{ item.maxLength }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            currentDate: "",
            col: "field col-12 md:col-5",
            res:[
            {
                
                element: {
                    _id: 1,
                    label: "Text field",
                    type: "textField",
                    value: "3212142",
                    defaultValue: "type 123",
                    enabled: true,
                    icon: true,
                    regex: "[A-Za-z]", // key down
                    maxLength: 5,
                    visible: true,
                    errFocus: false,
                    required: false,
                    labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
                    sendBackServer: true,
                }
            },
            { // set special day
                _id: 2,
                label: "Date field",
                type: "dateField",
                value: "",
                defaultValue: "07/13/2023",
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
                regex: "[0-9]", // to be enhanced
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
                value: "",
                defaultValue: "password",
                enabled: true,
                icon: false,
                regex: "[A-Za-z]",
                maxLength: 18,
                visible: true,
                errFocus: false,
                required: true,
                labelMode: 1, // 1 top, 2 left, 3 bottom, 4 right
                sendBackServer: true
            }]
        }
    },
}
</script>