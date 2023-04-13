<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import MultiAccordions from "./components/MultiAccordions.vue";
import SimpleAccordion from "./components/SimpleAccordion.vue";
import NewWindow from "./components/NewWindow.vue";

const step = ref(1);
const totalSteps = ref(2);
const activityStart = ref(false);

const question1 = reactive({
  general: false,
  indigenous: false,
  lgbt: false,
  publicServants: false,
  csps: false,
});

const { t, locale } = useI18n();

// Set html lang based on current locale
let lang = document.querySelector("html");
let currLang = lang?.getAttribute("lang");
// set page title
const title = useTitle();

// methods
function changeLang() {
  locale.value !== 'en' ? locale.value = 'en' : locale.value = 'fr'
  lang?.setAttribute('lang', locale.value)
  title.value = t('pageTitle')
}

function determineAccordionNum(e: any) {
  let decider = e.target.getAttribute("data-accordion-target");
  let accordionArray = Array.from(
    document.querySelectorAll(".accordion > div")
  );
  let multiAccGroup = document.querySelector(".multi-accordion-group");

  accordionArray.map((arr) => {
    // arr is accordion that matches decider
    if (decider === arr.getAttribute("data-accordion")) {
      // Show this accordion
      arr.toggleAttribute("hidden");
      arr.toggleAttribute("checked");

      if (Object.values(question1).some((v: any) => v === true)) {
        multiAccGroup?.removeAttribute("hidden");
      } else {
        multiAccGroup?.setAttribute("hidden", "");
      }
    }
  });
}

// life cycle hooks

