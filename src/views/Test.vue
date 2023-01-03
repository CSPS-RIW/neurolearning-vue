<template>
<main>
    <div class="holder" v-if="count === 0">
        <div class="row">
            <h1 class="text-center text-light mt-5">Animated Scenario</h1>
        </div>
        <div class="start">
            <div class="row mt-5">
                <p class="instructions text-light text-center">
                    Welcome to the scenario on Contextualizing Signs and Symptoms. Click below to begin the activity.
                </p>
            </div>
            <div class=" d-flex justify-content-center">
                <button class="btn btn-primary" @click="nextPage()">START</button>
            </div>
        </div>  
    </div>
    <div class="activity-holder" v-if="count > 0">
        <div class="page-counter">
            <p>
                Page <br>
                {{ count }} / 6
            </p>
        </div>
        <div class="animation-frame">
            <div class="animation-1">
                <img id="man" src="../assets/businessman.png" alt="">
                <img class="character hidden" id="woman" src="../assets/businesswoman.png" alt="">
            </div>
        </div>
        <div class="text">

        </div>
        <div class="nav-buttons d-flex justify-content-center">
            <button class="btn btn-large btn-primary back" @click="count--">Back</button>
            <button class="btn btn-large btn-primary next" @click="nextPage()">Next</button>
        </div>
    </div>
</main>
    
    
</template>
<style lang="scss" scoped>
    $school-purple: #3F2A56;
    $school-coral: #DA797A;
    $pale: #FCF9FF;
    
    .holder {
        border: 10px solid #EEE;
        background-color: $school-purple;
        min-height: 98vh;
    }

    .activity-holder {
        border: 10px solid $school-coral;
        background-color: $pale;
        min-height: 98vh;
    }

    .start {
        width: auto;
        height: 200px;
    }

    .instructions {
        font-size: 1.25rem;
    }

    .page-counter {
        width: 200px;
        height: 200px;
        background-color: $school-coral;
        color: #FFF;
        padding: 2rem;
        border-radius: 0px 0px 200px 0px;

        p {
            font-size: 2rem;
        }
    }

    .hidden {
        display: none;
    }

    .animation-frame {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .character {
        max-width: 128px;
        height: auto;
    }

    .nav-buttons {
        margin-top: 3rem;
        .next {
            margin-left: 1rem;
        }
    }
</style>
<script>
import { gsap } from 'gsap'

export default {
    name: 'Test',
    data: function() {
        return {
            count: 0,
            tl: gsap.timeline()
        }
    },
    methods: {
        nextPage() {
            
            switch (this.count) {
                
                case 0:
                    this.count++
                    setTimeout(() => {
                        this.scene1()
                    }, 100)
                    break;
                case 1:
                    this.count++
                    this.scene1()
            }
        },
        prevPage() {

        },
        slideRight() {
            gsap.to("#man", {duration: 0.7, x: 20})
        },
        slideInLeft() {
            gsap.to("#man", {duration: 0.7, x: -20})
        },
        scene1() {
            this.tl.to("#man", {duration: 0.7, x: -40})
                   .to("#man", {duration: 1, rotation: 360});
        }
        
    }
}
</script>