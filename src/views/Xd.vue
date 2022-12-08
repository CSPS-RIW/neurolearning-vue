<template>
    <main>
        
        <div class="holster">
            <div class="questionnaire-wrapper">
                <div class="questionnaire-header">
                    <h1>Your Custom Toolkit</h1>
                </div>
                <div class="questionnaire questionnaire-1" v-if="step === 1">
                    <h2>I am interested in...</h2>
                    <p>Select all that apply.</p>
                    <form class="options">
                        <div>
                            <input type="checkbox" name="csps-learning-products" id="csps-learning-products" aria-label="learning products by CSPS" v-model="question1.cspslearning">
                            <label for="csps-learning-products">Learning products by CSPS</label>
                        </div>
                        <div>
                            <input type="checkbox" name="other-learning-products" id="other-learning-products" aria-label="learning products by other organizations" v-model="question1.otherlearning">
                            <label for="other-learning-products">Learning products by other organizations</label>
                        </div>
                        <div>
                            <input type="checkbox" name="self-id" id="self-id" aria-label="Self-assessment tools" v-model="question1.selfid">
                            <label for="self-id">Self-assessment tools</label>
                        </div>
                        <div>
                            <input type="checkbox" name="events" id="events" aria-label="Events on mental health" v-model="question1.events">
                            <label for="events">Events on mental health</label>
                        </div>
                        <div>
                            <input type="checkbox" name="urgent-help" id="urgent-help" aria-label="Urgent/immediate help resources" v-model="question1.urgenthelp">
                            <label for="urgent-help">Urgent/immediate help resources</label>
                        </div>
                        <div>
                            <input type="checkbox" name="community-resources" id="community-resources" aria-label="Resources for specific communities" v-model="question1.communities">
                            <label for="community-resources">Resources for specific communities</label>
                        </div>
                    </form>
                </div>
                <div class="questionnaire questionnaire-2" v-if="step === 2">
                    <p>Thank you for your selection. You may choose to answer a few additional questions to better customize the list of resources to meet your needs. </p>
                    <p>Please note that your responses to the questions will only be used to generate a customized list of resources and no responses will be stored by CSPS.</p>
                    <button class="skip">Skip to end</button>
                </div>
                <div class="questionnaire questionnaire-3" v-if="step === 3">
                    <p>Which of these best describes your role? </p>
                    <form class="options">
                        <div>
                            <input type="radio" name="option" id="employee" aria-label="employee" value="employee" v-model="question2.role">
                            <label for="employee">Employee</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="manager" aria-label="manager" value="manager" v-model="question2.role">
                            <label for="manager">Manager</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional" value="mhp" v-model="question2.role">
                            <label for="mental-health">Mental Health Professional</label>
                        </div>
                    </form>
                </div>
                <div class="questionnaire questionnaire-4" v-if="step === 4">
                    <p>As an {{ this.question2.role }}, do you ...</p>
                    <form class="options" v-if="this.question2.role === 'employee'">
                        <div>
                            <input type="radio" name="option" id="employee" aria-label="employee" value="employee" >
                            <label for="employee">Employee option 1</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="manager" aria-label="manager" value="manager">
                            <label for="manager">Employee option 2</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional" value="mhp">
                            <label for="mental-health">Employee option 3</label>
                        </div>
                    </form>
                    <form class="options" v-if="this.question2.role === 'manager'">
                        <div>
                            <input type="radio" name="option" id="employee" aria-label="employee" value="employee">
                            <label for="employee">Employee</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="manager" aria-label="manager" value="manager">
                            <label for="manager">Manager</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional" value="mhp">
                            <label for="mental-health">Mental Health Professional</label>
                        </div>
                    </form>
                    <form class="options" v-if="this.question2.role === 'mhp'">
                        <div>
                            <input type="radio" name="option" id="employee" aria-label="employee" value="employee">
                            <label for="employee">Employee</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="manager" aria-label="manager" value="manager">
                            <label for="manager">Manager</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional" value="mhp">
                            <label for="mental-health">Mental Health Professional</label>
                        </div>
                    </form>
                </div>
                <div class="customized-toolkit" v-if="step === 5">
                    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
                </div>
            </div>
           
                
            </div>
             <div class="nav-buttons">
            <button class="back" @click="step--" :disabled=" this.step <= 1">Back</button>
            <button class="next" @click="step++" :disabled=" this.step >= 5 ">Next</button>
            </div>
            <div class="progress">
        </div>
    </main>
</template>
<script>
export default {
    name: 'Xd',
    data: function() {
        return {
            step: 1,
            question1: {
                cspslearning: false,
                otherlearning: false,
                selfid: false,
                events: false,
                urgenthelp: false,
                communities: false
            },
            question2: {
                role: ''
            }
        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    main {
        border: 7px solid #DA797A;
        min-height: 100vh;
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
        margin-top: 1.5rem;
    }

    .questionnaire-wrapper {
        
        //border: 10px solid #3F2A56;
        background-color: #FEFEFE;
        border-radius: 10px;
        //padding: 1rem;
        margin-bottom: 2rem;
        max-width: 520px;
        min-height: 500px;
        height: auto;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 10px 40px #c5c5c5;
    }

    .questionnaire {
        color: rgb(12, 12, 12);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem;

        h2, p {
            text-align: center;
        }

        p {
            font-size: 1.3rem;
        }
    }

    .questionnaire-header {
        background: rgb(63,42,86);
        background: linear-gradient(90deg, rgba(63,42,86,1) 40%, rgba(83,86,171,1) 100%);
        color: white;
        border-radius: 10px;
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

    input[type="checkbox"], input[type="radio"] {
        width: 16px;
        height: 16px;
        margin: 0.5rem 0.5rem 0rem 0rem;
    }

    .nav-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    button {
        font-size: 1.5rem;
        padding: 0.3rem 4rem;
        background-color: #3F2A56;
        color: #FFF;
        border-radius: 5px;
        border: none;

        &:disabled {
            background-color: grey;
        }

        &.skip {
            background-color: #EEEEEE;
            color: #3F2A56;
        }
    }
</style>