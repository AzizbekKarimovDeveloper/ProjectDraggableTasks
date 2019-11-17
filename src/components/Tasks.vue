<template>

    <div class="container-fluid my-4">
        <el-dialog
                title="Add Task"
                :visible.sync="openModal"
                width="30%"
                center>
            <el-form ref="form" label-width="100px">
                <el-form-item label="Title">
                    <el-input v-model="payload.name"></el-input>
                </el-form-item>
                <el-form-item label="Description">
                    <el-input v-model="payload.title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="closeModal">Cancel</el-button>
    <el-button type="primary" @click="saveTask">Confirm</el-button>
  </span>
        </el-dialog>
        <div class="row">


            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="font-weight-bold ">To do</span>
                        <hr class="mt-1 bg-info">

                        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" :move="onMove"
                                   @start="isDragging=true" @end="isDragging=false">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list"
                                         :key="index"
                                >
                                    <div class="title"> {{element.name}}
                                    </div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="font-weight-bold ">In Progress</span>
                        <hr class="mt-1 bg-info">
                        <draggable element="span" v-model="list2" v-bind="dragOptions" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list2"
                                         :key="index"
                                >
                                    <div class="title"> {{element.name}}
                                    </div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="font-weight-bold ">Done</span>
                        <hr class="mt-1 bg-info">
                        <draggable element="span" v-model="list3" v-bind="dragOptions" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow" v-for="(element,index) in list3"
                                         :key="index"
                                >
                                    <div style="cursor: pointer" class="title"><span>{{element.name}}</span>
                                    </div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="font-weight-bold ">List Task</span>


                        <button data-v-b5e7257a="" type="button" style="float: right; padding: 3px 0;"
                                class="el-button btn-add el-button--text"><!----><!----><span
                                @click="addItem">+ Add</span>
                        </button>
                        <hr class="mt-1 bg-info">
                        <draggable element="span" v-model="items" v-bind="dragOptions" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul">
                                <el-card class="el-card card-wrapper is-always-shadow"
                                         v-for="(element,index) in items" :key="index"
                                >
                                    <div class="title"> {{element.name}}
                                    </div>
                                    <div class="description">{{element.title}}</div>
                                </el-card>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


    import draggable from "vuedraggable";

    const message = [
        {name: 'Task D', title: 'Update style'}
    ];
    const message1 = [
        {name: 'Task F', title: 'Remove button Y'}

    ];
    const message3 = [
        {name: 'Task F', title: 'Fix Bug #001'}

    ];
    export default {
        name: 'HelloWorld',
        components: {
            draggable,
        },
        data() {
            return {
                items: [
                    {name: 'Task A', title: 'Refactor using Kotlin', order: 1},
                    {name: 'Task B', title: 'Update using Typescript', order: 2},
                    {name: 'Task C', title: 'There is a bug when user click button X', order: 3}

                ],
                list: message.map((list, index) => {
                    return {name: list.name, title: list.title, order: index + 1, fixed: false};
                }),
                list2: message1.map((list, index) => {
                    return {name: list.name, title: list.title, order: index + 1, fixed: false};
                }),
                list3: message3.map((list, index) => {
                    return {name: list.name, title: list.title, order: index + 1, fixed: false};
                }),

                editable: true,
                isDragging: false,
                delayedDragging: false,
                openModal: false,
                payload: {
                    name: '',
                    title: ''
                }
            }
        },
        methods: {
            async saveTask() {
                await this.items.push(this.payload);

                this.openModal = false;


            },

            onMove({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (
                    (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
                );
            },
            addItem() {
                this.payload.name = ''
                this.payload.title = ''
                this.openModal = true;
            },
            closeModal() {
                this.openModal = false;
            }
        },
        computed: {

            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: !this.editable,
                    ghostClass: "ghost"
                };
            },
        },
        watch: {
            isDragging(newValue) {
                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(() => {
                    this.delayedDragging = false;
                });
            },

        }
    }
</script>

<style scoped>
    .card {
        border-radius: 20px;
        box-shadow: 1px 5px 5px -1px lightgray;
    }

    .description {
        color: grey;
        font-size: .75em;
        padding: 10px;
        display: flex;
    }
    .title {
        border-bottom: 0.5px solid #d8d8d8;
        color: #0ecc9b;
        font-weight: 700;
        padding: 10px;
        display: flex;
    }
    .card-wrapper {
        border: .5px solid;
        -webkit-box-shadow: 2px 2px #d8d8d8;
        box-shadow: 2px 2px #d8d8d8;
        margin: 5px 0;
    }
</style>