onBeforeMount(() => {
  if (currLang) {
    locale.value = currLang
    lang?.setAttribute('lang', locale.value)
    title.value = t('pageTitle')
  }
});
</script>
<template>
  <div class="wrapper">
    <header class="col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
      <div class="container">
        <div class="row d-flex align-items-center justify-content-between">
          <div class="col-sm-10">
            <h1>{{ $t("title") }}</h1>
        </div>
        <div class="col-sm-2">
          <a href="#" class="lang-toggle" @click.prevent="changeLang" :title="t('langToggle')"
            :lang="t('shortToggle')">{{ t("shortToggle") }}</a>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="card intro-card" v-if="!activityStart">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <p>{{ $t("intro[0]") }}</p>
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
              <p class="text-center">
                <strong>{{ $t("interested") }}</strong>
              </p>

              <form class="options">
                <div>
                  <input type="checkbox" class="decider" name="general-resources" id="general-resources"
                    v-model="question1.general" @change="determineAccordionNum" data-accordion-target="1" />
                  <label for="general-resources">{{
                    t("checkboxes[0]")
                  }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="indigenous-resources" id="indigenous-resources"
                    v-model="question1.indigenous" @change="determineAccordionNum" data-accordion-target="2" />
                  <label for="indigenous-resources">{{
                    t("checkboxes[1]")
                  }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="lgbt-support" id="lgbt-support" v-model="question1.lgbt"
                    @change="determineAccordionNum" data-accordion-target="3" />
                  <label for="lgbt-support">{{ t("checkboxes[2]") }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="public-servant-resources" id="public-servant-resources"
                    v-model="question1.publicServants" @change="determineAccordionNum" data-accordion-target="4" />
                  <label for="public-servant-resources">{{
                    t("checkboxes[3]")
                  }}</label>
                </div>
                <div>
                  <input type="checkbox" class="decider" name="csps-resources" id="csps-resources"
                    v-model="question1.csps" @change="determineAccordionNum" data-accordion-target="5" />
                  <label for="csps-resources">{{ t("checkboxes[4]") }}</label>
                </div>
              </form>
            </div>
            <!-- <div class="questionnaire questionnaire-2" v-if="step === 2">
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
                                                                                                                                                                                                                                                                                                                                </div> -->
            <div class="customized-toolkit" v-show="step === 2">
              <SimpleAccordion v-show="Object.values(question1).every((v: any) => v === false)">
                <template v-slot:AccTitle>
                  {{ $t("checkboxes[0]") }}
                </template>
                <template v-slot:AccBody>
                  <ul class="en" v-show="locale === 'en'">
                    <li>
                      <NewWindow Href="https://cmha.ca/" LinkText="The Canadian Mental Health Association" />
                      is a nationwide organization that promotes mental health
                      and supports people recovering from mental illness.
                    </li>
                    <li>
                      <NewWindow Href="https://www.crisisservicescanada.ca/en/" LinkText="Crisis Services Canada" />
                      offers a toll-free, 24/7 suicide prevention service
                      throughout the year at 1-833-456-4566. Whether you are
                      suffering from a loss, worried about someone who may be
                      having suicidal thoughts, or having suicidal thoughts
                      yourself, highly trained responders can provide support.
                    </li>
                    <li>
                      <NewWindow Href="https://kidshelpphone.ca/" LinkText="Kids Help Phone" />

                      is a 24/7 national service offering professional
                      counselling, information, referrals and volunteer-led,
                      text-based support to young people in both English and
                      French.
                    </li>
                    <li>
                      <NewWindow Href="https://www.sheltersafe.ca/" LinkText="ShelterSafe.ca" />
                      is an online resource for women and their children seeking
                      safety from violence and abuse.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.canada.ca/en/public-health/services/bullying.html"
                        LinkText="Bullying" />
                      web page provides information on how to recognize and
                      prevent bullying, as well as bullying prevention
                      resources.
                    </li>
                    <li></li>
                    <li>
                      The
                      <NewWindow Href="https://www.canada.ca/en/public-health/topics/violence-abuse.html"
                        LinkText="Violence and Abuse" />

                      web page provides information about violence and abuse,
                      its prevention and how to get help if you are being abuse.
                    </li>
                    <li>
                      <NewWindow Href="https://wellnesstogether.ca/en-CA" LinkText="Wellness Together Canada" />
                      provides phone, video, and text counselling, information
                      and videos on common mental health and substance use
                      issues, wellness programs, and community and peer support.
                    </li>
                    <li>
                      <NewWindow Href="https://www.mentalhealthcommission.ca/English"
                        LinkText="The Mental Health Commission of Canada" />
                      leads the development and dissemination of innovative
                      programs and tools to support the mental health and
                      wellness of Canadians
                    </li>
                    <li>
                      Mental Health Continuum Self-Check that can help us to
                      identify how we are doing and when there is a need for
                      support.
                    </li>
                  </ul>
                  <ul class="“fr”" v-show="locale === 'fr'">
                    <li>
                      L’
                      <NewWindow Href="https://cmha.ca/fr" LinkText="Association canadienne pour la santé mentale"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est une organisation nationale qui fait la promotion de la santé mentale et soutient les personnes
                      qui se remettent d’une maladie mentale.
                    </li>
                    <li>
                      <NewWindow Href="https://www.crisisservicescanada.ca/fr/" LinkText="Services de crise Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      offre des services sans frais en tout temps à toute personne préoccupée par le suicide. Le service
                      est offert toute l’année. Que vous souffriez d’un deuil, que vous vous inquiétiez pour quelqu’un qui
                      pourrait avoir des pensées suicidaires ou que vous ayez vous-même des pensées suicidaires, leurs
                      intervenantes et intervenants hautement qualifiés sont là pour vous apporter leur soutien.
                    </li>
                    <li>
                      <NewWindow Href="https://jeunessejecoute.ca/" LinkText="Jeunesse, J’écoute"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est un service national offert en tout temps qui permet aux jeunes d’obtenir une consultation
                      professionnelle, des renseignements, des références et un soutien textuel auprès de bénévoles, en
                      anglais et en français.
                    </li>
                    <li>
                      <NewWindow Href="https://hebergementfemmes.ca/" LinkText="Hébergement femmes Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est une ressource en ligne pour les femmes et leurs enfants cherchant à se protéger de la violence
                      et des abus.
                    </li>
                    <li>
                      La page Web
                      <NewWindow Href="https://www.canada.ca/fr/sante-publique/services/intimidation.html"
                        LinkText="Intimidation" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fournit de l’information sur la façon de reconnaître et d’éviter l’intimidation ainsi que des
                      ressources sur la prévention de l’intimidation.
                    </li>
                    <li>
                      La page Web
                      <NewWindow Href="https://www.canada.ca/fr/sante-publique/sujets/violence-et-abus.html"
                        LinkText="Violence et abus" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fournit de l’information sur la violence et l’abus, comment les prévenir et comment obtenir de
                      l’aide si vous en êtes victime.
                    </li>
                    <li>
                      <NewWindow Href="https://www.wellnesstogether.ca/fr-CA" LinkText="Espace Mieux-être Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fournit des conseils par téléphone, par vidéoconférence et par SMS, de l’information et des vidéos
                      sur les troubles mentaux et les problèmes de toxicomanie courants, les programmes de mieux-être et
                      le soutien communautaire et par les pairs.
                    </li>
                    <li>
                      La
                      <NewWindow Href="https://commissionsantementale.ca/"
                        LinkText="Commission de la santé mentale du Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" /> dirige l’élaboration et la diffusion de
                      programmes et d’outils novateurs pour soutenir la santé
                      mentale et le mieux-être des Canadien·nes.
                    </li>
                  </ul>
                </template>
              </SimpleAccordion>
              <div class="go-back questionnaire" v-show="Object.values(question1).every((v: any) => v === false)">
                <p>{{ $t("ifInterestedIn") }}</p>
              </div>
              <MultiAccordions :AccNum="6">
                <template #AccTitle-1 data-accordion="1">{{
                  $t("checkboxes[0]")
                }}</template>
                <template #AccBody-1>
                  <ul class="en" v-show="locale === 'en'">
                    <li>
                      The
                      <NewWindow Href="https://cmha.ca/" LinkText="Canadian Mental Health Association" />
                      is a nationwide organization that promotes mental health
                      and supports people recovering from mental illness.
                    </li>
                    <li>
                      <NewWindow Href="https://www.crisisservicescanada.ca/en/" LinkText="Crisis Services Canada" />
                      offers a toll-free, 24/7 suicide prevention service
                      throughout the year at 1-833-456-4566. Whether you are
                      suffering from a loss, worried about someone who may be
                      having suicidal thoughts, or having suicidal thoughts
                      yourself, highly trained responders can provide support.
                    </li>
                    <li>
                      <NewWindow Href="https://kidshelpphone.ca/" LinkText="Kids Help Phone" />

                      is a 24/7 national service offering professional
                      counselling, information, referrals and volunteer-led,
                      text-based support to young people in both English and
                      French.
                    </li>
                    <li>
                      <NewWindow Href="https://www.sheltersafe.ca/" LinkText="ShelterSafe.ca" />
                      is an online resource for women and their children seeking
                      safety from violence and abuse.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.canada.ca/en/public-health/services/bullying.html"
                        LinkText="Bullying" />
                      web page provides information on how to recognize and
                      prevent bullying, as well as bullying prevention
                      resources.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.canada.ca/en/public-health/topics/violence-abuse.html"
                        LinkText="Violence and Abuse" />

                      web page provides information about violence and abuse,
                      its prevention and how to get help if you are being abused.
                    </li>
                    <li>
                      <NewWindow Href="https://wellnesstogether.ca/en-CA" LinkText="Wellness Together Canada" />
                      provides phone, video, and text counselling, information
                      and videos on common mental health and substance use
                      issues, wellness programs, and community and peer support.
                    </li>
                    <li>
                      <NewWindow Href="https://www.mentalhealthcommission.ca/English"
                        LinkText="The Mental Health Commission of Canada" />
                      leads the development and dissemination of innovative
                      programs and tools to support the mental health and
                      wellness of Canadians
                    </li>
                    <li>
                      Mental Health Continuum Self-Check that can help us to
                      identify how we are doing and when there is a need for
                      support.
                    </li>
                  </ul>

                  <ul class="“fr”" v-show="locale === 'fr'">
                    <li>
                      L’
                      <NewWindow Href="https://cmha.ca/fr" LinkText="Association canadienne pour la santé mentale"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est une organisation nationale qui fait la promotion de la santé mentale et soutient les personnes
                      qui se remettent d’une maladie mentale.
                    </li>
                    <li>
                      <NewWindow Href="https://www.crisisservicescanada.ca/fr/" LinkText="Services de crise Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      offre des services sans frais en tout temps à toute personne préoccupée par le suicide. Le service
                      est offert toute l’année. Que vous souffriez d’un deuil, que vous vous inquiétiez pour quelqu’un qui
                      pourrait avoir des pensées suicidaires ou que vous ayez vous-même des pensées suicidaires, leurs
                      intervenantes et intervenants hautement qualifiés sont là pour vous apporter leur soutien.
                    </li>
                    <li>
                      <NewWindow Href="https://jeunessejecoute.ca/" LinkText="Jeunesse, J’écoute"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est un service national offert en tout temps qui permet aux jeunes d’obtenir une consultation
                      professionnelle, des renseignements, des références et un soutien textuel auprès de bénévoles, en
                      anglais et en français.
                    </li>
                    <li>
                      <NewWindow Href="https://hebergementfemmes.ca/" LinkText="Hébergement femmes Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est une ressource en ligne pour les femmes et leurs enfants cherchant à se protéger de la violence
                      et des abus.
                    </li>
                    <li>
                      La page Web
                      <NewWindow Href="https://www.canada.ca/fr/sante-publique/services/intimidation.html"
                        LinkText="Intimidation" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fournit de l’information sur la façon de reconnaître et d’éviter l’intimidation ainsi que des
                      ressources sur la prévention de l’intimidation.
                    </li>
                    <li>
                      La page Web
                      <NewWindow Href="https://www.canada.ca/fr/sante-publique/sujets/violence-et-abus.html"
                        LinkText="Violence et abus" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fournit de l’information sur la violence et l’abus, comment les prévenir et comment obtenir de
                      l’aide si vous en êtes victime.
                    </li>
                    <li>
                      <NewWindow Href="https://www.wellnesstogether.ca/fr-CA" LinkText="Espace Mieux-être Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fournit des conseils par téléphone, par vidéoconférence et par SMS, de l’information et des vidéos
                      sur les troubles mentaux et les problèmes de toxicomanie courants, les programmes de mieux-être et
                      le soutien communautaire et par les pairs.
                    </li>
                    <li>
                      La
                      <NewWindow Href="https://commissionsantementale.ca/"
                        LinkText="Commission de la santé mentale du Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" /> dirige l’élaboration et la diffusion de
                      programmes et d’outils novateurs pour soutenir la santé
                      mentale et le mieux-être des Canadien·nes.
                    </li>
                  </ul>
                </template>
                <template #AccTitle-2 data-accordion="2">{{
                  $t("checkboxes[1]")
                }}</template>
                <template #AccBody-2>
                  <ul class="en" v-show="locale === 'en'">
                    <li>
                      The
                      <NewWindow Href="https://www.fpwc.ca/" LinkText="First Peoples Wellness Circle" />

                      is a national not-for-profit corporation governed and
                      managed by Indigenous Leaders, which exists to improve the
                      lives of Canada’s First Peoples by addressing healing,
                      wellness and other mental health challenges.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.sac-isc.gc.ca/eng/1576089519527/1576089566478"
                        LinkText="Hope for Wellness Help Line" />
                      offers immediate help to all Indigenous Peoples across
                      Canada 24 hours a day, 7 days a week. Call the toll-free
                      Help Line or connect to the online chat at
                      hopeforwellness.ca. Telephone and online counselling are
                      available in English and French. On request, telephone
                      counselling is available in Cree, Ojibway and Inuktitut:
                      1-855-242-3310.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.irsss.ca/" LinkText="Indian Residential School Survivors Society" />

                      offers a 24/7 crisis line that provides support to anyone
                      experiencing pain or distress as a result of their
                      residential school experience: 1-800-721-0066..
                    </li>
                    <li>
                      <NewWindow Href="https://www.itk.ca/" LinkText="Inuit Tapiriit Kanatami" />

                      works to improve the health and well-being of Inuit in
                      Canada through research, advocacy, public outreach and
                      education.
                    </li>
                    <li>
                      The
                      <NewWindow Href="http://nunavuthelpline.ca/" LinkText="Kamatsiaqtut Nunavut Helpline" />

                      is a toll-free, anonymous, confidential 24/7 service
                      staffed by trained volunteers: 1-800-265-3333.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.mmiwg-ffada.ca/contact/"
                        LinkText="Support Line of the National Inquiry into Missing and Murdered Indigenous Women and Girls" />

                      is an independent, national, 24/7 toll-free service
                      available to anyone who requires assistance. Services are
                      available in English and French: 1-844-413-6649.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://nafc.ca/?lang=en" LinkText="National Association of Friendship Centres" />

                      provides culturally relevant programs and services for
                      Indigenous Peoples living in urban centres across Canada.
                      It works on a range of issues, including health, housing,
                      youth, justice and international development.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://www.nwac.ca/covid19-support/"
                        LinkText="Native Women's Association of Canada" />
                      offers support and helps build resiliency. Elders are
                      available Monday to Friday, from 9:00 am to 11:00 am and
                      1:00 pm to 3:00 pm (Eastern Time): 1-888-664-7808.
                    </li>
                    <li>
                      <NewWindow Href="http://www.talk4healing.com/about/" LinkText="Talk4Healing" />
                      provides 24/7 phone, text, live chat counselling, and
                      other support and resources for Indigenous women, by
                      Indigenous women, all across Ontario. Services are fully
                      grounded in Indigenous culture, wisdom and tradition and
                      are available in the following languages: Oji-Cree, Cree,
                      Algonquin, Inuktitut, Mohawk, Oneida, Odawa, Potawatomi,
                      Micmac, Black Foot, Anishinaabe, Moose Cree, Swampy Cree
                      and English: 1-855-554-HEAL.
                    </li>
                    <li>
                      The
                      <NewWindow Href="https://thunderbirdpf.org/crisis-to-wellness/"
                        LinkText="Thunderbird Partnership Foundation" />
                      promotes a holistic approach to healing and wellness that
                      values culture, respect, community, and compassion. The
                      foundation’s top priority is developing a continuum of
                      care that would be available to all Indigenous Peoples in
                      Canada.
                    </li>
                  </ul>
                  <ul class="fr" v-show="locale === 'fr'">
                    <li>
                      Le
                      <NewWindow Href="https://www.fpwc.ca/" LinkText="First Peoples Wellness Circle"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      (en anglais seulement) est un organisme national à but non lucratif régi et géré par des leaders
                      autochtones; il vise à améliorer la vie des premiers peuples du Canada en traitant de la guérison,
                      du bien-être et de problèmes de santé mentale.
                    </li>
                    <li>
                      La
                      <NewWindow Href="https://www.sac-isc.gc.ca/fra/1576089519527/1576089566478"
                        LinkText="Ligne d'écoute d'espoir" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      offre une aide immédiate à tous les peuples autochtones au Canada. Elle est accessible en tout
                      temps. Appelez sans frais ou connectez-vous au clavardage en ligne sur le site
                      <NewWindow Href="https://www.espoirpourlemieuxetre.ca" LinkText="www.espoirpourlemieuxetre.ca"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />. Les consultations téléphoniques et en ligne se
                      font en anglais et en français. Sur demande, des consultations téléphoniques sont également offertes
                      en cri, en ojibwé et en inuktitut au 1-855-242-3310.
                    </li>
                    <li>
                      La ligne d’aide 24 heures sur 24 de la
                      <NewWindow Href="https://www.irsss.ca/" LinkText="Indian Residential School Survivors Society"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      (en anglais seulement) fournit un soutien à toute personne souffrant de douleur ou de détresse à la
                      suite de son expérience dans un pensionnat : 1-800-721-0066.
                    </li>
                    <li>
                      <NewWindow Href="https://www.itk.ca/" LinkText="Inuit Tapiriit Kanatami"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      (en anglais seulement) travaille à améliorer la santé et le bien-être des Inuits au Canada grâce à
                      la recherche, à la défense des droits, à la sensibilisation du public et à l’éducation.
                    </li>
                    <li>
                      La
                      <NewWindow Href="https://nunavuthelpline.ca/?lang=fr"
                        LinkText="ligne d’assistance Kamatsiaqtut Nunavut"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est un service sans frais, anonyme et confidentiel offert en tout temps et doté de personnes
                      bénévoles formées : 1-800-265-3333.
                    </li>
                    <li>
                      La
                      <NewWindow Href="https://www.mmiwg-ffada.ca/fr/contact/"
                        LinkText="ligne de soutien de l’Enquête nationale sur les femmes et les filles autochtones disparues et assassinées"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      est un service gratuit, national et indépendant, accessible en tout temps à toute personne ayant
                      besoin d’aide. Les services sont offerts en anglais et en français au 1-844-413-6649.
                    </li>
                    <li>
                      L’
                      <NewWindow Href="https://nafc.ca/?lang=fr" LinkText="Association nationale des centres d’amitié"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      <a href="" target="“_blank”"></a> offre des programmes et
                      propose des programmes et des services adaptés aux peuples autochtones vivant dans les centres
                      urbains du Canada. Elle travaille sur une gamme de questions, y compris la santé, le logement, la
                      jeunesse, la justice et le développement international.
                    </li>
                    <li>
                      L’
                      <NewWindow Href="https://www.nwac.ca/covid19-support/"
                        LinkText="Association des femmes autochtones du Canada"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      (en anglais seulement) offre son soutien et favorise la résilience. Les aînées et aînés sont
                      disponibles du lundi au vendredi, de 9 h à 11 h et de 13 h à 15 h (heure de l’Est) : 1-888-664-7808.
                    </li>
                    <li>
                      <NewWindow Href="http://www.talk4healing.com/about/" LinkText="Talk4Healing"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      (en anglais seulement) fournit des conseils en tout temps par téléphone, par SMS et par l’entremise
                      d’un clavardage en direct. Talk4Healing offre également du soutien et des ressources aux femmes
                      autochtones, par des femmes autochtones, partout en Ontario. Les services sont entièrement ancrés
                      dans la culture, la sagesse et la tradition autochtones et sont offerts dans les langues suivantes :
                      oji-cri, cri, algonquin, inuktitut, mohawk, oneida, odawa, potawatomi, micmac, pied-noir,
                      anishinaabemowin, cri de la Moose, cri des marais et anglais : 1-855-554-HEAL.
                    </li>
                    <li>
                      La
                      <NewWindow
                        Href="https://thunderbirdpf.org/reponse-a-la-crise-dans-les-communautes-autochtones/?lang=fr"
                        LinkText="Thunderbird Partnership Foundation" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      fait la promotion d’une approche holistique de la guérison et d’un mieux-être qui valorise la
                      culture, le respect, la communauté et la compassion. La priorité de la fondation est de développer
                      un continuum de soins qui serait offert à tous les peuples autochtones au Canada.
                    </li>
                  </ul>
                </template>
                <template #AccTitle-3 data-accordion="3">{{
                  $t("checkboxes[2]")
                }}</template>
                <template #AccBody-3>
                  <ul class="en" v-show="locale === 'en'">
                    <li>
                      LGBT Youth Line: 1-800-268-9688 OR text 647-694-4275
                    </li>
                    <li>
                      Trans Lifeline (support for transgender people by
                      transgender people): 1-877-330-6330-6366
                    </li>
                    <li>
                      <NewWindow Href="https://publicservicepride.ca/resources/"
                        LinkText="Public Service Pride: Resources" />
                    </li>
                  </ul>
                  <ul class="fr" v-show="locale === 'fr'">
                    <li>
                      LGBT Youth Line : 1-800-268-9688 ou par SMS au 647-694-4275 (en anglais seulement) </li>
                    <li>
                      Trans Lifeline (soutien aux personnes transgenres par des personnes transgenres) :
                      1-877-330-6330-6366 (en anglais seulement)
                    </li>
                    <li>
                      <NewWindow Href="https://publicservicepride.ca/fr/resources/"
                        Title="Ouvre dans une nouvelle fenêtre/onglet"
                        LinkText="Ressources : Fierté de la fonction publique" />
                    </li>
                  </ul>
                </template>
                <template #AccTitle-4 data-accordion="4">{{
                  $t("checkboxes[3]")
                }}</template>
                <template #AccBody-4>
                  <ul class="en" v-show="locale === 'en'">
                    <li>
                      The
                      <NewWindow
                        Href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/health-wellness-public-servants/mental-health-workplace.html"
                        LinkText="Centre of Expertise on Mental Health in the Workplace" />
                      provides information about how the Government of Canada
                      addresses mental health in the workplace, as well as
                      access to resources, tools and services for organizations,
                      managers and employees.
                    </li>
                    <li>
                      The
                      <NewWindow
                        Href="https://www.canada.ca/en/health-canada/services/environmental-workplace-health/occupational-health-safety/employee-assistance-services/employee-assistance-program.html"
                        LinkText="Employee Assistance Program (EAP)" />
                      provides free short-term counselling for personal or
                      work-related problems, as well as crisis counselling. More
                      than 80 federal departments and agencies receive their EAP
                      services through Health Canada, while other organizations
                      provide this service internally or purchase it from the
                      private sector. To find the service provider for your
                      organization, please consult the
                      <NewWindow
                        Href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/employee-assistance-program.html"
                        LinkText="departmental listing" />.
                    </li>
                    <li>
                      The
                      <NewWindow
                        Href="https://www.canada.ca/content/dam/eccc/documents/pdf/corporate-info/covid-19/five-rules-managers.pdf"
                        LinkText="Five Golden Rules for Managers" />, developed by Environment and Climate Change Canada,
                      provide guidance on how to foster a healthy work
                      environment, one that supports employees’ mental health.
                    </li>
                    <li>
                      Mental Health Services for Canadian Armed Forces Members
                      and Families
                    </li>
                    <li>Mental Health Services Available to RCMP Employees</li>
                    <li>Mental Health Services Available to Veterans</li>
                  </ul>
                  <ul class="fr" v-show="locale === 'fr'">
                    <li>
                      Le
                      <NewWindow
                        Href="https://www.canada.ca/fr/gouvernement/fonctionpublique/mieux-etre-inclusion-diversite-fonction-publique/sante-mieux-etre-fonctionnaires/sante-mentale-travail.html"
                        LinkText="Centre d’expertise sur la santé mentale en milieu de travail"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      offre des renseignements sur la façon dont le gouvernement du Canada aborde la santé mentale en
                      milieu de travail et l’accès aux ressources, aux outils et aux services pour les organisations, les
                      gestionnaires et les employé·es.
                    </li>
                    <li>
                      Le
                      <NewWindow
                        Href="https://www.canada.ca/fr/sante-canada/services/sante-environnement-milieu-travail/sante-securite-travail/service-aide-employes/programme-aide-employes.html"
                        LinkText="Programme d’aide aux employés (PAE)" Title="Ouvre dans une nouvelle fenêtre/onglet" />
                      offre gratuitement des services de consultation à court terme en cas de problèmes personnels ou
                      professionnels ainsi qu’en cas de crise. Plus de 80 ministères et organismes fédéraux reçoivent
                      leurs services du PAE par l’entremise de Santé Canada, tandis que d’autres organismes offrent ce
                      service à l’interne ou font appel au secteur privé. Pour trouver le prestataire de services pour
                      votre organisation, consultez la
                      <NewWindow
                        Href="https://www.canada.ca/fr/gouvernement/fonctionpublique/mieux-etre-inclusion-diversite-fonction-publique/programme-aide-employes.html"
                        LinkText="liste ministérielle" Title="Ouvre dans une nouvelle fenêtre/onglet" />.
                    </li>
                    <li>
                      Les
                      <NewWindow
                        Href="https://www.canada.ca/fr/environnement-changement-climatique/services/sante-securite-travail/programme-sante-bien-etre/gestionnaires-cinq-regles-dor.html"
                        LinkText="Cinq règles d’or pour les gestionnaires"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" /> élaborées par Environnement et Changement
                      climatique Canada, comportent des conseils sur la façon de favoriser un environnement de travail
                      sain pour appuyer la santé mentale des employé·es.
                    </li>
                    <li>
                      <NewWindow
                        Href="https://www.canada.ca/fr/ministere-defense-nationale/services/avantages-militaires/sante-mentale-militaires.html"
                        LinkText="Services de santé mentale pour les membres des Forces armées canadiennes et leur famille"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                    </li>
                    <li>
                      <NewWindow Href="https://www.veterans.gc.ca/fra/health-support/mental-health-and-wellness"
                        LinkText="Services de santé mentale pour les vétérans"
                        Title="Ouvre dans une nouvelle fenêtre/onglet" />
                    </li>
                  </ul>
                </template>
                <template #AccTitle-5 data-accordion="5">{{
                  $t("checkboxes[4]")
                }}</template>
                <template #AccBody-5>
                  <div class="en" v-show="locale === 'en'">
                    <div class="mh-lived">
                      <h3>Mental health lived experiences</h3>
                      <ul>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-harkness-eng.aspx"
                            LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Andrew Harkness" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-fleurimond-eng.aspx"
                            LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Esther Fleurimond" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-beland-eng.aspx"
                            LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Marc Béland" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-gagne-eng.aspx"
                            LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Marie-Anik Gagné" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/mental-health-dubourg-eng.aspx"
                            LinkText="Mental Health and the Easing of COVID-19 Restrictions in the Workplace: Sophie Dubourg" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/managing-your-mental-health-eng.aspx"
                            LinkText="Spotlight on #GCMentalHealth: Managing Your Mental Health" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/sharing-our-stories-eng.aspx"
                            LinkText="Spotlight on #GCMentalHealth: Sharing Our Stories, Inspiring Hope" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/supporting-a-colleague-eng.aspx"
                            LinkText="Spotlight on #GCMentalHealth: Supporting a Colleague" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/tips-for-managers-eng.aspx"
                            LinkText="Spotlight on #GCMentalHealth: Tips for Managers" />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/you-are-not-alone-eng.aspx"
                            LinkText="Spotlight on #GCMentalHealth: You Are Not Alone" />
                        </li>
                      </ul>
                    </div>
                    <div class="executives">
                      <h3>For Executives</h3>
                      <ul>
                        <li>
                          Podcast:
                          <NewWindow
                            Href="https://www.csps-efpc.gc.ca/podcasts/survive-executive/season1/episode3-eng.aspx"
                            LinkText="How to Survive as an Executive, Season 1, Episode 3: Leading with Calm and Authenticity, with Valerie Gideon, Ph.D." />
                        </li>
                        <li>
                          Video:
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/practical-tips-eng.aspx"
                            LinkText="EXecuTALK: Practical Tips for Strengthening Mental Health for Your Staff, Your Clients and Yourself" />
                        </li>
                      </ul>
                    </div>
                    <div class="managers">
                      <h3>For Managers</h3>
                      <ul>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf1-psychological-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 1 – Psychological and Social Support (WMT2-J01)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf2-organizational-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 2 – Organizational Culture (WMT2-J02)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf3-clear-leadership-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 3 – Clear Leadership and Expectations (WMT2-J03)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf4-civility-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 4 – Civility and Respect (WMT2-J04)" />
                        </li>
                        <li>
                          <NewWindow
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf5-psychological-competencies-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 5 – Psychological Competencies and Requirements (WMT2-J05)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf6-growth-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 6 – Growth and Development (WMT2-J06)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf7-recognition-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 7 – Recognition and Reward (WMT2-J07)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf8-involvement-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 8 – Involvement and Influence (WMT2-J08)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf9-workload-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 9 – Workload Management (WMT2-J09)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf10-engagement-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 10 – Engagement (WMT2-J10)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf11-balance-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 11 – Balance (WMT2-J11)" />
                        </li>
                        <li>
                          <NewWindow
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf12-psychological-protection-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 12 – Psychological Protection (WMT2-J12)" />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf13-protection-eng.aspx"
                            LinkText="Mental Health Job Aid for Managers: Psychosocial Factor 13 – Protection of Physical Safety (WMT2-J13)" />
                        </li>
                      </ul>
                    </div>
                    <div class="other">
                      <h3>Other School resources</h3>
                      <ul>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/mental-health-eng.aspx#resources"
                            LinkText="Mental Health Learning Series" />
                        </li>
                        <li>
                          Course:
                          <NewWindow Href="https://catalogue.csps-efpc.gc.ca/product?catalog=WMT211&cm_locale=en"
                            LinkText="Take a Deep Breath and Manage Your Stress (WMT211)" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="fr" v-show="locale === 'fr'">
                    <div class="mh-lived">
                      <h3>Santé mentale : expériences vécues</h3>
                      <ul>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/mental-health-harkness-fra.aspx"
                            LinkText="Vidéo : La santé mentale et l'assouplissement des restrictions liées à la COVID-19 sur le lieu de travail : Andrew Harkness" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/mental-health-fleurimond-fra.aspx"
                            LinkText="Vidéo : La santé mentale et l'assouplissement des restrictions liées à la COVID-19 sur le lieu de travail : Esther Fleurimond" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/mental-health-beland-fra.aspx"
                            LinkText="Vidéo : La santé mentale et l'assouplissement des restrictions liées à la COVID-19 sur le lieu de travail : Marc Béland" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/mental-health-gagne-fra.aspx"
                            LinkText="Vidéo : La santé mentale et l'assouplissement des restrictions liées à la COVID-19 sur le lieu de travail : Marie-Anik Gagné" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/mental-health-dubourg-fra.aspx"
                            LinkText="Vidéo : La santé mentale et l'assouplissement des restrictions liées à la COVID-19 sur le lieu de travail : Sophie Dubourg" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/tips-for-managers-fra.aspx"
                            LinkText="Vidéo : Pleins feux sur la #SantéMentaleGC : Conseils pour les gestionnaires" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/managing-your-mental-health-fra.aspx"
                            LinkText="Vidéo : Pleins feux sur la #SantéMentaleGC : Gérer votre santé mentale" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/sharing-our-stories-fra.aspx"
                            LinkText="Vidéo : Pleins feux sur la #SantéMentaleGC : Partager nos histoires, insuffler de l'espoir" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/supporting-a-colleague-fra.aspx"
                            LinkText="Vidéo : Pleins feux sur la #SantéMentaleGC : Soutenir un collègue" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/video/you-are-not-alone-fra.aspx"
                            LinkText="Vidéo : Pleins feux sur la #SantéMentaleGC : Vous n'êtes pas seul" />
                        </li>
                      </ul>
                    </div>
                    <div class="executives">
                      <h3>Pour les cadres</h3>
                      <ul>
                        <li>
                          <NewWindow
                            Href="https://www.csps-efpc.gc.ca/podcasts/survive-executive/season1/episode3-fra.aspx"
                            Title="Ouvre dans une nouvelle fenêtre/onglet"
                            LinkText="Balado : Comment survivre comme cadre, saison 1, épisode 3 : Comment diriger une équipe avec calme et authenticité, avec Valerie Gideon, Ph.D." />
                        </li>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/video/practical-tips-fra.aspx"
                            Title="Ouvre dans une nouvelle fenêtre/onglet"
                            LinkText="Vidéo : Entre cadres : Conseils pratiques pour améliorer la santé mentale, celle de votre personnel, celle de vos clients et la vôtre" />
                        </li>
                      </ul>
                    </div>
                    <div class="managers">
                      <h3>Pour les gestionnaires</h3>
                      <ul>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf1-psychological-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 1 – Soutien psychologique et social (WMT2-J01)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf2-organizational-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 2 – Culture organisationnelle (WMT2-J02)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf3-clear-leadership-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 3 – Leadership et attentes clairs (WMT2-J03)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf4-civility-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 4 – Courtoisie et respect (WMT2-J04)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf5-psychological-competencies-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 5 – Compétences et exigences psychologiques (WMT2-J05)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf6-growth-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 6 – Croissance et perfectionnement (WMT2-J06)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf7-recognition-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 7 – Reconnaissance et récompense (WMT2-J07)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf8-involvement-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 8 – Participation et influence (WMT2-J08)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf9-workload-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 9 – Gestion de la charge de travail (WMT2-J09)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf10-engagement-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 10 – Engagement (WMT2-J10)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf11-balance-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 11 – Équilibre (WMT2-J11)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf12-psychological-protection-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 12 – Protection de la sécurité psychologique (WMT2-J12)" />
                        </li>
                        <li>
                          <NewWindow Title="Ouvre dans une nouvelle fenêtre/onglet"
                            Href="https://www.csps-efpc.gc.ca/tools/jobaids/pf13-protection-fra.aspx"
                            LinkText="Outils de santé mentale pour les gestionnaires : Facteur psychosocial 13 – Protection de l'intégrité physique (WMT2-J13)" />
                        </li>
                      </ul>
                    </div>
                    <div class="other">
                      <h3>Autres ressources de l'école</h3>
                      <ul>
                        <li>
                          <NewWindow Href="https://www.csps-efpc.gc.ca/mental-health-fra.aspx#resources"
                            Title="Ouvre dans une nouvelle fenêtre/onglet"
                            LinkText="Série d'apprentissage sur la santé mentale" />
                        </li>
                        <li>
                          Cours :
                          <NewWindow Href="https://catalogue.csps-efpc.gc.ca/product?catalog=WMT211&cm_locale=fr"
                            Title="Ouvre dans une nouvelle fenêtre/onglet"
                            LinkText="Respirer profondément et gérer son stress" />
                        </li>
                      </ul>
                    </div>
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
          <button class="btn-regular back" @click="step--" :disabled="step <= 1">
            {{ $t("buttons.back") }}
          </button>
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
          <button class="btn-regular next" @click="step++" :disabled="step >= 2">
            {{ $t("buttons.next") }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
