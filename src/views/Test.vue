<template>
<main>
    <div class="holder">
        <div class="row">
            <h1 class="text-center text-light mt-5">Animated Scenario</h1>
        </div>
        <div class="row mt-5">
            <p class="instructions text-light text-center">
                Welcome to the scenario on Contextualizing Signs and Symptoms. Click below to begin the activity.
            </p>
        </div>
        <div class="row">
            <img class="start mx-auto d-block logo" src="../assets/start.png" alt="Start">
        </div>
    </div>
</main>
    
    
</template>
<style lang="scss" scoped>
    $school-purple: #3F2A56;
    $school-coral: #DA797A;
    
    .holder {
        border: 10px solid #EEE;
        background-color: $school-purple;
        min-height: 98vh;
    }
    .start {
        width: auto;
        height: 200px;
    }

    .instructions {
        font-size: 1.25rem;
    }
</style>
<script>
import { gsap } from 'gsap'
setTimeout( function(){
    gsap.to(".logo", {duration: 0.7, y: 10, yoyo: true, repeat: 2})
}, 100)
export default {
    name: 'Test',
    data: function() {
        return {

        }
    }
}
</script>