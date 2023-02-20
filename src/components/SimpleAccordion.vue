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