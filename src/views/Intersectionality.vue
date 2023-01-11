<script>
export default {
    name: 'Intersectionality',
    data: function() {
        return {
            count: 1
        }
    },
    methods: {

    }
}
</script>
<template>
    <main>
        <div class="activity-holder">
            <div class="page-counter">
                <p>
                    Page <br>
                    {{ count }} / 6
                </p>
            </div>
            <div class="wheel mb-2 d-flex justify-content-center">
                
                <figure id="svg_01">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 569 568" preserveAspectRatio="xMinYMin meet">
                        <image width="569" height="568" v-bind="{'xlink:href' : 'src/assets/intersectionality.png'}"></image>
                        <router-link to="/path" role="link" aria-label="Ethnicity / Race">
                            <rect class="hs_box" x="60" y="105" width="85" height="250" rx="50" fill-opacity="0" stroke="#000" transform="rotate(-30)"/>
                        </router-link>
                        <router-link to="/religion" role="link" aria-label="Religion">
                            <rect class="hs_box" x="240" y="3" width="85" height="250" rx="50" fill-opacity="0" stroke="#000" />
                        </router-link>
                        <router-link to="/path" role="link" aria-label="Disability">
                            <rect class="hs_box" x="345" y="-385" width="85" height="250" rx="50" fill-opacity="0" stroke="#000" transform="rotate(60)"/>
                        </router-link>
                    </svg>
                </figure>
            </div>
            <div class="nav-buttons d-flex justify-content-evenly">
                <router-link class="btn btn-large btn-primary" to="/intro">Back</router-link>
                
                <button class="btn btn-large btn-primary" @click="count++">Next</button>
            </div>
        </div>
    </main>
</template>
<style lang="scss" scoped>
    $school-purple: #3F2A56;
    $school-coral: #DA797A;
    $pale: #FCF9FF;

    .intro {
        background-color: $school-purple;
        height: 100vh;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.25rem;
        color: #FFF;
    }

    button.start {
        min-width: 4rem;
        padding: 0.25rem 1rem;
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

    .activity-holder {
        border: 10px solid $school-coral;
        background-color: $pale;
        min-height: 100vh;
    }

    #svg_01 {
        width: 569px;
    }

    .hs_box {
        fill: #FFF;
        fill-opacity: 0;
        stroke: red;
        stroke-width: 4px;
        stroke-opacity: 0;
        
    }

    a:hover .hs_box,
    a:focus .hs_box {
        stroke-opacity: 1;
    }
</style>
