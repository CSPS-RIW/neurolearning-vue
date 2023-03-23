<script setup lang="ts">
import { useCycleList, useTitle } from '@vueuse/core';
import { onBeforeMount, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiAccordions from './components/MultiAccordions.vue';
import SimpleAccordion from './components/SimpleAccordion.vue';

const step = ref(1)
const totalSteps = ref(4)
const activityStart = ref(false)

const question1 = reactive(
  {
    general: false,
    indigenous: false,
    lgbt: false,
    publicServants: false,
    csps: false
  }
)

const question2 = reactive(
  {
    role: ''
  }
)


const question3 = reactive(
  {
    poc: false,
    lgbt: false,
    disability: false
  }
)

const { t, locale, availableLocales } = useI18n()



// Set html lang based on current locale
const locales = useCycleList(availableLocales)
let lang = document.querySelector('html')
let currLang = lang?.getAttribute('lang')
// set page title
const title = useTitle()


// methods
function changeLang() {
  locale.value !== 'en' ? locale.value = 'en' : locale.value = 'fr'
  lang?.setAttribute('lang', locale.value)
  title.value = t('pageTitle')
}


function determineAccordionNum(e: any) {
  let decider = e.target.getAttribute('data-accordion-target')
  let accordionArray = Array.from(document.querySelectorAll('.accordion > div'))
  let multiAccGroup = document.querySelector('.multi-accordion-group')

  accordionArray.map(arr => {
    // arr is accordion that matches decider
    if (decider === arr.getAttribute('data-accordion')) {
      // Show this accordion
      arr.toggleAttribute('hidden')
      arr.toggleAttribute('checked')

      if (Object.values(question1).some((v: any) => v === true)) {
        multiAccGroup?.removeAttribute('hidden')
      } else {
        multiAccGroup?.setAttribute('hidden', '')
      }


    }
  })

}


// life cycle hooks

onBeforeMount(() => {
  if (currLang) {
    locale.value = currLang
    lang?.setAttribute('lang', locale.value)
    title.value = t('pageTitle')
  }

})


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
            <a href="#" class="lang-toggle" @click.prevent="changeLang" :title="t('langToggle')"
              :lang="t('shortToggle')">{{
                t('shortToggle') }}</a>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="card"  v-if="!activityStart">
        <div class="card-body d-flex flex-column justify-content-center">
          <p>{{ $t("intro") }}</p>
          <button class="btn-regular" @click="activityStart = true">
            Start
          </button>
        </div>
      </div>
      <div id="toolkit_wrapper" v-if="activityStart">
        <div class="holster">
        
          <div class="questionnaire-wrapper" aria-live="polite" role="region" aria-label="Questionnaire">
            <div class="questionnaire-header">
              <h2 class="questionnaire-heading text-center">
                {{ $t("heading") }}
              </h2>
            </div>
        
            <div class="questionnaire questionnaire-1" v-if="step === 1">
              <p>{{ $t("selectAll") }}</p>
              <p class="text-center"><strong>{{ $t("interested") }}</strong></p>
              
              <form class="options">
                <div>
                  <input type="checkbox" class="decider" name="general-resources" id="general-resources"
                    v-model="question1.general" @change="determineAccordionNum" data-accordion-target="1">
                  <label for="general-resources">{{ t("checkboxes[0]") }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="indigenous-resources" id="indigenous-resources"
                    v-model="question1.indigenous" @change="determineAccordionNum" data-accordion-target="2">
                  <label for="indigenous-resources">{{ t("checkboxes[1]") }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="lgbt-support" id="lgbt-support" v-model="question1.lgbt"
                    @change="determineAccordionNum" data-accordion-target="3">
                  <label for="lgbt-support">{{ t("checkboxes[2]") }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="public-servant-resources" id="public-servant-resources" v-model="question1.publicServants"
                    @change="determineAccordionNum" data-accordion-target="4">
                  <label for="public-servant-resources">{{ t("checkboxes[3]") }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="csps-resources" id="csps-resources" v-model="question1.csps"
                    @change="determineAccordionNum" data-accordion-target="5">
                  <label for="csps-resources">{{ t("checkboxes[4]") }}</label>
                </div>
              </form>
            </div>
            <div class="questionnaire questionnaire-2" v-if="step === 2">
              <p>{{ $t("thankYouPara[0]") }}</p>
              <p>{{ $t("thankYouPara[1]") }}</p>
              <button class="btn-regular skip" @click="step = 4">{{ t("buttons.skip") }}</button>
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
                  <input type="radio" name="option" id="executive" aria-label="executive"
                    value="a mental health professional" v-model="question2.role">
                  <label for="executive">{{ t("roles[2]") }}</label>
                </div>
              </form>
            </div>
            <div class="customized-toolkit" v-show="step === 4">
              <SimpleAccordion v-show="Object.values(question1).every((v: any) => v === false)">
        
                <template v-slot:AccTitle>
                  {{ $t('accordionTitles[0]') }}
                </template>
                <template v-slot:AccBody>
                  <ul class="en" v-show="locale === 'en'">
                    <li>The Canadian Mental Health Association is a nationwide organization that promotes mental health and supports people recovering from mental illness.</li>
                    <li>Crisis Services Canada offers a toll-free, 24/7 suicide prevention service throughout the year at 1-833-456-4566. Whether you are suffering from a loss, worried about someone who may be having suicidal thoughts, or having suicidal thoughts yourself, highly trained responders can provide support.</li>
                    <li>Kids Help Phone is a 24/7 national service offering professional counselling, information, referrals and volunteer-led, text-based support to young people in both English and French.</li>
                    <li>ShelterSafe.ca is an online resource for women and their children seeking safety from violence and abuse.</li>
                    <li>The Bullying web page provides information on how to recognize and prevent bullying, as well as bullying prevention resources.</li>
                    <li></li>
                    <li>The Violence and Abuse web page provides information about violence and abuse, its prevention and how to get help if you are being abuse.</li>
                    <li>Wellness Together Canada provides phone, video, and text counselling, information and videos on common mental health and substance use issues, wellness programs, and community and peer support.</li>
                    <li>The Mental Health Commission of Canada leads the development and dissemination of innovative programs and tools to support the mental health and wellness of Canadians</li>
                    <li>Mental Health Continuum Self-Check that can help us to identify how we are doing and when there is a need for support. </li>
                  </ul>
                  <ul class="fr" v-show="locale === 'fr'">
                    <li>- L'Association canadienne pour la santé mentale est une organisation nationale qui promeut la santé mentale et soutient les personnes qui se rétablissent d'une maladie mentale.</li>
                    <li>- Crisis Services Canada offre un service gratuit de prévention du suicide 24 heures sur 24, 7 jours sur 7, tout au long de l'année, en composant le 1-833-456-4566. Que vous souffriez d'une perte, que vous vous inquiétiez pour quelqu'un qui pourrait avoir des pensées suicidaires ou que vous ayez vous-même des pensées suicidaires, des intervenants hautement qualifiés peuvent vous apporter leur soutien.</li>
                    <li>- Jeunesse, J'écoute est un service national accessible 24 heures sur 24, 7 jours sur 7, qui offre aux jeunes des conseils professionnels, des informations, des orientations et un soutien textuel assuré par des bénévoles, en anglais et en français.</li>
                    <li>- ShelterSafe.ca est une ressource en ligne pour les femmes et leurs enfants qui cherchent à se protéger de la violence et des abus.</li>
                    <li>- La page Web sur l'intimidation fournit des informations sur la façon de reconnaître et de prévenir l'intimidation, ainsi que des ressources sur la prévention de l'intimidation.</li>
                    <li>- La page Web sur la violence et les abus fournit des informations sur la violence et les abus, leur prévention et la manière d'obtenir de l'aide si vous êtes victime d'abus.</li>
                    <li>- Wellness Together Canada propose des conseils par téléphone, par vidéo et par texto, des informations et des vidéos sur les problèmes courants de santé mentale et de toxicomanie, des programmes de bien-être, ainsi qu'un soutien communautaire et par les pairs.</li>
                    <li>- La Commission de la santé mentale du Canada dirige l'élaboration et la diffusion de programmes et d'outils novateurs destinés à favoriser la santé mentale et le bien-être des Canadiens.</li>
                    <li>- Autocontrôle du continuum de la santé mentale, qui peut nous aider à identifier notre situation et à déterminer si nous avons besoin d'aide.</li>
                  </ul>
                </template>
              </SimpleAccordion>
              <div class="go-back questionnaire" v-show="Object.values(question1).every((v: any) => v === false)">
                <p>{{ $t('ifInterestedIn') }}</p>
        
              </div>
              <MultiAccordions :AccNum="6">
                <template #AccTitle-1 data-accordion="1" class="accordions">{{ $t('accordionTitles[0]') }}</template>
                <template #AccBody-1>
                  <ul class="en">
                    <li>The Canadian Mental Health Association is a nationwide organization that promotes mental health and supports people recovering from mental illness.</li>
                    <li>Crisis Services Canada offers a toll-free, 24/7 suicide prevention service throughout the year at 1-833-456-4566. Whether you are suffering from a loss, worried about someone who may be having suicidal thoughts, or having suicidal thoughts yourself, highly trained responders can provide support.</li>
                    <li>Kids Help Phone is a 24/7 national service offering professional counselling, information, referrals and volunteer-led, text-based support to young people in both English and French.</li>
                    <li>ShelterSafe.ca is an online resource for women and their children seeking safety from violence and abuse.</li>
                    <li>The Bullying web page provides information on how to recognize and prevent bullying, as well as bullying prevention resources.</li>
                    <li></li>
                    <li>The Violence and Abuse web page provides information about violence and abuse, its prevention and how to get help if you are being abuse.</li>
                    <li>Wellness Together Canada provides phone, video, and text counselling, information and videos on common mental health and substance use issues, wellness programs, and community and peer support.</li>
                    <li>The Mental Health Commission of Canada leads the development and dissemination of innovative programs and tools to support the mental health and wellness of Canadians</li>
                    <li>Mental Health Continuum Self-Check that can help us to identify how we are doing and when there is a need for support. </li>
                  </ul>
                  <ul class="fr">

                  </ul>
                </template>
                <template #AccTitle-2 data-accordion="2" class="accordions">{{ $t('accordionTitles[1]') }}</template>
                <template #AccBody-2>
                  <ul>
                    <li><a href="#">Other Learning Product - Course 1</a></li>
                    <li><a href="#">Other Learning Product - Course 2</a></li>
                    <li><a href="#">Other Learning Product - Course 3</a></li>
                  </ul>
                </template>
                <template #AccTitle-3 data-accordion="3" class="accordions">{{ $t('accordionTitles[2]') }}</template>
                <template #AccBody-3>
                  <ul>
                    <li><a href="#">Tool 1</a></li>
                    <li><a href="#">Tool 2</a></li>
                    <li><a href="#">Tool 3</a></li>
                  </ul>
                </template>
                <template #AccTitle-4 data-accordion="4" class="accordions">{{ $t('accordionTitles[3]') }}</template>
                <template #AccBody-4>
                  <ul>
                    <li><a href="#">Event on Mental Health 1</a></li>
                    <li><a href="#">Event on Mental Health 2</a></li>
                    <li><a href="#">Event on Mental Health 3</a></li>
                  </ul>
                </template>
                <template #AccTitle-5 data-accordion="5" class="accordions">{{ $t('accordionTitles[4]') }}</template>
                <template #AccBody-5>
                  <ul>
                    <li><a href="#">Urgent Help Resource 1</a></li>
                    <li><a href="#">Urgent Help Resource 2</a></li>
                    <li><a href="#">Urgent Help Resource 3</a></li>
                  </ul>
                </template>
              </MultiAccordions>
            </div>
          </div>
        </div>
        <div class="progress-tracker mobile">
          <nav role="navigation" aria-label="Toolkit Pagination">
            <ul>
              <li v-for="currentStep in totalSteps" :key="currentStep" class="dot"
                :class="{ active: step === currentStep }">
                <a href="#" @click.prevent="step = currentStep" :aria-label="`Go to step ${currentStep}`"
                  :aria-current="step === currentStep">
                  {{ currentStep }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="nav-buttons">
        
          <button class="btn-regular back" @click="step--" :disabled="step <= 1">{{ $t('buttons.back')
          }}</button>
          <div class="progress-tracker tablet">
            <nav role="navigation" aria-label="Toolkit Pagination">
              <ul>
                <li v-for="currentStep in totalSteps" :key="currentStep" class="dot"
                  :class="{ active: step === currentStep }">
                  <a href="#" @click.prevent="step = currentStep" :aria-label="`Go to step ${currentStep}`"
                    :aria-current="step === currentStep">
                    {{ currentStep }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <button class="btn-regular next" @click="step++" :disabled="step >= 4">{{ $t('buttons.next') }}</button>
        </div>
      </div>
    </main>
  </div>
</template>
