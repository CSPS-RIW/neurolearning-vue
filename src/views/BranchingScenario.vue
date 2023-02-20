<template>
    <main>
        <div class="holster">
            <div class="questionnaire-wrapper">
                <div class="questionnaire-header">
                    <h1>Scenario</h1>
                </div>
                <div class="questionnaire questionnaire-1" v-if="step === 1">
                    <h2>Which of these best describes your role?</h2>
                    <div class="role-options d-flex justify-content-evenly mt-5">
                        <button class="option" @click="managerButton()">Manager</button>
                        <button class="option" @click="employeeButton()">Employee</button>
                    </div>
                </div>
                <div class="employee" v-if="this.role === 'employee'">
                    <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
                        <div class="questionnaire questionnaire-2" v-if="step === 2">
                            <div>
                                <h3>Employee Part 1</h3>
                                <p>This is the first page of the employee scenario</p>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
                        <div class="questionnaire questionnaire-3" v-if="step === 3">
                            <div >
                                <h3>Employee Part 2</h3>
                                <p>This is the second page of the employee scenario</p>
                            </div>
                        </div>
                    </Transition>
                    <div class="questionnaire questionnaire-4" v-if="step === 4">
                        <div >
                            <h3>Employee Part 3</h3>
                            <p>This is the third page of the employee scenario</p>
                        </div>
                    </div>
                    <div class="questionnaire questionnaire-5" v-if="step === 5">
                        <h3>As an employee, what would you do in this case?</h3>
                        <form class="options">
                            <div>
                                <input type="radio" name="option" id="choice1" aria-label="Choice 1" value="Choice 1" v-model="employeeChoice">
                                <label for="choice1">Choice 1</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="choice2" aria-label="Choice 2" value="Choice 2" v-model="employeeChoice">
                                <label for="choice2">Choice 2</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="choice3" aria-label="Choice 3" value="Choice 3" v-model="employeeChoice">
                                <label for="choice3">Choice 3</label>
                            </div>
                        </form>
                    </div>
                    <div class="questionnaire questionnaire-6" v-if="step === 6">
                        <p v-if="employeeChoice === 'Choice 1'">That's not quite right. Press the back button and try another option.</p>
                        <p v-if="employeeChoice === 'Choice 2'">Close! While some aspects of that choice are good, there is still ONE problem with that answer. Press the back button and try another option.</p>
                        <p v-if="employeeChoice === 'Choice 3'">That's right! This choice covers all the bases.</p>
                    </div>
                </div>
                <div class="manager" v-if="this.role === 'manager'">
                    <div class="questionnaire questionnaire-2" v-if="step === 2">
                        <div>
                            <h3>Manager Part 1</h3>
                            <p>This is the first page of the manager scenario</p>
                        </div>
                    </div>
                    <div class="questionnaire questionnaire-3" v-if="step === 3">
                        <div >
                            <h3>Manager Part 2</h3>
                            <p>This is the second page of the manager scenario</p>
                        </div>
                    </div>
                    <div class="questionnaire questionnaire-4" v-if="step === 4">
                        <div >
                            <h3>Manager Part 3</h3>
                            <p>This is the third page of the manager scenario</p>
                        </div>
                    </div>
                    <div class="questionnaire questionnaire-5" v-if="step === 5">
                        <h3>As a manager, what would you do in this case?</h3>
                        <form class="options">
                            <div>
                                <input type="radio" name="option" id="choice1" aria-label="Choice 1" value="Choice 1" v-model="managerChoice">
                                <label for="choice1">Choice 1</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="choice2" aria-label="Choice 2" value="Choice 2" v-model="managerChoice">
                                <label for="choice2">Choice 2</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="choice3" aria-label="Choice 3" value="Choice 3" v-model="managerChoice">
                                <label for="choice3">Choice 3</label>
                            </div>
                        </form>
                    </div>
                    <div class="questionnaire questionnaire-6" v-if="step === 6">
                        <p v-if="managerChoice === 'Choice 1'">That's not quite right. Press the back button and try another option.</p>
                        <p v-if="managerChoice === 'Choice 2'">Close! While some aspects of that choice are good, there is still ONE problem with that answer. Press the back button and try another option.</p>
                        <p v-if="managerChoice === 'Choice 3'">That's right! This choice covers all the bases.</p>
                    </div>
                </div>
            </div>


        </div>
        <div class="progress-tracker">
            <nav role="navigation" aria-label="Toolkit Step Navigation">
                <ul>
                    <li v-for="currentStep in totalSteps" :key="currentStep" class="dot" :class="{ active: this.step === currentStep }" >
                        <a href="#" @click="this.step = currentStep" :aria-label="`Go to step ${currentStep}`" :aria-current="{ true: this.step === currentStep }">
                            •
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="nav-buttons">
            <button class="btn-regular back" @click="navigateBack" :disabled=" this.step <= 1">Back</button>
            <button class="btn-regular next" @click="step++" :disabled=" this.step === 1 || this.step > 5">Next</button>
        </div>
        
    </main>
