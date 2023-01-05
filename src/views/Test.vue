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
            <div class="scene-1" v-if="count === 1"> 
                <div class="animation-1">
                    <img class="character" id="man" src="../assets/businessman.png" alt="">
                </div>
                <div class="animation-2">
                    <img src="../assets/coin.png" id="coin1" alt="" class="coin none">
                    <img src="../assets/work.png" id="work" alt="" class="character none">
                    <img src="../assets/coin.png" id="coin2" alt="" class="coin none">
                </div>
            </div>
            <div class="scene-2" v-if="count === 2">
                <div class="animation-1">
                    <img src="../assets/moon.png" id="moon" alt="" class="moon none">
                    <img src="../assets/work.png" id="work" alt="" class="character none">
                </div>
            </div>
        </div>
        <div class="animation-controls d-flex justify-content-center">
            <button class="btn btn-success btn-large" @click="scene()">Play Animation</button>
        </div>
        <div class="text">
            <p>{{ text[count - 1] }}</p>
        </div>
        <div class="nav-buttons d-flex justify-content-center">
            <button class="btn btn-large btn-primary back" @click="prevPage()">Back</button>
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
        min-height: 100vh;
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

    .animation-frame {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 1rem;
        min-height: 128px;
    }

    .animation-2 {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .character {
        max-width: 128px;
        height: auto;
        
        &#man {
            display: none;
        }
    }

    .coin {
        max-width: 25px;
        max-height: 25px;
    }

    .moon {
        max-width: 50px;
        max-height: 50px;
    }

    .none {
        display: none;
    }

    .text {
        font-size: 18px;
        margin: 1rem auto;
        text-align: center;
        max-width: 500px;
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
            text: [
                'Deidrick is a 53-year-old white man who has always worked extremely hard. His career is very important for him; it allows his wife to work only a few hours per week and be at home with the kids more often. Deidrick is proud to provide the opportunity for his wife to live her best life, and proud to know that his income from work means his kids will not be financially at risk.',
                'Deidrick’s relationship with his partner has gone downhill. Deidrick has an extremely high workload and needs to work long hours. At the same time, his kids are getting older, and his wife is starting to explore her professional life more, which is changing the relationship dynamics. Deidrick was shocked to find out that his wife was not perfectly happy being a fulltime care provider for the family. Deidrick needs the support from his wife to deal with the stresses of work, but recently his wife is focused more on her professional life. ',
                'Deidrick feels unappreciated by his wife. Lately, when Deidrick comes home and does not receive the appreciation and emotional support he needs, he notices that he responds in a hostile, blame-game, immature way. He is not proud of his own responses, but he doesn’t know what else to do and feels out of control.'
            ]
        }
    },
    methods: {
        nextPage() {
            
            switch (this.count) {
                
                case 0:
                    this.count++
                    break;
                case 1:
                    this.count++
                    break;
                case  2:
                    this.count++
                    break;
            }
        },
        prevPage() {
            switch (this.count) {

                case 1:
                    this.count--
                    break;
                case 2: 
                    this.count--
                    break;
                case 3:
                    this.count--
                    break;
            }
        },
        /*scene1() {
            //let tween = gsap.to()
            let tl = gsap.timeline()
            tl.to("#man", {duration: 0.7, x: -40})
              .to("#woman", {duration: 0.2, opacity: 100, ease: "in" })
              .to("#woman", {duration: 1, x: 40 })
        },*/
        scene() {
            let tl = gsap.timeline()
            let tl2 = gsap.timeline()

            switch (this.count) {
                case 1:
                    tl.fromTo('#man', {display: 'none', autoAlpha: 0}, {display: 'block', autoAlpha: 1, duration: 1} )
                    tl.to("#man", { autoAlpha: 0, display: 'none', delay: 1, duration: 1});
                    // Scene 2
            
                    tl.fromTo('#work', {display: 'none', autoAlpha: 0}, {display: 'block', autoAlpha: 1, duration: 1} )
                    tl.fromTo('#coin1', {display: 'none', autoAlpha: 0, y: 0}, { display: 'block', autoAlpha: 1, y: -30, duration: 1 })
                    tl.fromTo('#coin2', {display: 'none', autoAlpha: 0, y: 0}, { display: 'block', autoAlpha: 1, y: -20, duration: 1 })
                    //tl2.to()
                    break;
                
                case 2:
                    
                    tl.fromTo('#work', {display: 'none', autoAlpha: 0}, {display: 'block', autoAlpha: 1, duration: 1} )
                    tl.fromTo('#moon', {display: 'none', autoAlpha: 0, x: 100, y: 70}, {display: 'block', autoAlpha: 1, y: 40, duration: 1} )
                    break;
            }
        }
        
    }
}
</script>