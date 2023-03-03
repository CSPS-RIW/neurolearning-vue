<script setup>
    import MultiAccordions from '../components/MultiAccordions.vue';
    import SimpleAccordion from '../components/SimpleAccordion.vue';
    import { useI18n } from 'vue-i18n';

    import { useCycleList, useStorage, useTitle, useUrlSearchParams } from '@vueuse/core';
    import { onBeforeMount, watch } from 'vue';
    import { browserInfo } from '../composables/browser-detect';

    const { t, locale, availableLocales } = useI18n()

    // Set html lang based on current locale
const locales = useCycleList(availableLocales)
let lang = document.querySelector('html')
// set page title
const title = useTitle()
title.value = t('pageTitle')

// Set lang in url
const params = useUrlSearchParams('history')
// use localstorage as ref
const preferredLanguage = useStorage('preferred-lang')


watch(locales.state, state => {
  // to chonge locale, add .value because it is a ref
  locale.value = state
  lang.setAttribute('lang', state)
  // change page title
  title.value = t('pageTitle')

  params.lang = state
  localStorage.setItem('preferred-lang', `${locale.value}`)


})

// methods
const changeLang = () => {
  locales.next()

}


// life cycle hooks

onBeforeMount(() => {
  let body = document.querySelector('body')
  let browser = browserInfo.browser
  browser === 'Chrome' && body.classList.add('chromium')
  browser === 'Firefox' && body.classList.add('gecko')

  // Allow users to share and receive link with specific lang
  if (params.lang === 'en') {
    locale.value = params.lang
  } else if (params.lang === 'fr') {
    locale.value = params.lang
    changeLang()
  } else {
    // If user access the link directly, set up preferred language
    if (preferredLanguage.value === 'en') {
      params.lang = preferredLanguage.value
      locale.value = params.lang
    } else if (preferredLanguage.value === 'fr') {
      params.lang = preferredLanguage.value
      locale.value = params.lang
      changeLang()
    } else {
      localStorage.setItem('preferred-lang', `${locale.value}`)
      params.lang = locale.value
    }
  }

})
</script>
<script>
    export default {
        name: 'Xd',
        data: function () {
            return {
                step: 1,
                totalSteps: 5,
                accordionNum: 0,
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
            navigateNext: function () {
                this.step++
            },
            navigateBack: function () {
                this.step--
            },
            determineAccordionNum(event) {
                let decider = event.target.getAttribute('data-accordion-target')
                let accordionArray = Array.from(document.querySelectorAll('.accordion > div'))
                let multiAccGroup = document.querySelector('.multi-accordion-group')

                accordionArray.map(arr => {
                    // arr is accordion that matches decider
                    if (decider === arr.getAttribute('data-accordion')) {
                        // Show this accordion
                        arr.toggleAttribute('hidden')
                        arr.toggleAttribute('checked')

                        if (Object.values(this.question1).some((v) => v === true)) {
                            multiAccGroup.removeAttribute('hidden')
                        } else {
                            multiAccGroup.setAttribute('hidden', '')
                        }


                    }
                })

            }
        }
    }
</script>
<template>
    <div class="wrapper">
        <header>
            <h1 class="text-center">{{ $t("title") }}</h1>
        </header>
        <main>
            <div class="holster">
                <div class="questionnaire-wrapper" aria-live="polite" role="region" aria-label="Questionnaire">
                    <div class="questionnaire-header">
                        <h2 class="questionnaire-heading text-center">
                            {{ $t("title") }}
                        </h2>
                    </div>

                    <div class="questionnaire questionnaire-1" v-if="step === 1">
                        <h3 class="text-center">I am interested in...</h3>
                        <p>Select all that apply.</p>
                        <form class="options">
                            <div>
                                <input type="checkbox" class="decider" name="csps-learning-products"
                                    id="csps-learning-products" v-model="question1.cspslearning"
                                    @change="determineAccordionNum" data-accordion-target="1">
                                <label for="csps-learning-products">Learning products by CSPS</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="other-learning-products"
                                    id="other-learning-products" v-model="question1.otherlearning"
                                    @change="determineAccordionNum" data-accordion-target="2">
                                <label for="other-learning-products">Learning products by other organizations</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="self-id" id="self-id"
                                    v-model="question1.selfid" @change="determineAccordionNum"
                                    data-accordion-target="3">
                                <label for="self-id">Self-assessment tools</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="events" id="events"
                                    v-model="question1.events" @change="determineAccordionNum"
                                    data-accordion-target="4">
                                <label for="events">Events on mental health</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="urgent-help" id="urgent-help"
                                    v-model="question1.urgenthelp" @change="determineAccordionNum"
                                    data-accordion-target="5">
                                <label for="urgent-help">Urgent/immediate help resources</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="community-resources"
                                    id="community-resources" v-model="question1.communities"
                                    @change="determineAccordionNum" data-accordion-target="6">
                                <label for="community-resources">Resources for specific communities</label>
                            </div>
                        </form>
                    </div>
                    <div class="questionnaire questionnaire-2" v-if="step === 2">
                        <p>Thank you for your selection. You may choose to answer a few additional questions to better
                            customize the list of resources to meet your needs. </p>
                        <p>Please note that your responses to the questions will only be used to generate a customized
                            list
                            of resources and no responses will be stored by CSPS.</p>
                        <button class="btn-regular skip" @click="this.step = 5">Skip to end</button>
                    </div>
                    <div class="questionnaire questionnaire-3" v-if="step === 3">
                        <p>Which of these best describes your role? </p>
                        <form class="options">
                            <div>
                                <input type="radio" name="option" id="employee" aria-label="employee" value="an employee"
                                    v-model="question2.role">
                                <label for="employee">Employee</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="manager" aria-label="manager" value="a manager"
                                    v-model="question2.role">
                                <label for="manager">Manager</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="mental-health"
                                    aria-label="mental health professional" value="a mental health professional" v-model="question2.role">
                                <label for="mental-health">Mental Health Professional</label>
                            </div>
                        </form>
                    </div>
                    <div class="questionnaire questionnaire-4" v-if="step === 4">
                        <h3 class="text-center"><span v-if="question2.role.length > 0">As 
                                {{ this.question2.role }},</span> do you identify as...</h3>
                        <p><b>Select all that apply</b></p>
                        <form class="options">
                            <div>
                                <input type="checkbox" name="option" id="POC" v-model="question3.poc">
                                <label for="POC">a person of colour</label>
                            </div>
                            <div>
                                <input type="checkbox" name="option" id="LGBT"
                                    v-model="question3.lgbt">
                                <label for="LGBT">a member of the SLGBTQIA+ community</label>
                            </div>
                            <div>
                                <input type="checkbox" name="option" id="mental-health"
                                     v-model="question3.disability">
                                <label for="mental-health">a person living with a disability</label>
                            </div>
                        </form>
                    </div>
                    <div class="customized-toolkit" v-show="step === 5">
                        <SimpleAccordion  v-show="Object.values(this.question1).every((v) => v === false)">
                            <template v-slot:AccTitle>
                                General Resources
                            </template>
                            <template v-slot:AccBody>
                                <ul>
                                    <li><a href="#">General Resource 1</a></li>
                                    <li><a href="#">General Resource 2</a></li>
                                    <li><a href="#">General Resource 3</a></li>
                                </ul>
                            </template>
                        </SimpleAccordion>
                        <div class="go-back questionnaire"
                            v-show="Object.values(this.question1).every((v) => v === false)">
                            
                            <p>If you are interested in more resources, please go back to the beginning of the questionnaire and select the items you are interested in.</p>
                        </div>
                        <MultiAccordions :AccNum="6">
                            <template #AccTitle-1 data-accordion="1" class="accordions">CSPS Learning
                                Products</template>
                            <template #AccBody-1>
                                <ul>
                                    <li><a href="#">Preventing Harassment and Violence in the Workplace for Employees (WMT101)</a></li>
                                    <br>
                                    <li><a href="#">Preventing Harassment and Violence in the Workplace for Designated Recipients (WMT103)</a></li>
                                    <br>
                                    <li><a href="#">Disability Management and Workplace Wellness (INC120)</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-2 data-accordion="2" class="accordions" >Other Learning
                                Products</template>
                            <template #AccBody-2>
                                <ul>
                                    <li><a href="#">Other Learning Product - Course 1</a></li>
                                    <li><a href="#">Other Learning Product - Course 2</a></li>
                                    <li><a href="#">Other Learning Product - Course 3</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-3 data-accordion="3" class="accordions">Self-Assessment
                                Tools</template>
                            <template #AccBody-3>
                                <ul>
                                    <li><a href="#">Tool 1</a></li>
                                    <li><a href="#">Tool 2</a></li>
                                    <li><a href="#">Tool 3</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-4 data-accordion="4" class="accordions">Events on Mental
                                Health</template>
                            <template #AccBody-4>
                                <ul>
                                    <li><a href="#">Event on Mental Health 1</a></li>
                                    <li><a href="#">Event on Mental Health 2</a></li>
                                    <li><a href="#">Event on Mental Health 3</a></li>
                                </ul>
                            </template>
                            <template  #AccTitle-5 data-accordion="5" class="accordions">Urgent Help
                                Resources</template>
                            <template  #AccBody-5>
                                <ul>
                                    <li><a href="#">Urgent Help Resource 1</a></li>
                                    <li><a href="#">Urgent Help Resource 2</a></li>
                                    <li><a href="#">Urgent Help Resource 3</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-6 data-accordion="6" class="accordions">Resources for
                                Specific Communities</template>
                            <template #AccBody-6>
                                <ul>
                                    <li><a href="#">Resource 1</a></li>
                                    <li><a href="#">Resource 2</a></li>
                                    <li><a href="#">Resource 3</a></li>
                                </ul>
                                <section v-if="question3.lgbt">
                                    <h3>2SLGBTQIA+ Resources</h3>
                                    <ul>
                                        <li><a href="#">2SLGBTQIA+ Resource 1</a></li>
                                        <li><a href="#">2SLGBTQIA+ Resource 2</a></li>
                                        <li><a href="#">2SLGBTQIA+ Resource 3</a></li>
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
                            </template>
                        </MultiAccordions>
                    </div>
                </div>
            </div>
            <div class="nav-buttons">
                <button class="btn-regular back" @click="navigateBack" :disabled=" this.step <= 1">Back</button>
                <div class="progress-tracker">
                    <nav role="navigation" aria-label="Toolkit Pagination">
                        <ul>
                            <li v-for="currentStep in totalSteps" :key="currentStep" class="dot"
                                :class="{ active: this.step === currentStep }">
                                <a href="#" @click="this.step = currentStep" :aria-label="`Go to step ${currentStep}`"
                                    :aria-current=" this.step === currentStep ">
                                    {{ currentStep }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <button class="btn-regular next" @click="step++" :disabled=" this.step >= 5">Next</button>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
    $school-purple: #3F2A56;
    $school-coral: #DA797A;

    html {
        padding: 0;
        margin: 0;
    }

    .wrapper {
        min-height: 100vh;
        background-color: #3F2A56;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='637' height='637' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23DA797A' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23DA797A'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
    }

    header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 1rem;
    }

    h1 {
        color: #FFF;
        background-color: $school-purple;
        margin: 0rem;
        padding: 1rem;
    }

    h2 {
        color: #fff;
    }

    a {
        text-decoration: none;
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
        width: 320px;
        min-height: 600px;
        max-height: 600px;
        overflow: scroll;
        overflow-x: hidden;
        height: auto;
        display: flex;
        flex-direction: column;
        -ms-overflow-style: none;
        /* Internet Explorer 10+ */
        scrollbar-width: none;
        /* Firefox */
        //box-shadow: 0px 10px 40px #c5c5c5;
        //mix-blend-mode: lighten;

        &::-webkit-scrollbar {
            display: none;
        }

        @media (min-width: 560px) {
            width: 560px;
        }

        @media (min-width: 720px) {
            width: 700px;
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

            label {
                -webkit-user-select: none;
                /* Chrome all / Safari all */
                -moz-user-select: none;
                /* Firefox all */
                -ms-user-select: none;
                /* IE 10+ */
                user-select: none;
                /* Likely future */

            }
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
        align-items: center;
        max-width: 751px;
        margin: auto;
    }

    button.btn-regular {
        font-size: 1.5rem;
        padding: 0.3rem 1.1rem;
        color: #3F2A56;
        background-color: #FFF;
        border-radius: 5px;
        border: 1px solid rgb(187, 187, 187);
        transition: all 0.5s;
        -webkit-user-select: none;
                /* Chrome all / Safari all */
                -moz-user-select: none;
                /* Firefox all */
                -ms-user-select: none;
                /* IE 10+ */
                user-select: none;
                /* Likely future */
        

        &:hover,
        &:focus {
            background-color: $school-purple;
            color: #fff;
            outline: 1px solid #fff;

            &:disabled {
                background-color: grey;
                color: $school-purple;
                outline: none;
            }
        }

        &:disabled {
            background-color: grey;
        }

        &.skip {
            background-color: #EEEEEE;
            color: #3F2A56;

            &:hover,
            &:focus {
                background-color: $school-purple;
                color: #fff;
                outline: 1px solid #fff;
            }
        }

        @media (min-width: 500px) {
            padding: 0.3rem 2.75rem;
        }

        @media (min-width: 720px) {
            padding: 0.3rem 4rem;
        }
    }

    .progress-tracker {
        nav ul {
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 20px;
            padding-left: 0rem;
            margin-bottom: 0rem;
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
            position: relative;

            &.active {
                background-color: $school-purple;
            }

            a {
                text-decoration: none;
                color: #ffffff00;
                font-size: 0.1rem;
                display: block;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                padding: 0rem;
                //line-height: 2px;
                position: absolute;
                left: 0px;
            }

            &::before {
                content: '';
                display: none;
            }

        }
    }
</style>