</template>
<script>
    export default {
        name: 'Branch',
        data: function () {
            return {
                step: 1,
                totalSteps: 5,
                role: '',
                employeeChoice: '',
                managerChoice: ''
            }
        },
        methods: {
            navigateBack: function() {
                this.step--
            },
            managerButton: function() {
                this.role = 'manager'
                this.step++
            },
            employeeButton: function() {
                this.role = 'employee'
                this.step++
            }
        }
    }
</script>
<style lang="scss" scoped>

    $school-purple: #3F2A56;
    $school-coral: #DA797A;
    
    html {
        padding: 0;
        margin: 0;
    }
    main {
        min-height: 100vh;
        background-color: #3F2A56;
        background-color: #DA797A;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.9' stroke-opacity='0.21' %3E%3Ccircle fill='%23DA797A' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23d6707b' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23d2687c' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ce607e' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23c95881' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23c55085' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23c0488a' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23ba428e' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23af4090' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a53f91' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%239a3d91' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23903a8f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23803886' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2370367c' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23623372' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23553069' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%234a2d5f' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233F2A56' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
    }

    h1 {
        text-align: center;
        margin: 1rem 0rem;
    }

    .holster {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: auto;
        padding-top: 2rem;
    }

    .questionnaire-wrapper {
        //border: 10px solid #3F2A56;
        background-color: #FEFEFE;
        border-radius: 10px;
        //padding: 1rem;
        margin-bottom: 2rem;
        width: 300px;
        min-height: 500px;
        max-height: 600px;
        overflow: scroll;
        overflow-x: hidden;
        height: auto;
        display: flex;
        flex-direction: column;
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
        //box-shadow: 0px 10px 40px #c5c5c5;
        //mix-blend-mode: hard-light;

        &::-webkit-scrollbar {
            display: none;
        }

        @media (min-width: 560px) {
            width: 560px;
        }
    }

    .questionnaire {
        color: rgb(12, 12, 12);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem;

        h2,
        p {
            text-align: center;
        }

        p {
            font-size: 1.3rem;
        }
    }

    .questionnaire-header {
        background: rgb(63, 42, 86);
        color: white;
        border-radius: 10px;
        border: 1px solid white;
    }

    form.options {
        display: flex;
        flex-direction: column;
        font-size: 1.3rem;

        div {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }
    }

    input[type="checkbox"],
    input[type="radio"] {
        width: 16px;
        height: 16px;
        margin: 0.5rem 0.5rem 0rem 0rem;
    }

    .nav-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        max-width: 751px;
        margin: auto;
    }

    button.option {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid grey;
        background-color: $school-purple;
        color: #fff;

        &:focus, &:hover {
            outline: 5px solid $school-coral;
        }
        
    }

    button.btn-regular {
        font-size: 1.5rem;
        padding: 0.3rem 4rem;
        color: #3F2A56;
        background-color: #FFF;
        border-radius: 5px;
        border: 1px solid rgb(187, 187, 187);

        &:hover, &:focus {
            background-color: $school-purple;
            color: white;
        }

        &:disabled {
            background-color: rgb(113, 113, 113);
            color: white;
        }

        &.skip {
            background-color: #EEEEEE;
            color: #3F2A56;
        }
    }

    .progress-tracker {
        nav ul {
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 20px;
        }
        
        li.dot {
            list-style-type: none;
            width: 20px;
            height: 20px;
            background-color: #fff;
            border-radius: 50%;
            border: 3px solid #fff;
            margin-left: 4px;
            margin-right: 4px;
            cursor: pointer;
            
            &.active {
                background-color: $school-purple;
            }

            a {
                text-decoration: none;
                color: #ffffff00;
                font-size: 2rem;
                line-height: 2px;
            }
            
        }
    }
</style>