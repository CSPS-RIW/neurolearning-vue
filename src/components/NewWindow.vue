<script setup>
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { onMounted, ref, onUpdated, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n';

let lang = document.querySelector('html').getAttribute('lang')

const { t, locale, availableLocales } = useI18n()
// Props: 
//  LinkText = Text inside <a>tags</a>
//  Title = Title that will show up in tooltip (optional)
//  Href = Address you are linking to
const props = defineProps({
    LinkText: { type: String, required: true },
    Title: { type: String, required: false },
    Href: { type: String, required: true }

})

// Links to the ref="tooltip" in the dom
const tooltip = ref(null)

// If you leave props.Title empty, this will generate generic titles for the tooltip
let linkTitle;
if (locale !== 'fr') {
    linkTitle = props.Title !== undefined ? props.Title : 'Opens in a new window/tab'
} else if (locale === 'fr') {
    linkTitle = props.Title !== undefined ? props.Title : 'Ouvre dans une nouvelle fenêtre/onglet'
}

// Create tooltips
let tipInstance = null
const initTippy = () => {
    // if tippy tooltip already exists destroy it before creating another
    if (tipInstance) tipInstance.destroy();
    // Add text directly to ref element
    tipInstance = tippy(tooltip.value, {
        content: linkTitle,
    })
}

// Life cycle hooks
onMounted(initTippy);

onUpdated(initTippy)

onUnmounted(() => tipInstance.destroy())

</script>

<template>
    <a :href="Href" target="_blank" rel="noopener noreferrer" class="new-window" ref="tooltip">{{ LinkText
    }}  </a>
</template>

<style lang="scss" scoped>
a {
    color: #006fbf;
    border-bottom: 1px solid #006fbf;
    font-weight: 400;
    text-decoration: none;

    &::after {
        margin-right: 0.45rem
    }

    &:hover {
        border-bottom: none;
    }

    &:visited {
        color: #7834bc;
        border-bottom: 1px solid #7834bc;
    }
}
</style>