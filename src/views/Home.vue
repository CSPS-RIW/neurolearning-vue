<template>
<div class="wrap-layer container">
    <header>
        <h1 class="text-center m-3">Helpful Resources</h1>
    </header>
    <main>
        <div class="text-layer pt-5">
            <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInDown">
                <div class="instructional" v-if="!complete">
                    <div class="intro">
                      <div class="chat-container left blue">
                          <div class="persona robert"></div>
                          <p class="chat-bubble">Please select the relevant buttons in order to generate a customized resource toolkit. If you make a mistake, select the "Clear all inputs" button to clear the page.</p>
                      </div>
                    </div>
                    
                    <p>
                        {{ message }}
                    </p>
                    <div class="role mb-5">
                        <div class="tier0 role-buttons d-flex justify-content-md-around mb-3">
                            <button class="btn btn-info btn-lg" role="button" aria-label="Employee" :disabled=" role > 0 " @click="tier0Submit('employee')">Employee</button>
                            <button class="btn btn-info btn-lg" role="button" aria-label="Supervisor / Manager" :disabled=" role > 0" @click="tier0Submit('manager')">Supervisor / Manager</button>
                            <button class="btn btn-info btn-lg" role="button" aria-label="Mental Health Professional" :disabled=" role > 0" @click="tier0Submit('mental health')">Mental Health Professional</button>
                        </div>
                        <div class="tier1 clarify-role mt-5" aria-live="polite">
                            <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
                                <div class="tier1-question1" key="1" v-if="role === 1">
                                    <p>Do you manage people?</p>
                                    <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                        <button class="btn btn-info btn-lg" role="button" aria-label="Yes" :disabled=" final1 === true" @click="tier1Submit('manager')">Yes</button>
                                        <button class="btn btn-info btn-lg" role="button" aria-label="No" :disabled=" final1 === false" @click="tier1Submit('not manager')">No</button>
                                    </div>
                                </div>
                                <div class="tier1-question2" key="2" v-else-if="role === 2">
                                    <p>Are you an Executive?</p>
                                    <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                        <button class="btn btn-info btn-lg" role="button" aria-label="Yes" :disabled=" final2 === true" @click="tier1Submit('executive')">Yes</button>
                                        <button class="btn btn-info btn-lg" role="button" aria-label="No" :disabled=" final2 === false" @click="tier1Submit('not executive')">No</button>
                                    </div>
                                </div>
                                <div class="tier1-question3" key="3" v-else-if="role === 3">
                                    <p>Which of these best describes your role?</p>
                                    <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                        <button class="btn btn-info btn-lg" role="button" aria-label="Psychotherapist" :disabled=" final3 === true" @click="tier1Submit('psychotherapist')">Psychotherapist</button>
                                        <button class="btn btn-info btn-lg" role="button" aria-label="Social Worker" :disabled=" final3 === false" @click="tier1Submit('social worker')">Social Worker</button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                        <div class="tier2 mt-5" aria-live="polite">
                            <div class="tier2-question1-wrapper" aria-live="polite">
                                <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
                                    <div class="tier2-question1-1" v-if="final1 === 1">
                                        <p>Have you submitted a disability claim for yourself or your employees?</p>
                                        <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                            <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('manager claim')">Yes</button>
                                            <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not manager claim')">No</button>
                                        </div>
                                    </div>
                                    <div class="tier2-question1-2" v-else-if="final1 === 2">
                                        <p>Have you submitted a disability claim for yourself?</p>
                                        <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                            <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('employee claim')">Yes</button>
                                            <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not employee claim')">No</button>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                            <div class="tier2-question2-wrapper" aria-live="polite">
                                <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
                                    <div class="tier2-question2-1" v-if="final2 === 1">
                                        <p>Have you had to implement an action plan for your branch?</p>
                                        <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                            <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('action plan')">Yes</button>
                                            <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not action plan')">No</button>
                                        </div>
                                    </div>
                                    <div class="tier2-question2-2" v-else-if="final2 === 2">
                                        <p>Have you submitted a disability claim for yourself or your employees?</p>
                                        <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                            <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('disability claim submission')">Yes</button>
                                            <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not disability claim submission')">No</button>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                            <div class="tier2-question3-wrapper" aria-live="polite">
                                <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
                                    <div class="tier2-question3-1" v-if="final3 === 1">
                                        <p>Have you been involved in a disability insurance claim before?</p>
                                        <div class="d-flex justify-content-md-around mb-3 role-buttons">
                                            <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('disability insurance')">Yes</button>
                                            <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not disability insurance')">No</button>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="instructional" v-else aria-live="polite">
                   
                    <p>
                        Based on your input, you are {{ job }}.
                    </p>
                    <div v-if="manager">
                        <p>You also manage people.</p>
                        <p v-if="managerClaim">You have submitted a claim on your own behalf or on behalf of your employee.</p>
                    </div>
                    <div v-if="executive">
                        <p>You are also an executive.</p>
                        <p v-if="actionPlan">You have implemented an action plan for your branch.</p>
                    </div>
                    <div v-if="MHRole">
                        <p>
                            You are a registered {{ MHRole }}
                        </p>
                        <p v-if="disabilityInsurance">
                            You've been involved in a disability insurance claim.
                        </p>
                        <p v-else-if="!disabilityInsurance">
                            You have not been involved in a disability insurance claim.
                        </p>
                    </div>
                    <p v-if="employeeClaim">You have submitted a claim on your own behalf.</p>
                    <p>Here is a list of resources that may help you in your role.</p>
                    <div class="resources">
                        <h3>
                            Your Custom Toolkit
                        </h3>
                        <!-- Tier 0 output -->
                        <div class="card-container">
                            <div class="card"  v-if="role === 1">
                                <div class="card-body">
                                    <div>
                                        <a class="card-text" :href=" resources.employeeItem ">{{ resources.employeeItem }}</a>
                                    </div>
                                    <!-- Tier 1 output -->
                                    <div v-if="final1 === 1">
                                        <a class="card-text" :href=" resources.managerItem ">{{ resources.managerItem }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Tier 0 output -->
                        <div class="card-container">
                            <div class="card"  v-if="role === 2">
                                <div class="card-body">
                                    <div>
                                        <a class="card-text" :href=" resources.managerItem ">{{ resources.managerItem }}</a>
                                    </div>
                                    <!-- Tier 1 output -->
                                    <div v-if="final2 === 1">
                                        <a class="card-text"  :href=" resources.executiveItem ">{{ resources.executiveItem }}</a>
                                    </div>
                                    <!-- Tier 2 output -->
                                    <div v-if="!actionPlan">
                                        <a class="card-text"  :href=" resources.actionPlanItem ">{{ resources.actionPlanItem }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Psychotherapist output -->
                        <div class="card-container">
                            <div class="card"  v-if="MHRole === 'Psychotherapist'">
                                <div class="card-body">
                                    <div>
                                        <a class="card-text" :href=" resources.psychotherapistItem ">{{ resources.psychotherapistItem }}</a>
                                    </div>
                                    <div v-if="disabilityInsurance === false">
                                        <a class="card-text" :href=" resources.disabilityItem ">{{ resources.disabilityItem }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Social Worker Output -->
                        <div class="card-container">
                            <div class="card" v-if="MHRole === 'Social Worker'">
                                <div class="card-body">
                                    <div>
                                        <a class="card-text" :href=" resources.socialItem ">{{ resources.socialItem }}</a>
                                    </div>
                                    <div v-if="disabilityInsurance === false">
                                        <a class="card-text" :href=" resources.disabilityItem ">{{ resources.disabilityItem }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-info" @click="resetAll()">Back</button>
                </div>
            </Transition>
        </div>
    </main>
    <footer>
        <div class="clear-button">
            <button class="btn btn-info" role="button" aria-label="Clear all inputs" @click="resetAll()">
                Clear all inputs
            </button>
        </div>
        <div class="design">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.33 348.77">
                <defs></defs>
                <g id="a" />
                <g id="b">
                    <g id="c">
                        <path class="f" d="M167.99,262.45c3.64,1.21,78.91,8.5,78.91,8.5,0,0-10.32-26.1-5.46-31.56,4.86-5.46,78.91-62.61,78.91-62.61,0,0-27.32-10.23-20.64-16.91l13.96-50.38s-45.53,10.93-48.56,9.11-7.89-8.5-9.11-24.89c0,0-40.06,50.99-44.92,43.71,0,0-12.75,7.89,12.14-91.05,0,0-24.28,13.35-29.74,11.53-5.46-1.82-20.09-31.49-32.78-55.76v-.09l-.02,.04-.02-.04v.09c-12.69,24.26-27.32,53.94-32.78,55.76-5.46,1.82-29.74-11.53-29.74-11.53,24.89,98.94,12.14,91.05,12.14,91.05-4.86,7.28-44.92-43.71-44.92-43.71-1.21,16.39-6.07,23.07-9.11,24.89S7.69,109.48,7.69,109.48l13.96,50.38c6.68,6.68-20.64,16.91-20.64,16.91,0,0,74.06,57.15,78.91,62.61,4.86,5.46-5.46,31.56-5.46,31.56,0,0,75.27-7.28,78.91-8.5s-3.08,85.59-3.08,85.59h20.77s-6.72-86.8-3.08-85.59Z" />
                        <path class="e" d="M176.99,262.68c3.64,1.21,78.91,8.5,78.91,8.5,0,0-10.32-26.1-5.46-31.56,4.86-5.46,78.91-62.61,78.91-62.61,0,0-27.32-10.23-20.64-16.91l13.96-50.38s-45.53,10.93-48.56,9.11-7.89-8.5-9.11-24.89c0,0-40.06,50.99-44.92,43.71,0,0-12.75,7.89,12.14-91.05,0,0-24.28,13.35-29.74,11.53-5.46-1.82-20.09-31.49-32.78-55.76v-.09l-.02,.04-.02-.04v.09c-12.69,24.26-27.32,53.94-32.78,55.76-5.46,1.82-29.74-11.53-29.74-11.53,24.89,98.94,12.14,91.05,12.14,91.05-4.86,7.28-44.92-43.71-44.92-43.71-1.21,16.39-6.07,23.07-9.11,24.89s-48.56-9.11-48.56-9.11l13.96,50.38c6.68,6.68-20.64,16.91-20.64,16.91,0,0,74.06,57.15,78.91,62.61,4.86,5.46-5.46,31.56-5.46,31.56,0,0,75.27-7.28,78.91-8.5s-3.08,85.59-3.08,85.59h20.77s-6.72-86.8-3.08-85.59Z" />
                        <path class="d" d="M185.97,262.88c3.64,1.21,78.91,8.5,78.91,8.5,0,0-10.32-26.1-5.46-31.56,4.86-5.46,78.91-62.61,78.91-62.61,0,0-27.32-10.23-20.64-16.91l13.96-50.38s-45.53,10.93-48.56,9.11-7.89-8.5-9.11-24.89c0,0-40.06,50.99-44.92,43.71,0,0-12.75,7.89,12.14-91.05,0,0-24.28,13.35-29.74,11.53-5.46-1.82-20.09-31.49-32.78-55.76v-.09l-.02,.04-.02-.04v.09c-12.69,24.26-27.32,53.94-32.78,55.76-5.46,1.82-29.74-11.53-29.74-11.53,24.89,98.94,12.14,91.05,12.14,91.05-4.86,7.28-44.92-43.71-44.92-43.71-1.21,16.39-6.07,23.07-9.11,24.89s-48.56-9.11-48.56-9.11l13.96,50.38c6.68,6.68-20.64,16.91-20.64,16.91,0,0,74.06,57.15,78.91,62.61,4.86,5.46-5.46,31.56-5.46,31.56,0,0,75.27-7.28,78.91-8.5s-3.08,85.59-3.08,85.59h20.77s-6.72-86.8-3.08-85.59Z" />
                    </g>
                </g>
            </svg>
        </div>
    </footer>
</div>
</template>

<style scoped lang="scss">
body {
    font-family: 'helvetica', sans-serif;
}

h1 {
    color: #1c578a;
}

.intro {
    font-size: 26px;
    text-align: left;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #6b6b6b;
}

.prv-choice {
    
        outline: solid 3px grey;
     
}

.role-buttons {
    display: flex;
    flex-direction: column;
}

.role-buttons button {
    margin: 0.25rem 0 0.25rem 0;
}

.text-layer {
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    padding: 30px;
    text-align: center;
    font-size: 32px;
    line-height: 48px;
}

.background-layer svg * {
    transition: fill 1s ease;
}

.btn.btn-info {
    background-color: #3F2A56;
    color: #EEEEEE;
    border: none;
}

.btn.btn-info:hover,
.btn.btn-info:focus {
    background-color: #583a79;
}

.clear-button {
    position: fixed;
    bottom: 2rem;
    left: 8%;
    font-size: 20px;
}

.design {
    display: none;
    position: fixed;
    bottom: -2rem;
    right: 0rem;
    width: 30%;
}

.invisible {
    visibility: hidden;
}

.resource-list li {
  max-width: 1rem;
  display: inline;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 1px 1px 1px grey;
}

.card {
    min-width: 18rem;
    @media(min-width: 900px) {
        max-width: 50rem;
    }
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.d {
    fill: #3F2A56;
}

.e {
    fill: #fff;
}

.e,
.f {
    stroke: #3F2A56;
    stroke-miterlimit: 10;
}

.f {
    fill: none;
}

@media (min-width: 820px) {
    .design {
        display: block;
        width: 15%;
    }

    .role-buttons {
        display: flex;
        flex-direction: row;
    }
}
</style>

<script>

export default {
    name: 'Path',
    data: function () {
        return {
            role: 0,
            final1: 0,
            final2: 0,
            final3: 0,
            complete: false,
            job: '',
            executive: false,
            MHRole: '',
            managerClaim: false,
            employeeClaim: false,
            actionPlan: false,
            disabilityInsurance: false,
            message: 'Which one of these best describes your role?',
            resources: {
                employeeItem: 'http://www.employeehelp.com',
                managerItem: 'http://www.managersunite.com',
                executiveItem: 'http://www.executives.com',
                psychotherapistItem: 'http://www.psychotherapist.com',
                socialItem: 'http://www.socialworkers.ca',
                disabilityItem: 'http://www.disabilityinsurance.gc.ca',
                actionPlanItem: 'http://www.makinganactionplan.com'
            }
        }
    },
    methods: {
        tier0Submit: function (description) {
            if (description === 'employee') {
                this.role = 1;
                this.finalClear();
                this.job = 'an Employee';
            } else if (description === 'manager') {
                this.role = 2;
                this.finalClear();
                this.job = 'a Manager';
            } else if (description === 'mental health') {
                this.role = 3;
                this.finalClear();
                this.job = 'a Mental Health Professional'
            }

        },
        tier1Submit: function (clarifier) {
            if (clarifier === 'manager') {
                this.final1 = 1;
                this.manager = true;
            } else if (clarifier === 'not manager') {
                this.final1 = 2;
                this.manager = false;
            } else if (clarifier === 'executive') {
                this.final2 = 1;
                this.executive = true;
            } else if (clarifier === 'not executive') {
                this.final2 = 2;
                this.executive = false;
            } else if (clarifier === 'psychotherapist') {
                this.final3 = 1;
                this.MHRole = 'Psychotherapist'
            } else if (clarifier === 'social worker') {
                this.final3 = 1;
                this.MHRole = 'Social Worker'
            }
        },
        tier2Submit: function (clarifier) {
            this.complete = true;
            switch (clarifier) {
                case 'manager claim':
                    this.managerClaim = true;
                case 'not manager claim':
                    this.managerClaim = false;
                case 'employee claim':
                    this.employeeClaim = true;
                case 'not employee claim':
                    this.employeeClaim = false;
                case 'action plan':
                    this.actionPlan = true;
                case 'not action plan':
                    this.actionPlan = false;
                case 'disability insurance':
                    this.disabilityInsurance = true;
                case 'not disability insurance':
                    this.disabilityInsurance = false;
                    break;
            }
        },
        finalClear: function () {
            this.final1 = 0
            this.final2 = 0
            this.final3 = 0
        },
        resetAll: function () {
            this.role = 0
            this.final1 = 0
            this.final2 = 0
            this.final3 = 0
            this.complete = false
            this.job = ''
            this.manager = false
            this.executive = false
            this.MHRole = ''
            this.managerClaim = false
            this.employeeClaim = false
            this.actionPlan = false
            this.message = 'Which one of these best describes your role?'
        }
    }
}
</script>
