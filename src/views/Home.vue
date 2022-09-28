<template>
      <div class="wrap-layer container">
        <header>
          <h1 class="text-center m-3">Helpful Resources</h1>
        </header>
        <main>
          <div class="text-layer pt-5">
            <Transition
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeInDown"
            >
              <div class="instructional" v-if="!complete">
                <p class="intro">Please select the relevant buttons in order to generate a customized resource toolkit. </p>
                  <p class="intro">If you make a mistake, select the "Clear all inputs" button to clear the page.</p>
                <p>
                  {{ message }}
                </p>
                <div class="role mb-5">
                    <div class="tier0 role-buttons d-flex justify-content-md-around mb-3">
                        <button class="btn btn-info btn-lg" role="button" aria-label="Employee" :disabled=" role >= 2 " @click="tier0Submit('employee')">Employee</button>
                        <button class="btn btn-info btn-lg" role="button" aria-label="Supervisor / Manager" :disabled=" role === 1 || role === 3" @click="tier0Submit('manager')">Supervisor / Manager</button>
                        <button class="btn btn-info btn-lg" role="button" aria-label="Mental Health Professional" :disabled=" role === 1 || role === 2" @click="tier0Submit('mental health')">Mental Health Professional</button>
                    </div>
                    <div class="tier1 clarify-role mt-5" aria-live="polite">
                        <Transition
                        name="custom-classes"
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutUp"
                        >
                          <div class="tier1-question1" key="1" v-if="role === 1">
                            <p>Do you manage people?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" :disabled=" final1 === 2" @click="tier1Submit('manager')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" :disabled=" final1 === 1" @click="tier1Submit('not manager')">No</button>
                            </div>
                          </div>
                          <div class="tier1-question2" key="2" v-else-if="role === 2">
                            <p>Are you an Executive?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" :disabled=" final2 === 2" @click="tier1Submit('executive')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" :disabled=" final2 === 1" @click="tier1Submit('not executive')">No</button>
                            </div>
                          </div>
                          <div class="tier1-question3" key="3" v-else-if="role === 3">
                            <p>Which of these best describes your role?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Psychotherapist" :disabled=" final3 === 2" @click="tier1Submit('psychotherapist')">Psychotherapist</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="Social Worker" :disabled=" final3 === 1" @click="tier1Submit('social worker')">Social Worker</button>
                            </div>
                          </div>
                        </Transition>
                    </div>
                    <div class="tier2 mt-5" aria-live="polite">
                      <div class="tier2-question1-wrapper" aria-live="polite">
                        <Transition
                        name="custom-classes"
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutUp"
                        >
                          <div class="tier2-question1-1" v-if="final1 === 1">
                            <p>Have you submitted a disability claim for yourself or your employees?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('manager claim')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not manager claim')">No</button>
                            </div>
                          </div>
                          <div class="tier2-question1-2" v-else-if="final1 === 2">
                            <p>Have you submitted a disability claim for yourself?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('employee claim')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not employee claim')">No</button>
                            </div>
                          </div>
                        </Transition>
                      </div>
                      <div class="tier2-question2-wrapper" aria-live="polite">
                        <Transition
                        name="custom-classes"
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutUp"
                        >
                          <div class="tier2-question2-1" v-if="final2 === 1">
                            <p>Have you had to implement an action plan for your branch?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('action plan')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not action plan')">No</button>
                            </div>
                          </div>
                          <div class="tier2-question2-2" v-else-if="final2 === 2">
                            <p>Have you submitted a disability claim for yourself or your employees?</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('disability claim submission')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not disability claim submission')">No</button>
                            </div>
                          </div>
                        </Transition>
                      </div>
                      <div class="tier2-question3-wrapper" aria-live="polite">
                        <Transition
                        name="custom-classes"
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutUp"
                        >
                          <div class="tier2-question3-1" v-if="final3 === 1">
                            <p>Have you been involved in a disability insurance claim before</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('disability insurance')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('not disability insurance')">No</button>
                            </div>
                          </div>
                          <div class="tier2-question3-2" v-else-if="final3 === 2">
                            <p>Final Question 3.5</p>
                            <div class="d-flex justify-content-md-around mb-3">
                              <button class="btn btn-info btn-lg" role="button" aria-label="Yes" @click="tier2Submit('final question yes')">Yes</button>
                              <button class="btn btn-info btn-lg" role="button" aria-label="No" @click="tier2Submit('final question no')">No</button>
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
                <p v-if="MHRole">
                  You are a registered {{ MHRole }}
                </p>
                <p v-if="employeeClaim">You have submitted a claim on your own behalf.</p>
                <p>Here is a list of resources that may help you in your role.</p>
                <div class="resources">
                  <ul class="resource-list">
                    <li v-if="manager">
                      {{ resources.managerItem }}
                    </li>
                    <li v-if="executive">
                      {{ resources.executiveItem }}
                    </li>
                    <li v-if="employee">
                      {{ resources.employeeItem }}
                    </li>
                  </ul>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.33 348.77"><defs></defs><g id="a"/><g id="b"><g id="c"><path class="f" d="M167.99,262.45c3.64,1.21,78.91,8.5,78.91,8.5,0,0-10.32-26.1-5.46-31.56,4.86-5.46,78.91-62.61,78.91-62.61,0,0-27.32-10.23-20.64-16.91l13.96-50.38s-45.53,10.93-48.56,9.11-7.89-8.5-9.11-24.89c0,0-40.06,50.99-44.92,43.71,0,0-12.75,7.89,12.14-91.05,0,0-24.28,13.35-29.74,11.53-5.46-1.82-20.09-31.49-32.78-55.76v-.09l-.02,.04-.02-.04v.09c-12.69,24.26-27.32,53.94-32.78,55.76-5.46,1.82-29.74-11.53-29.74-11.53,24.89,98.94,12.14,91.05,12.14,91.05-4.86,7.28-44.92-43.71-44.92-43.71-1.21,16.39-6.07,23.07-9.11,24.89S7.69,109.48,7.69,109.48l13.96,50.38c6.68,6.68-20.64,16.91-20.64,16.91,0,0,74.06,57.15,78.91,62.61,4.86,5.46-5.46,31.56-5.46,31.56,0,0,75.27-7.28,78.91-8.5s-3.08,85.59-3.08,85.59h20.77s-6.72-86.8-3.08-85.59Z"/><path class="e" d="M176.99,262.68c3.64,1.21,78.91,8.5,78.91,8.5,0,0-10.32-26.1-5.46-31.56,4.86-5.46,78.91-62.61,78.91-62.61,0,0-27.32-10.23-20.64-16.91l13.96-50.38s-45.53,10.93-48.56,9.11-7.89-8.5-9.11-24.89c0,0-40.06,50.99-44.92,43.71,0,0-12.75,7.89,12.14-91.05,0,0-24.28,13.35-29.74,11.53-5.46-1.82-20.09-31.49-32.78-55.76v-.09l-.02,.04-.02-.04v.09c-12.69,24.26-27.32,53.94-32.78,55.76-5.46,1.82-29.74-11.53-29.74-11.53,24.89,98.94,12.14,91.05,12.14,91.05-4.86,7.28-44.92-43.71-44.92-43.71-1.21,16.39-6.07,23.07-9.11,24.89s-48.56-9.11-48.56-9.11l13.96,50.38c6.68,6.68-20.64,16.91-20.64,16.91,0,0,74.06,57.15,78.91,62.61,4.86,5.46-5.46,31.56-5.46,31.56,0,0,75.27-7.28,78.91-8.5s-3.08,85.59-3.08,85.59h20.77s-6.72-86.8-3.08-85.59Z"/><path class="d" d="M185.97,262.88c3.64,1.21,78.91,8.5,78.91,8.5,0,0-10.32-26.1-5.46-31.56,4.86-5.46,78.91-62.61,78.91-62.61,0,0-27.32-10.23-20.64-16.91l13.96-50.38s-45.53,10.93-48.56,9.11-7.89-8.5-9.11-24.89c0,0-40.06,50.99-44.92,43.71,0,0-12.75,7.89,12.14-91.05,0,0-24.28,13.35-29.74,11.53-5.46-1.82-20.09-31.49-32.78-55.76v-.09l-.02,.04-.02-.04v.09c-12.69,24.26-27.32,53.94-32.78,55.76-5.46,1.82-29.74-11.53-29.74-11.53,24.89,98.94,12.14,91.05,12.14,91.05-4.86,7.28-44.92-43.71-44.92-43.71-1.21,16.39-6.07,23.07-9.11,24.89s-48.56-9.11-48.56-9.11l13.96,50.38c6.68,6.68-20.64,16.91-20.64,16.91,0,0,74.06,57.15,78.91,62.61,4.86,5.46-5.46,31.56-5.46,31.56,0,0,75.27-7.28,78.91-8.5s-3.08,85.59-3.08,85.59h20.77s-6.72-86.8-3.08-85.59Z"/></g></g></svg>
          </div>
        </footer>
      </div>
