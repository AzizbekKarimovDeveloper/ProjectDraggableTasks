<template>
    <div class="container-fluid my-4 ">
        <el-dialog title="Add Task"
                   :visible.sync="openModal" width="30%"
                   center>
            <b-container fluid>
                <b-row class="my-1 pb-3 mt-0">
                    <b-col sm="4">
                        <label class="pb-0 style-label">Title:</label>
                    </b-col>
                    <b-col sm="8" class="pb-0">
                        <b-form-input type="text" placeholder="Type Title" v-model="card.title"></b-form-input>
                    </b-col>
                    <b-col sm="4">
                        <label class="style-label">Description:</label>
                    </b-col>
                    <b-col sm="8">
                        <b-form-input type="text" placeholder="Type Description"
                                      v-model="card.description"></b-form-input>
                    </b-col>
                </b-row>
            </b-container>

            <!--                <section>-->
            <!--                    <p>footer slot</p>-->
            <!--                    <date-picker v-model="value3" range placeholder="Select date range">-->
            <!--                        <template v-slot:footer="{ emit }">-->
            <!--                            <div style="text-align: left">-->
            <!--                                <button class="mx-btn mx-btn-text" @click="selectNextThreeDay(emit)">-->
            <!--                                    NextThreeDay-->
            <!--                                </button>-->
            <!--                            </div>-->
            <!--                        </template>-->
            <!--                    </date-picker>-->
            <!--                </section>-->

            <div class="col-header">
            <span slot="footer" class="dialog-footer">
                 <b-button pill variant="outline-danger" class="mr-2" @click="closeModal">Cancel</b-button>
                 <b-button type="primary" pill variant="primary" @click="saveTask">Create</b-button>

            </span>
            </div>
        </el-dialog>

        <div class="row">
            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="col-header">To do</span>
                        <hr class="mt-1 bg-info">
                        <draggable tag="ul" v-model="ColOne" v-bind="draggableSettings">
                            <b-card class="card-distance" v-for="(task,index) in ColOne" :key="index">
                                <div class="style-title"> {{task.title}}</div>
                                <div class="style-description">{{task.description}}</div>
                            </b-card>
                        </draggable>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="col-header ">In Progress</span>
                        <hr class="mt-1 bg-info">
                        <draggable v-model="colTwo" v-bind="draggableSettings">
                            <b-card class="card-distance" v-for="(task,index) in colTwo" :key="index">
                                <div class="style-title"> {{task.title}}</div>
                                <div class="style-description">{{task.description}}</div>
                            </b-card>
                        </draggable>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="col-header ">Done</span>
                        <hr class="mt-1 bg-info">
                        <draggable v-model="colThree" v-bind="draggableSettings">
                            <b-card class="card-distance" v-for="(task,index) in colThree" :key="index">
                                <div class="style-title">
                                    <span>{{task.title}}</span>
                                </div>
                                <div class="style-description">{{task.description}}</div>
                            </b-card>
                        </draggable>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-dark">
                    <div class="card-body">
                        <span class="col-header ">List Task</span>
                        <span @click="addTask" class="style-addButton">+ Add</span>
                        <hr class="mt-1 bg-info">
                        <draggable v-model="tasks" v-bind="draggableSettings">
                            <template>
                                <b-card class="card-distance"
                                        v-for="(task,index) in tasks" :key="index"
                                >
                                    <div class="style-title"> {{task.title}}
                                    </div>
                                    <div class="style-description">{{task.description}}</div>
                                </b-card>
                            </template>
<!--                            <template v-if="bool = false">-->
<!--                                <b-card class="card-distance"-->
<!--                                        v-for="(task,index) in arrays" :key="index"-->
<!--                                >-->
<!--                                    <div class="style-title"> {{task.title}}-->
<!--                                    </div>-->
<!--                                    <div class="style-description">{{task.description}}</div>-->
<!--                                </b-card>-->
<!--                            </template>-->
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


    import draggable from "vuedraggable";

    let id = 1;
    const col1Task = [], col2Task = [], col3Task = [];

    export default {
        name: 'Tasks',
        display: "Simple",
        components: {
            draggable,
        },
        data() {
            return {
                arrays: [],
                types: [
                    'Title',
                    'Description',
                ],
                card: {
                    title: '',
                    description: '',
                },
                tasks: [
                    {title: 'Task 1', description: 'This is Default Task'},
                ],
                ColOne: col1Task.map((task) => {
                    return {title: task.title, description: task.description};
                }),
                colTwo: col2Task.map((task) => {
                    return {title: task.title, description: task.description};
                }),
                colThree: col3Task.map((task) => {
                    return {title: task.title, description: task.description};
                }),
                bool: true,
                editTask: true,
                openModal: false,

            }
        },
        methods: {
            saveTask() {
                // this.tasks.push({title: this.card.title, description: this.card.description, id: id++});


                this.tasks.push({title: this.card.title, description: this.card.description, id: id++});
                let myArrayTasks = JSON.stringify(this.tasks)
                localStorage.setItem("MyTasks", myArrayTasks);
                this.openModal = false;
            },
            addTask() {
                this.card.description = ''
                this.card.title = ''
                this.openModal = true;
            },
            closeModal() {
                this.openModal = false;
            }
        },
        // created() {
        //     let currentArray = JSON.parse(localStorage.getItem("MyTasks"));
        //     if (currentArray != null) {
        //         this.tasks = JSON.parse(localStorage.getItem("MyTasks"));
        //         this.bool = false;
        //     }
        //
        // },
        computed: {

            draggableSettings() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: !this.editTask,
                    ghostClass: "ghost"
                };
            },
        },
    }
</script>

<style scoped>
    .card-draggable :hover {

    }

    .card-body {
        cursor: grab;
    }

    .card {
        border-radius: 20px;
        box-shadow: 1px 5px 5px -1px lightgray;
    }

    .col-header {
        margin-top: -20px;
        padding-top: 5px;
    }

    .dialog-footer {
        font-size: 5px;
        margin-right: 50px;
        padding-left: 135px
    }


    .style-description {
        color: grey;
        font-size: .75em;
        padding: 10px;
        display: flex;
    }

    .style-addButton {
        font-size: 14px;
        cursor: pointer;
        color: #60a8ff;
        float: right;
        margin: -1px;
        padding: 5px;
    }

    .style-title {
        border-bottom: 0.5px solid #d8d8d8;
        color: #0ecc9b;
        font-weight: 700;
        padding: 10px;
        display: flex;
    }

    .style-label {
        color: #030623;
        font-weight: 700;
    }

    .card-distance {
        border: .5px solid;
        -webkit-box-shadow: 2px 2px #d8d8d8;
        box-shadow: 2px 2px #d8d8d8;
        margin: 5px 0;
    }

</style>
