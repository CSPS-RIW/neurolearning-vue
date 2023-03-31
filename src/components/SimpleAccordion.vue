<script setup>
let randNum = Math.floor(Math.random() * 100);
</script>

<template>
    <div class="accordion">
        <div class="card">
            <div class="card-header" :id="`accordion_heading_${randNum}`">
                <h2 class="card-title">
                    <button class="btn btn-link" data-toggle="collapse" aria-expanded="false"
                        :data-target="`#accordion_${randNum}`" :aria-controls="`accordion_${randNum}`">
                        <slot name="AccTitle" />
                    </button>
                </h2>
            </div>
            <div :id="`accordion_${randNum}`" class="collapse" :aria-labelledby="`accordion_heading_${randNum}`"
                role="region">
                <div class="card-body">
                    <p>
                        <slot name="AccBody" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.accordion :not(.card-standard):not(.card-graphic).card .card-title button {
    padding-left: 2.5rem;
    border: none ;
    text-decoration: none;
    font-size: 20px;

    &:hover, &:focus {
        text-decoration: underline;
    }
}

.accordion :not(.card-standard):not(.card-graphic).card {
    border: 1px solid #4E5B73;
}

.card {
    margin: 0.75rem;
    
}
</style>