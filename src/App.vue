<script setup>
    import MultiAccordions from './components/MultiAccordions.vue';
    import SimpleAccordion from './components/SimpleAccordion.vue';
    import { useI18n } from 'vue-i18n';

    import { useCycleList, useStorage, useTitle, useUrlSearchParams } from '@vueuse/core';
    import { onBeforeMount, watch } from 'vue';

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
            <div class="container">
                <div class="row d-flex align-items-center">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <h1 class="text-center">{{ $t("title") }}</h1>
                    </div>
                    <div class="col-sm-2">
                        <a href="#" class="lang-toggle" @click="changeLang" :title="t('langToggle')" :lang="t('shortToggle')">{{ t('shortToggle') }}</a>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="holster">
                
                <div class="questionnaire-wrapper" aria-live="polite" role="region" aria-label="Questionnaire">
                    <div class="questionnaire-header">
                        <h2 class="questionnaire-heading text-center">
                            {{ $t("heading") }}
                        </h2>
                    </div>

                    <div class="questionnaire questionnaire-1" v-if="step === 1">
                        <h3 class="text-center">{{ $t("interested") }}</h3>
                        <p>{{ $t("selectAll") }}</p>
                        <form class="options">
                            <div>
                                <input type="checkbox" class="decider" name="csps-learning-products"
                                    id="csps-learning-products" v-model="question1.cspslearning"
                                    @change="determineAccordionNum" data-accordion-target="1">
                                <label for="csps-learning-products">{{ t("checkboxes[0]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="other-learning-products"
                                    id="other-learning-products" v-model="question1.otherlearning"
                                    @change="determineAccordionNum" data-accordion-target="2">
                                <label for="other-learning-products">{{ t("checkboxes[1]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="self-id" id="self-id"
                                    v-model="question1.selfid" @change="determineAccordionNum"
                                    data-accordion-target="3">
                                <label for="self-id">{{ t("checkboxes[2]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="events" id="events"
                                    v-model="question1.events" @change="determineAccordionNum"
                                    data-accordion-target="4">
                                <label for="events">{{ t("checkboxes[3]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="urgent-help" id="urgent-help"
                                    v-model="question1.urgenthelp" @change="determineAccordionNum"
                                    data-accordion-target="5">
                                <label for="urgent-help">{{ t("checkboxes[4]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" class="decider" name="community-resources"
                                    id="community-resources" v-model="question1.communities"
                                    @change="determineAccordionNum" data-accordion-target="6">
                                <label for="community-resources">{{ t("checkboxes[5]") }}</label>
                            </div>
                        </form>
                    </div>
                    <div class="questionnaire questionnaire-2" v-if="step === 2">
                        <p>{{ $t("thankYouPara[0]") }}</p>
                        <p>{{ $t("thankYouPara[1]") }}</p>
                        <button class="btn-regular skip" @click="this.step = 5">{{ t("buttons.skip") }}</button>
                    </div>
                    <div class="questionnaire questionnaire-3" v-if="step === 3">
                        <p>{{ t("whichOfThese") }}</p>
                        <form class="options">
                            <div>
                                <input type="radio" name="option" id="employee" aria-label="employee" value="an employee"
                                    v-model="question2.role">
                                <label for="employee">{{ t("roles[0]") }}</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="manager" aria-label="manager" value="a manager"
                                    v-model="question2.role">
                                <label for="manager">{{ t("roles[1]") }}</label>
                            </div>
                            <div>
                                <input type="radio" name="option" id="mental-health"
                                    aria-label="mental health professional" value="a mental health professional" v-model="question2.role">
                                <label for="mental-health">{{ t("roles[2]") }}</label>
                            </div>
                        </form>
                    </div>
                    <div class="questionnaire questionnaire-4" v-if="step === 4">
                        <h3 class="text-center"><span v-if="question2.role.length > 0">As 
                                {{ this.question2.role }},</span> {{ $t("identify") }}</h3>
                        <p><b>{{ $t("selectAll") }}</b></p>
                        <form class="options">
                            <div>
                                <input type="checkbox" name="option" id="POC" v-model="question3.poc">
                                <label for="POC">{{ $t("identities[0]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" name="option" id="LGBT"
                                    v-model="question3.lgbt">
                                <label for="LGBT">{{ $t("identities[1]") }}</label>
                            </div>
                            <div>
                                <input type="checkbox" name="option" id="mental-health"
                                     v-model="question3.disability">
                                <label for="mental-health">{{ $t("identities[2]") }}</label>
                            </div>
                        </form>
                    </div>
                    <div class="customized-toolkit" v-show="step === 5">
                        <SimpleAccordion  v-show="Object.values(this.question1).every((v) => v === false)">
                            
                            <template v-slot:AccTitle>
                                {{  $t('accordionTitles[0]') }}
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
                            <p>{{ $t('ifInterestedIn') }}</p>
                            
                        </div>
                        <MultiAccordions :AccNum="6">
                            <template #AccTitle-1 data-accordion="1" class="accordions">{{  $t('accordionTitles[1]') }}</template>
                            <template #AccBody-1>
                                <ul>
                                    <li><a href="#">Preventing Harassment and Violence in the Workplace for Employees (WMT101)</a></li>
                                    <br>
                                    <li><a href="#">Preventing Harassment and Violence in the Workplace for Designated Recipients (WMT103)</a></li>
                                    <br>
                                    <li><a href="#">Disability Management and Workplace Wellness (INC120)</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-2 data-accordion="2" class="accordions" >{{  $t('accordionTitles[2]') }}</template>
                            <template #AccBody-2>
                                <ul>
                                    <li><a href="#">Other Learning Product - Course 1</a></li>
                                    <li><a href="#">Other Learning Product - Course 2</a></li>
                                    <li><a href="#">Other Learning Product - Course 3</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-3 data-accordion="3" class="accordions">{{  $t('accordionTitles[3]') }}</template>
                            <template #AccBody-3>
                                <ul>
                                    <li><a href="#">Tool 1</a></li>
                                    <li><a href="#">Tool 2</a></li>
                                    <li><a href="#">Tool 3</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-4 data-accordion="4" class="accordions">{{  $t('accordionTitles[4]') }}</template>
                            <template #AccBody-4>
                                <ul>
                                    <li><a href="#">Event on Mental Health 1</a></li>
                                    <li><a href="#">Event on Mental Health 2</a></li>
                                    <li><a href="#">Event on Mental Health 3</a></li>
                                </ul>
                            </template>
                            <template  #AccTitle-5 data-accordion="5" class="accordions">{{  $t('accordionTitles[5]') }}</template>
                            <template  #AccBody-5>
                                <ul>
                                    <li><a href="#">Urgent Help Resource 1</a></li>
                                    <li><a href="#">Urgent Help Resource 2</a></li>
                                    <li><a href="#">Urgent Help Resource 3</a></li>
                                </ul>
                            </template>
                            <template #AccTitle-6 data-accordion="6" class="accordions">{{  $t('accordionTitles[6]') }}</template>
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
                <button class="btn-regular back" @click="navigateBack" :disabled=" this.step <= 1">{{ $t('buttons.back') }}</button>
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
                <button class="btn-regular next" @click="step++" :disabled=" this.step >= 5">{{ $t('buttons.next') }}</button>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>

    
</style>