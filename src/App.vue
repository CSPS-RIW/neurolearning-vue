<script setup lang="ts">
import { useCycleList, useTitle } from '@vueuse/core';
import { onBeforeMount, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiAccordions from './components/MultiAccordions.vue';
import SimpleAccordion from './components/SimpleAccordion.vue';
import NewWindow from './components/NewWindow.vue';

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
        <div class="row d-flex align-items-center justify-content-between">
          
          <div class="col-sm-10">
            <h1>{{ $t("title") }}</h1>
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
      <div class="card intro-card"  v-if="!activityStart">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <p>{{ $t("intro[0]") }}</p>
          <p>{{ $t("intro[1]") }}</p>
          <button class="btn btn-regular" @click="activityStart = true">
            {{ $t("buttons.start") }}
          </button>
         
        </div>
        
      </div>
      
      <div id="toolkit_wrapper" v-if="activityStart">
        <div class="holster">
        
          <div class="questionnaire-wrapper" aria-live="polite" role="region" aria-label="Questionnaire">
            <!-- <div class="questionnaire-header">
              <h2 class="questionnaire-heading">
                
              </h2>
            </div> -->
        
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
                  <input type="radio" name="option" id="employee" aria-label="employee" value="employee"
                    v-model="question2.role">
                  <label for="employee">{{ t("roles[0]") }}</label>
                </div>
                <div>
                  <input type="radio" name="option" id="manager" aria-label="manager" value="manager"
                    v-model="question2.role">
                  <label for="manager">{{ t("roles[1]") }}</label>
                </div>
                <div>
                  <input type="radio" name="option" id="executive" aria-label="executive"
                    value="executive" v-model="question2.role">
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
                    <li><NewWindow Href="https://cmha.ca/" LinkText="The Canadian Mental Health Association" /> is a nationwide organization that promotes mental health and supports people recovering from mental illness.</li>
                    <li><a href="https://www.crisisservicescanada.ca/en/" target="_blank">Crisis Services Canada</a> offers a toll-free, 24/7 suicide prevention service throughout the year at 1-833-456-4566. Whether you are suffering from a loss, worried about someone who may be having suicidal thoughts, or having suicidal thoughts yourself, highly trained responders can provide support.</li>
                    <li><a href="https://kidshelpphone.ca/" target="_blank">Kids Help Phone</a> is a 24/7 national service offering professional counselling, information, referrals and volunteer-led, text-based support to young people in both English and French.</li>
                    <li><a href="https://www.sheltersafe.ca/" target="_blank">ShelterSafe.ca</a> is an online resource for women and their children seeking safety from violence and abuse.</li>
                    <li>The <a href="https://www.canada.ca/en/public-health/services/bullying.html" target="_blank">Bullying</a> web page provides information on how to recognize and prevent bullying, as well as bullying prevention resources.</li>
                    <li></li>
                    <li>The <a href="https://www.canada.ca/en/public-health/topics/violence-abuse.html" target="_blank">Violence and Abuse</a> web page provides information about violence and abuse, its prevention and how to get help if you are being abuse.</li>
                    <li><a href="https://wellnesstogether.ca/en-CA" target="_blank">Wellness Together Canada</a> provides phone, video, and text counselling, information and videos on common mental health and substance use issues, wellness programs, and community and peer support.</li>
                    <li><a href="https://www.mentalhealthcommission.ca/English" target="_blank">The Mental Health Commission of Canada</a> leads the development and dissemination of innovative programs and tools to support the mental health and wellness of Canadians</li>
                    <li>Mental Health Continuum Self-Check that can help us to identify how we are doing and when there is a need for support. </li>
                  </ul>
                  <ul class=“fr” v-show="locale === 'fr'"> <li><NewWindow Href="https://cmha.ca/" LinkText="L’Association canadienne pour la santé mentale" Title="Ouvre dans une nouvelle fenêtre/onglet"/> est une organisation nationale qui promeut la santé mentale et soutient les personnes en rétablissement de maladies mentales.</li> <li><a href=“https://www.crisisservicescanada.ca/en/” target=“_blank”>Services de crise Canada</a> offre un service de prévention du suicide gratuit et disponible 24 heures sur 24, 7 jours sur 7, tout au long de l’année au 1-833-456-4566. Que vous souffriez d’une perte, que vous vous inquiétiez pour quelqu’un qui pourrait avoir des pensées suicidaires ou que vous ayez vous-même des pensées suicidaires, des intervenants hautement qualifiés peuvent vous apporter leur soutien.</li> <li><a href=“https://kidshelpphone.ca/” target=“_blank”>Jeunesse, J’écoute</a> est un service national disponible 24 heures sur 24 qui offre des services de counseling professionnels, des informations, des références et un soutien par messagerie texte animé par des bénévoles aux jeunes en anglais et en français.</li> <li><a href=“https://www.sheltersafe.ca/” target=“_blank”>ShelterSafe.ca</a> est une ressource en ligne pour les femmes et leurs enfants qui cherchent à se protéger contre la violence et les abus.</li> <li>La page Web sur <a href=“https://www.canada.ca/fr/sante-publique/services/intimidation.html” target=“_blank”>l’intimidation</a> fournit des informations sur la façon de reconnaître et de prévenir l’intimidation, ainsi que des ressources de prévention de l’intimidation.</li> <li></li> <li>La page Web sur la <a href=“https://www.canada.ca/fr/sante-publique/sujets/violence-abus.html” target=“_blank”>violence et les abus</a> fournit des informations sur la violence et les abus, leur prévention et la façon d’obtenir de l’aide si vous êtes victime d’abus.</li> <li><a href=“https://bienetreensemble.ca/fr-CA” target=“_blank”>Bien-être ensemble Canada</a> offre des services de counseling par téléphone, vidéo et messagerie texte, des informations et des vidéos sur les problèmes courants de santé mentale et de toxicomanie, des programmes de bien-être et un soutien communautaire et par les pairs.</li> </ul>
                </template>
              </SimpleAccordion>
              <div class="go-back questionnaire" v-show="Object.values(question1).every((v: any) => v === false)">
                <p>{{ $t('ifInterestedIn') }}</p>
        
              </div>
              <MultiAccordions :AccNum="6">
                <template #AccTitle-1 data-accordion="1" class="accordions">{{ $t('accordionTitles[0]') }}</template>
                <template #AccBody-1>
                  
                    <ul class="en" v-show="locale === 'en'">
                    <li><a href="https://cmha.ca/" target="_blank">The Canadian Mental Health Association</a> is a nationwide organization that promotes mental health and supports people recovering from mental illness.</li>
                    <li><a href="https://www.crisisservicescanada.ca/en/" target="_blank">Crisis Services Canada</a> offers a toll-free, 24/7 suicide prevention service throughout the year at 1-833-456-4566. Whether you are suffering from a loss, worried about someone who may be having suicidal thoughts, or having suicidal thoughts yourself, highly trained responders can provide support.</li>
                    <li><a href="https://kidshelpphone.ca/" target="_blank">Kids Help Phone</a> is a 24/7 national service offering professional counselling, information, referrals and volunteer-led, text-based support to young people in both English and French.</li>
                    <li><a href="https://www.sheltersafe.ca/" target="_blank">ShelterSafe.ca</a> is an online resource for women and their children seeking safety from violence and abuse.</li>
                    <li>The <a href="https://www.canada.ca/en/public-health/services/bullying.html" target="_blank">Bullying</a> web page provides information on how to recognize and prevent bullying, as well as bullying prevention resources.</li>
                    <li></li>
                    <li>The <a href="https://www.canada.ca/en/public-health/topics/violence-abuse.html" target="_blank">Violence and Abuse</a> web page provides information about violence and abuse, its prevention and how to get help if you are being abuse.</li>
                    <li><a href="https://wellnesstogether.ca/en-CA" target="_blank">Wellness Together Canada</a> provides phone, video, and text counselling, information and videos on common mental health and substance use issues, wellness programs, and community and peer support.</li>
                    <li><a href="https://www.mentalhealthcommission.ca/English" target="_blank">The Mental Health Commission of Canada</a> leads the development and dissemination of innovative programs and tools to support the mental health and wellness of Canadians</li>
                    <li>Mental Health Continuum Self-Check that can help us to identify how we are doing and when there is a need for support. </li>
                  </ul>
                  
                  <ul class=“fr” v-show="locale === 'fr'"> <li><a href=“https://cmha.ca/” target=“_blank”>L’Association canadienne pour la santé mentale</a> est une organisation nationale qui promeut la santé mentale et soutient les personnes en rétablissement de maladies mentales.</li> <li><a href=“https://www.crisisservicescanada.ca/en/” target=“_blank”>Services de crise Canada</a> offre un service de prévention du suicide gratuit et disponible 24 heures sur 24, 7 jours sur 7, tout au long de l’année au 1-833-456-4566. Que vous souffriez d’une perte, que vous vous inquiétiez pour quelqu’un qui pourrait avoir des pensées suicidaires ou que vous ayez vous-même des pensées suicidaires, des intervenants hautement qualifiés peuvent vous apporter leur soutien.</li> <li><a href=“https://kidshelpphone.ca/” target=“_blank”>Jeunesse, J’écoute</a> est un service national disponible 24 heures sur 24 qui offre des services de counseling professionnels, des informations, des références et un soutien par messagerie texte animé par des bénévoles aux jeunes en anglais et en français.</li> <li><a href=“https://www.sheltersafe.ca/” target=“_blank”>ShelterSafe.ca</a> est une ressource en ligne pour les femmes et leurs enfants qui cherchent à se protéger contre la violence et les abus.</li> <li>La page Web sur <a href=“https://www.canada.ca/fr/sante-publique/services/intimidation.html” target=“_blank”>l’intimidation</a> fournit des informations sur la façon de reconnaître et de prévenir l’intimidation, ainsi que des ressources de prévention de l’intimidation.</li> <li></li> <li>La page Web sur la <a href=“https://www.canada.ca/fr/sante-publique/sujets/violence-abus.html” target=“_blank”>violence et les abus</a> fournit des informations sur la violence et les abus, leur prévention et la façon d’obtenir de l’aide si vous êtes victime d’abus.</li> <li><a href=“https://bienetreensemble.ca/fr-CA” target=“_blank”>Bien-être ensemble Canada</a> offre des services de counseling par téléphone, vidéo et messagerie texte, des informations et des vidéos sur les problèmes courants de santé mentale et de toxicomanie, des programmes de bien-être et un soutien communautaire et par les pairs.</li> </ul>
                </template>
                <template #AccTitle-2 data-accordion="2" class="accordions">{{ $t('accordionTitles[1]') }}</template>
                <template #AccBody-2>
                  <ul class="en" v-show="locale === 'en'">
                    <li>The <a href="https://www.fpwc.ca/" target="_blank">First Peoples Wellness Circle</a> is a national not-for-profit corporation governed and managed by Indigenous Leaders, which exists to improve the lives of Canada’s First Peoples by addressing healing, wellness and other mental health challenges.</li>
                    <li>The <a href="https://www.sac-isc.gc.ca/eng/1576089519527/1576089566478" target="_blank">Hope for Wellness Help Line</a> offers immediate help to all Indigenous Peoples across Canada 24 hours a day, 7 days a week. Call the toll-free Help Line or connect to the online chat at hopeforwellness.ca. Telephone and online counselling are available in English and French. On request, telephone counselling is available in Cree, Ojibway and Inuktitut: 1-855-242-3310.</li>
                    <li>The <a href="https://www.irsss.ca/" target="_blank">Indian Residential School Survivors Society</a> offers a 24/7 crisis line that provides support to anyone experiencing pain or distress as a result of their residential school experience: 1-800-721-0066..</li>
                    <li><a href="https://www.itk.ca/" target="_blank">Inuit Tapiriit Kanatami</a> works to improve the health and well-being of Inuit in Canada through research, advocacy, public outreach and education.</li>
                    <li>The <a href="http://nunavuthelpline.ca/" target="_blank">Kamatsiaqtut Nunavut Helpline</a> is a toll-free, anonymous, confidential 24/7 service staffed by trained volunteers: 1-800-265-3333.</li>
                    <li>The <a href="https://www.mmiwg-ffada.ca/contact/" target="_blank">Support Line of the National Inquiry into Missing and Murdered Indigenous Women and Girls</a> is an independent, national, 24/7 toll-free service available to anyone who requires assistance. Services are available in English and French: 1-844-413-6649.</li>
                    <li>The <a href="https://nafc.ca/?lang=en" target="_blank">National Association of Friendship Centres</a> provides culturally relevant programs and services for Indigenous Peoples living in urban centres across Canada. It works on a range of issues, including health, housing, youth, justice and international development.</li>
                    <li>The <a href="https://www.nwac.ca/covid19-support/" target="_blank">Native Women's Association of Canada</a> offers support and helps build resiliency. Elders are available Monday to Friday, from 9:00 am to 11:00 am and 1:00 pm to 3:00 pm (Eastern Time): 1-888-664-7808.</li>
                    <li><a href="http://www.talk4healing.com/about/" target="_blank">Talk4Healing</a> provides 24/7 phone, text, live chat counselling, and other support and resources for Indigenous women, by Indigenous women, all across Ontario. Services are fully grounded in Indigenous culture, wisdom and tradition and are available in the following languages: Oji-Cree, Cree, Algonquin, Inuktitut, Mohawk, Oneida, Odawa, Potawatomi, Micmac, Black Foot, Anishinaabe, Moose Cree, Swampy Cree and English: 1-855-554-HEAL.</li>
                    <li>The <a href="https://thunderbirdpf.org/crisis-to-wellness/" target="_blank">Thunderbird Partnership Foundation</a> promotes a holistic approach to healing and wellness that values culture, respect, community, and compassion. The foundation’s top priority is developing a continuum of care that would be available to all Indigenous Peoples in Canada.</li>
                  </ul>
                  <ul class="fr" v-show="locale === 'fr'">
                    <li>Le <a href=“https://www.fpwc.ca/” target=“_blank”>Cercle de bien-être des Premières Nations</a> est une corporation nationale à but non lucratif gouvernée et gérée par des leaders autochtones, qui vise à améliorer la vie des Premières Nations du Canada en abordant la guérison, le bien-être et d’autres défis de santé mentale.</li> <li>La <a href=“https://www.sac-isc.gc.ca/eng/1576089519527/1576089566478” target=“_blank”>ligne d’aide Espoir pour le mieux-être</a> offre une aide immédiate à tous les peuples autochtones du Canada, 24 heures sur 24, 7 jours sur 7. Appelez la ligne d’aide sans frais ou connectez-vous au chat en ligne à hopeforwellness.ca. Des services de counseling par téléphone et en ligne sont disponibles en anglais et en français. Sur demande, le counseling téléphonique est disponible en cri, en ojibwé et en inuktitut: 1-855-242-3310.</li> <li>La <a href=“https://www.irsss.ca/” target=“_blank”>Société des survivants des pensionnats indiens</a> offre une ligne de crise 24 heures sur 24, 7 jours sur 7, qui offre du soutien à toute personne éprouvant de la douleur ou de la détresse en raison de son expérience dans un pensionnat indien: 1-800-721-0066.</li> <li><a href=“https://www.itk.ca/” target=“_blank”>Inuit Tapiriit Kanatami</a> travaille à améliorer la santé et le bien-être des Inuits au Canada par la recherche, la défense des droits, la sensibilisation du public et l’éducation.</li> <li>La <a href=“http://nunavuthelpline.ca/” target=“_blank”>ligne d’assistance Kamatsiaqtut Nunavut</a> est un service gratuit, anonyme et confidentiel 24 heures sur 24, 7 jours sur 7, assuré par des bénévoles formés: 1-800-265-3333.</li> <li>La <a href=“https://www.mmiwg-ffada.ca/contact/” target=“_blank”>ligne de soutien de l’Enquête nationale sur les femmes et les filles autochtones disparues et assassinées</a> est un service indépendant, national et gratuit 24 heures sur 24, 7 jours sur 7, disponible pour toute personne ayant besoin d’aide. Des services sont disponibles en anglais et en français: 1-844-413-6649.</li>
                    <li>La <a href="https://nafc.ca/?lang=en" target=“_blank”>Association nationale des centres d’amitié</a> offre des programmes et des services culturellement pertinents pour les peuples autochtones vivant dans les centres urbains du Canada. Elle travaille sur une gamme de questions, notamment la santé, le logement, la jeunesse, la justice et le développement international.</li> <li>La <a href=“https://www.nwac.ca/covid19-support/” target=“_blank”>Association des femmes autochtones du Canada</a> offre du soutien et aide à renforcer la résilience. Des aînés sont disponibles du lundi au vendredi, de 9 h à 11 h et de 13 h à 15 h (heure de l’Est): 1-888-664-7808.</li> <li><a href=“http://www.talk4healing.com/about/” target=“_blank”>Talk4Healing</a> fournit des services de counseling téléphonique, de messagerie texte, de chat en direct 24 heures sur 24, 7 jours sur 7 et d’autres formes de soutien et de ressources pour les femmes autochtones, par les femmes autochtones, partout en Ontario. Les services sont entièrement ancrés dans la culture, la sagesse et la tradition autochtones et sont disponibles dans les langues suivantes: oji-cree, cri, algonquin, inuktitut, mohawk, oneida, odawa, potawatomi, micmac, black foot, anishinaabe, moose cree, swampy cree et anglais: 1-855-554-HEAL.</li> <li>La <a href=“https://thunderbirdpf.org/crisis-to-wellness/” target=“_blank”>Fondation Thunderbird Partnership</a> promeut une approche holistique de la guérison et du bien-être qui valorise la culture, le respect, la communauté et la compassion. La priorité absolue de la fondation est de développer un continuum de soins qui serait disponible pour tous les peuples autochtones du Canada.</li>

                  </ul>
                </template>
                <template #AccTitle-3 data-accordion="3" class="accordions">{{ $t('accordionTitles[2]') }}</template>
                <template #AccBody-3>
                  <ul class="en" v-show="locale === 'en'">
                    <li>LGBT Youth Line: 1-800-268-9688 OR text 647-694-4275</li>
                    <li>Trans Lifeline (support for transgender people by transgender people): 1-877-330-6330-6366</li>
                    <li><a href="https://publicservicepride.ca/resources/" target="_blank">Public Service Pride: Resources</a></li>
                  </ul>
                  <ul class="fr" v-show="locale === 'fr'">
                    <li>Ligne jeunesse LGBT: 1-800-268-9688 OU texto 647-694-4275</li> <li>Trans Lifeline (soutien pour les personnes transgenres par des personnes transgenres): 1-877-330-6330-6366</li> <li><a href=“https://publicservicepride.ca/resources/” target=“_blank”>Fierté de la fonction publique: Ressources</a></li>
                  </ul>
                </template>
                <template #AccTitle-4 data-accordion="4" class="accordions">{{ $t('accordionTitles[3]') }}</template>
                <template #AccBody-4>
                  
                    <ul class="en" v-show="locale === 'en'">
                      <li>The <a href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/health-wellness-public-servants/mental-health-workplace.html" target="_blank">Centre of Expertise on Mental Health in the Workplace</a> provides information about how the Government of Canada addresses mental health in the workplace, as well as access to resources, tools and services for organizations, managers and employees.</li>
                      <li>The <a href="https://www.canada.ca/en/health-canada/services/environmental-workplace-health/occupational-health-safety/employee-assistance-services/employee-assistance-program.html"  target="_blank">Employee Assistance Program (EAP)</a> provides free short-term counselling for personal or work-related problems, as well as crisis counselling. More than 80 federal departments and agencies receive their EAP services through Health Canada, while other organizations provide this service internally or purchase it from the private sector. To find the service provider for your organization, please consult the <a href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/employee-assistance-program.html"  target="_blank">departmental listing</a>.</li>
                      <li>The <a href="https://www.canada.ca/content/dam/eccc/documents/pdf/corporate-info/covid-19/five-rules-managers.pdf"  target="_blank">Five Golden Rules for Managers</a>, developed by Environment and Climate Change Canada, provide guidance on how to foster a healthy work environment, one that supports employees’ mental health.</li>
                      <li>Mental Health Services for Canadian Armed Forces Members and Families</li>
                      <li>Mental Health Services Available to RCMP Employees</li>
                      <li>Mental Health Services Available to Veterans</li>
                    </ul>
                    <ul class="fr" v-show="locale === 'fr'">
                      <li>Le <a href=“https://www.canada.ca/fr/gouvernement/fonctionpublique/bien-etre-inclusion-diversite-fonction-publique/sante-bien-etre-fonctionnaires/sante-mentale-lieu-travail.html” target=“_blank”>Centre d’expertise sur la santé mentale en milieu de travail</a> fournit des informations sur la façon dont le gouvernement du Canada aborde la santé mentale en milieu de travail, ainsi que l’accès à des ressources, des outils et des services pour les organisations, les gestionnaires et les employés.</li> <li>Le <a href=“https://www.canada.ca/fr/sante-canada/services/sante-travail/sante-securite-travail/soutien-employes/programme-aide-employes.html” target=“_blank”>Programme d’aide aux employés (PAE)</a> offre des services de counseling à court terme gratuits pour les problèmes personnels ou liés au travail, ainsi que des services de counseling en cas de crise. Plus de 80 ministères et organismes fédéraux reçoivent leurs services de PAE par l’intermédiaire de Santé Canada, tandis que d’autres organisations fournissent ce service en interne ou l’achètent auprès du secteur privé. Pour trouver le fournisseur de services pour votre organisation, veuillez consulter la <a href=“https://www.canada.ca/fr/gouvernement/fonctionpublique/bien-etre-inclusion-diversite-fonction-publique/programme-aide-employes.html” target=“_blank”>liste ministérielle</a>.</li> <li>Les <a href=“https://www.canada.ca/fr/environnement-changement-climatique/services/sante-securite-travail/programme-sante-bien-etre/gestionnaires-cinq-regles-dor.html” target=“_blank”>Cinq règles d’or pour les gestionnaires</a>, élaborées par Environnement et Changement climatique Canada, fournissent des orientations sur la façon de favoriser un environnement de travail sain, qui soutient la santé mentale des employés.</li> <li>Services de santé mentale pour les membres des Forces armées canadiennes et leur famille</li> <li>Services de santé mentale disponibles pour les employés de la GRC</li> <li>Services de santé mentale disponibles pour les anciens combattants</li>
                    </ul>
                  
                </template>
                <template #AccTitle-5 data-accordion="5" class="accordions">{{ $t('accordionTitles[4]') }}</template>
                <template #AccBody-5>
                  <h3>Mental health lived experiences</h3>
                  <ul>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-harkness-eng.aspx" LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Andrew Harkness"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-fleurimond-eng.aspx" LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Esther Fleurimond"/> </li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-beland-eng.aspx" LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Marc Beland"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-gagne-eng.aspx" LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Marie-Anik Gagné"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-dubourg-eng.aspx" LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Sophie Dubourg"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/managing-your-mental-health-eng.aspx" LinkText="Spotlight on #GCMentalHealth: Managing Your Mental Health"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/sharing-our-stories-eng.aspx" LinkText="Spotlight on #GCMentalHealth: Sharing Our Stories, Inspiring Hope"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/supporting-a-colleague-eng.aspx" LinkText="Spotlight on #GCMentalHealth: Supporting a Colleague"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/tips-for-managers-eng.aspx" LinkText="Spotlight on #GCMentalHealth: Tips for Managers"/></li>
                    <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/you-are-not-alone-eng.aspx" LinkText="Spotlight on #GCMentalHealth: You Are Not Alone"/></li>
                  </ul>
                  <div class="managers" v-show="question2.role === 'manager'">
                    <h3>For Managers</h3>
                    <ul>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf1-psychological-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 1 – Psychological and Social Support (WMT2-J01)"/></li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf2-organizational-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 2 – Organizational Culture (WMT2-J02)"/></li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf3-clear-leadership-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 3 – Clear Leadership and Expectations (WMT2-J03)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf4-civility-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 4 – Civility and Respect (WMT2-J04)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf5-psychological-competencies-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 5 – Psychological Competencies and Requirements (WMT2-J05)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf6-growth-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 6 – Growth and Development (WMT2-J06)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf7-recognition-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 7 – Recognition and Reward (WMT2-J07)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf8-involvement-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 8 – Involvement and Influence (WMT2-J08)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf9-workload-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 9 – Workload Management (WMT2-J09)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf10-engagement-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 10 – Engagement (WMT2-J10)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf11-balance-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 11 – Balance (WMT2-J11)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf12-psychological-protection-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 12 – Psychological Protection (WMT2-J12)"/> </li>
                      <li><NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf13-protection-eng.aspx" LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 13 – Protection of Physical Safety (WMT2-J13)"/> </li>
                    </ul>
                  </div>
                  <div class="executives" v-show="question2.role === 'executive'">
                    <h3>For Executives</h3>
                    <ul>
                      <li>Podcast: <NewWindow Href="https://www.csps-efpc.gc.ca/podcasts/survive-executive/season1/episode3-eng.aspx" LinkText="How to Survive as an Executive, Season 1, Episode 3: Leading with Calm and Authenticity, with Valerie Gideon, Ph.D."/> </li>
                      <li>Video: <NewWindow Href="https://www.csps-efpc.gc.ca/video/practical-tips-eng.aspx" LinkText="EXecuTALK: Practical Tips for Strengthening Mental Health for Your Staff, Your Clients and Yourself"/></li>
                    </ul>
                  </div>
                  <div class="other">
                    <h3>Other School resources</h3>
                    <ul>
                      <li>
                        <NewWindow Href="https://www.csps-efpc.gc.ca/mental-health-eng.aspx#resources" LinkText="Mental Health Learning Series"/>
                      </li>
                      <li>
                        Course: <NewWindow Href="https://catalogue.csps-efpc.gc.ca/product?catalog=WMT211&cm_locale=en" LinkText="Take a Deep Breath and Manage Your Stress (WMT211)"/>
                      </li>
                    </ul>
                  </div>
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
