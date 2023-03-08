<script setup>

import { useI18n } from 'vue-i18n';
const { t, locale, availableLocales } = useI18n()

let lang = document.querySelector('html').getAttribute('lang')
// Get the number of accordions based on props
const props = defineProps(['AccNum'])
let accNum = parseInt(props.AccNum)
// use randNum to create unique ids
let randNum = Math.floor(Math.random() * 100)
// Toggle between open and closed accordions
const toggleAccordions = (e) => {
    let expandBtn = e.target
    let accHeaders = expandBtn.nextSibling.querySelectorAll('.multi-accordion-group .btn-link')
    let accContent = expandBtn.nextSibling.querySelectorAll('.multi-accordion-group [role="region"]')
    accContent.forEach(content => {
        if (content.classList.contains('show')) {
            expandBtn.setAttribute('aria-expanded', false)
            //lang === 'en' ? expandBtn.innerText = 'Open All Panels' : expandBtn.innerText = 'Ouvrir tous les panneaux'
        } else {
            expandBtn.setAttribute('aria-expanded', true)
            //lang === 'en' ? expandBtn.innerText = 'Close All Panels' : expandBtn.innerText = 'Fermer tous les panneaux'
        }
        content.classList.contains('show') ?
            content.classList.remove('show') :
            content.classList.add('show')
        accHeaders.forEach(header => {
            content.classList.contains('show') ? header.setAttribute('aria-expanded', true) : header.setAttribute('aria-expanded', false)
        })
    })
}
</script>

<template>
    <div class="multi-accordion-group" :data-acc-group="`multi_accordion_${randNum - 2}`" hidden>
        <!-- <button type="button" class="btn ac-btn btn-secondary expandall" aria-expanded="false" @click="toggleAccordions"
            v-if="lang !== 'fr'">Open All Panels</button> -->
        <button type="button" class="btn ac-btn btn-secondary expandall" aria-expanded="false" @click="toggleAccordions"
           >{{ $t("openAll") }}</button>
        <div class="accordion acc-id" :id="`multi_accordion_${randNum - 2}`">
            <div v-for="accordion in accNum" :key="accordion" :data-accordion="accordion" hidden>
                <div class="card">
                    <div class="card-header" :id="`multi_accordion_heading_${accordion + randNum}`">
                        <h2 class="card-title">
                            <button class="btn btn-link" data-toggle="collapse" aria-expanded="false"
                                :data-target="`#multi_accordion_${accordion + randNum}`"
                                :aria-controls="`multi_accordion_${accordion + randNum}`"
                                :data-acc-id="`multi_accordion_${randNum - 2}`">
                                <slot :name="`AccTitle-${accordion}`" />
                            </button>
                        </h2>
                    </div>
                    <div :id="`multi_accordion_${accordion + randNum}`" class="collapse"
                        :aria-labelledby="`multi_accordion_heading_${accordion + randNum}`" role="region">
                        <div class="card-body">
                            <p>
                                <slot :name="`AccBody-${accordion}`" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.expandall {
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 4px;
    padding: 0.625rem 1.5rem 0.625rem;
    line-height: 1.25;
    margin-top: 0.75rem;
}
</style>