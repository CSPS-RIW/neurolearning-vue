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
                            <input type="checkbox" name="csps-learning-products" id="csps-learning-products"
                                aria-label="learning products by CSPS" v-model="question1.cspslearning">
                            <label for="csps-learning-products">Learning products by CSPS</label>
                        </div>
                        <div>
                            <input type="checkbox" name="other-learning-products" id="other-learning-products"
                                aria-label="learning products by other organizations" v-model="question1.otherlearning">
                            <label for="other-learning-products">Learning products by other organizations</label>
                        </div>
                        <div>
                            <input type="checkbox" name="self-id" id="self-id" aria-label="Self-assessment tools"
                                v-model="question1.selfid">
                            <label for="self-id">Self-assessment tools</label>
                        </div>
                        <div>
                            <input type="checkbox" name="events" id="events" aria-label="Events on mental health"
                                v-model="question1.events">
                            <label for="events">Events on mental health</label>
                        </div>
                        <div>
                            <input type="checkbox" name="urgent-help" id="urgent-help"
                                aria-label="Urgent/immediate help resources" v-model="question1.urgenthelp">
                            <label for="urgent-help">Urgent/immediate help resources</label>
                        </div>
                        <div>
                            <input type="checkbox" name="community-resources" id="community-resources"
                                aria-label="Resources for specific communities" v-model="question1.communities">
                            <label for="community-resources">Resources for specific communities</label>
                        </div>
                    </form>
                </div>
                <div class="questionnaire questionnaire-2" v-if="step === 2">
                    <p>Thank you for your selection. You may choose to answer a few additional questions to better
                        customize the list of resources to meet your needs. </p>
                    <p>Please note that your responses to the questions will only be used to generate a customized list
                        of resources and no responses will be stored by CSPS.</p>
                    <button class="btn-regular skip">Skip to end</button>
                </div>
                <div class="questionnaire questionnaire-3" v-if="step === 3">
                    <p>Which of these best describes your role? </p>
                    <form class="options">
                        <div>
                            <input type="radio" name="option" id="employee" aria-label="employee" value="employee"
                                v-model="question2.role">
                            <label for="employee">Employee</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="manager" aria-label="manager" value="manager"
                                v-model="question2.role">
                            <label for="manager">Manager</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional"
                                value="mhp" v-model="question2.role">
                            <label for="mental-health">Mental Health Professional</label>
                        </div>
                    </form>
                </div>
                <div class="questionnaire questionnaire-4" v-if="step === 4">
                    <h2>As an {{ this.question2.role }}, do you identify as...</h2>
                    <p><b>Select all that apply</b></p>
                    <form class="options">
                        <div>
                            <input type="checkbox" name="option" id="POC" aria-label="POC" v-model="question3.poc">
                            <label for="POC">a person of colour</label>
                        </div>
                        <div>
                            <input type="checkbox" name="option" id="LGBT" aria-label="LGBT" v-model="question3.lgbt">
                            <label for="LGBT">a member of the SLGBTQIA+ community</label>
                        </div>
                        <div>
                            <input type="checkbox" name="option" id="mental-health" aria-label="mental health professional" v-model="question3.disability">
                            <label for="mental-health">a person living with a disability</label>
                        </div>
                    </form>
                    <!--
                        Commenting out for now, adding in questions about Identities
                        <form class="options" v-if="this.question2.role === 'employee'">
                        <div>
                            <input type="radio" name="option" id="employee" aria-label="employee" value="employee">
                            <label for="employee">Employee option 1</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="manager" aria-label="manager" value="manager">
                            <label for="manager">Employee option 2</label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional"
                                value="mhp">
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
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional"
                                value="mhp">
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
                            <input type="radio" name="option" id="mental-health" aria-label="mental health professional"
                                value="mhp">
                            <label for="mental-health">Mental Health Professional</label>
                        </div>
                    </form>-->
                </div>
                <div class="customized-toolkit" v-if="step === 5">
                    <div class="accordion" id="resourcesaccordion">
                        <div class="accordion-item" v-if="question1.cspslearning">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    CSPS Learning Products
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                data-bs-parent="#resourcesaccordion">
                                <div class="accordion-body">
                                    <ul>
                                        <li><a href="#">Course 1</a></li>
                                        <li><a href="#">Course 2</a></li>
                                        <li><a href="#">Course 3</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" v-if="question1.otherlearning">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Other organizations' learning products
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                data-bs-parent="#resourcesaccordion">
                                <div class="accordion-body">
                                    <ul>
                                        <li><a href="#">Course 1</a></li>
                                        <li><a href="#">Course 2</a></li>
                                        <li><a href="#">Course 3</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" v-if="question1.selfid">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Self-assessment Tools
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                data-bs-parent="#resourcesaccordion">
                                <div class="accordion-body">
                                    <ul>
                                        <li><a href="#">Tool 1</a></li>
                                        <li><a href="#">Tool 2</a></li>
                                        <li><a href="#">Tool 3</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" v-if="question1.events">
                            <h2 class="accordion-header" id="headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Events on Mental Health
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                data-bs-parent="#resourcesaccordion">
                                <div class="accordion-body">
                                    <ul>
                                        <li><a href="#">Event 1</a></li>
                                        <li><a href="#">Event 2</a></li>
                                        <li><a href="#">Event 3</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" v-if="question1.urgenthelp">
                            <h2 class="accordion-header" id="headingFive">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Urgent help resources
                                </button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                                data-bs-parent="#resourcesaccordion">
                                <div class="accordion-body">
                                    <ul>
                                        <li><a href="#">Event 1</a></li>
                                        <li><a href="#">Event 2</a></li>
                                        <li><a href="#">Event 3</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" v-if="question1.communities">
                            <h2 class="accordion-header" id="headingSix">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    Resources for specific communities
                                </button>
                            </h2>
                            <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                                data-bs-parent="#resourcesaccordion">
                                <div class="accordion-body">
                                    <section v-if="question3.lgbt">
                                        <h3>SLGBTQ+ Resources</h3>
                                        <ul>
                                            <li><a href="#">Resource 1</a></li>
                                            <li><a href="#">Resource 2</a></li>
                                            <li><a href="#">Resource 3</a></li>
                                        </ul>
                                    </section>
                                    <section v-if="question3.poc">
                                        <h3>Resources for Persons of Colour</h3>
                                        <ul>
                                            <li><a href="#">Resource 1</a></li>
                                            <li><a href="#">Resource 2</a></li>
                                            <li><a href="#">Resource 3</a></li>
                                        </ul>
                                    </section>
                                    <section v-if="question3.disability">
                                        <h3>Resources for Persons Living with Disabilities</h3>
                                        <ul>
                                            <li><a href="#">Resource 1</a></li>
                                            <li><a href="#">Resource 2</a></li>
                                            <li><a href="#">Resource 3</a></li>
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="nav-buttons">
            <button class="btn-regular back" @click="step--" :disabled=" this.step <= 1">Back</button>
            <button class="btn-regular next" @click="step++" :disabled=" this.step >= 5">Next</button>
        </div>
        <!--<div class="progress">
        </div>-->
    </main>
</template>
<script>
    export default {
        name: 'Xd',
        data: function () {
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
                },
                question3: {
                    poc: false,
                    lgbt: false,
                    disability: false
                }
            }
        },
        methods: {

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
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='637' height='637' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23DA797A' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23DA797A'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
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
        height: 80vh;
    }

    .questionnaire-wrapper {

        //border: 10px solid #3F2A56;
        background-color: #FEFEFE;
        border-radius: 10px;
        //padding: 1rem;
        margin-bottom: 2rem;
        width: 300px;
        min-height: 500px;
        height: auto;
        display: flex;
        flex-direction: column;
        //box-shadow: 0px 10px 40px #c5c5c5;

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

    button.btn-regular {
        font-size: 1.5rem;
        padding: 0.3rem 4rem;
        color: #3F2A56;
        background-color: #FFF;
        border-radius: 5px;
        border: 1px solid rgb(187, 187, 187);

        &:hover, &:focus {
            background-color: $school-coral;
        }

        &:disabled {
            background-color: grey;
        }

        &.skip {
            background-color: #EEEEEE;
            color: #3F2A56;
        }
    }
</style>