</template>
<style scoped>
   body {
    font-family: 'helvetica', sans-serif;
   }

   .intro {
    font-size: 26px;
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

   .btn.btn-info:hover, .btn.btn-info:focus {
    background-color: #583a79;
   }

   .clear-button {
    position: fixed;
    bottom: 3rem;
    font-size: 20px;
   }

   .design {
    position: fixed;
    bottom: -3rem;
    right: 0rem;
    width: 17%;
   }

   .invisible {
    visibility: hidden;
   }

   .d{fill:#662d91;}.e{fill:#fff;}.e,.f{stroke:#662d91;stroke-miterlimit:10;}.f{fill:none;}

</style>
<script>
export default {
    name: 'Path',
    data: function() {
        return {
            role: 0,
            final1: 0,
            final2: 0,
            final3: 0,
            complete: false,
            job: '',
            manager: false,
            employee: false,
            executive: false,
            MHRole: '',
            managerClaim: false,
            employeeClaim: false,
            actionPlan: false,
            message: 'Which one of these are you?',
            resources: {
              employeeItem: 'http://www.employeehelp.com',
              managerItem: 'http://www.managersunite.com',
              executiveItem: 'http://www.executives.com',
              psychotherapistItem: '',
              socialItem: ''
            }
        }
    },
    methods: {
        tier0Submit: function(description) {
          if (description === 'employee') {
            this.role = 1; this.finalClear(); this.job = 'an Employee';
          }
          else if (description === 'manager') {
            this.role = 2; this.finalClear(); this.job = 'a Manager'; this.ma
          }
          else if (description === 'mental health') {
            this.role = 3; this.finalClear(); this.job = 'a Mental Health Professional'
          }
          
        },
        tier1Submit: function(clarifier) {
          if (clarifier === 'manager') {
            this.final1 = 1; this.manager = true;
          }
          else if (clarifier === 'not manager') {
            this.final1 = 2; this.manager = false;
          }
          else if (clarifier === 'executive') {
            this.final2 = 1; this.executive = true;
          }
          else if (clarifier === 'not executive') {
            this.final2 = 2; this.executive = false;
          }
          else if (clarifier === 'psychotherapist') {
            this.final3 = 1; this.MHRole = 'Psychotherapist'
          }
          else if (clarifier === 'social worker') {
            this.final3 = 2; this. MHRole = 'Social Worker'
          }
        },
        tier2Submit: function(clarifier) {
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
            break;
          }
          /*if (clarifier === 'manager claim') {
            this.managerClaim = true
          }
          else if (clarifier === 'not manager claim') {
            this.managerClaim = false
          }
          else if (clarifier === 'employee claim') {
            this.employeeClaim = true
          }
          else if (clarifier === 'not employee claim') {
            this.employeeClaim = false
          }
          else if (clarifier === 'action plan') {
            this.actionPlan = true
          }
          else if (clarifier === 'not action plan') {
            this.actionPlan = false
          }
          else if (clarifier === 'disability claim submission') {
            
          }
          else if (clarifier === 'not disability claim submission') {
            
          }
          else if (clarifier === 'disability insurance') {
            
          }
          else if (clarifier === 'not disability insurance') {
            
          }
          else if (clarifier === 'final question yes') {
            
          }
          else if (clarifier === 'final question no') {

          }*/
        },
        finalClear: function() {
          this.final1 = 0
          this.final2 = 0
          this.final3 = 0
        },
        resetAll: function() {
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
          this.message = 'Which one of these are you?'
        }
    }
}
</script>