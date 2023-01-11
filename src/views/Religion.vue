<template>
    <main>
        <div class="activity-holder">
            <div class="page-counter">
                <p>
                    Page <br>
                    1 / 6
                </p>
            </div>
            <div class="wrapper">
                <div class="content mb-2">
                    <p>
                        Mo is Muslim. Mo’s workplace is Islamophobic, and he regularly feels excluded or othered. This mainly happens through offhanded remarks, seemingly jokes. If Mo speaks out, he is told that he doesn’t have a sense of humor. He is experiencing stress and symptoms of depression. 
                    </p>
                    <img src="../assets/mo.png" alt="">
                    <div class="navigation">
                        <router-link to="/intersectionality" class="btn btn-large btn-primary">Back</router-link>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </main>
</template>
<script>
export default {
    name: 'Disability',
    data: function() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    $school-purple: #3F2A56;
    $school-coral: #DA797A;
    $pale: #FCF9FF;
    $religion-blue: rgb(48, 142, 199);
    
    .page-counter {
        width: 200px;
        height: 200px;
        background-color: $religion-blue;
        color: #FFF;
        padding: 2rem;
        border-radius: 0px 0px 200px 0px;

        p {
            font-size: 2rem;
        }
    }

    .activity-holder {
        border: 10px solid $religion-blue;
        background-color: $pale;
        min-height: 100vh;
    }

    .content {
        font-size: 1.5rem;
        max-width: 700px;
        @media (min-width: 700px) {
             display: grid;
            grid-template-columns: 2fr 1fr;
            grid-template-rows: 7fr 1fr;
        }
       
        margin: auto;

        img {
            width: 100%;
        }
    }

    .wrapper {
        padding: 1rem;
        @media (min-width: 700px) {
            padding: 1rem 5rem;
        }
    }
</style>