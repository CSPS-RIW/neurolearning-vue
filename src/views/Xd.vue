<template>
    <main>
        <h1>Toolkit</h1>
        <div class="holster">
            <div class="questionnaire-wrapper">
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
            </div>
            <div class="nav-buttons">
            <button class="back" @click="step--" :disabled=" this.step <= 1">Back</button>
            <button class="next" @click="step++" :disabled=" this.step >= 3 ">Next</button>
            </div>
            <div class="progress">
                
            </div>
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
        background-color: #FCF9FF;
    }

    .holster {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .questionnaire-wrapper {
        border-radius: 50%;
        border: 20px solid #3F2A56;
        padding: 5rem;
        max-width: 520px;
        height: 500px;
    }

    .questionnaire {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h2, p {
            text-align: center;
        }
    }

    form.options {
       display: flex;
       flex-direction: column;
    }

    input[type="checkbox"], input[type="radio"] {
        margin-right: 0.5rem;
    }

    .nav-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
    }
</style>