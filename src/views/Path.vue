<template>
      <div class="wrap-layer">
        <div class="text-layer mt-5">
          <div class="instructional">
            <p class="animate__backInRight" :class="{ night: colorChange}">
              {{ message }}
            </p>
            <div class="role mb-5">
                <div class="role-buttons d-flex justify-content-md-center mb-3">
                    <button class="btn btn-outline-dark btn-lg" @click="role = 1">Archeologist</button>
                    <button class="btn btn-outline-dark btn-lg" @click="role = 2">Adventurer</button>
                    <button class="btn btn-outline-dark btn-lg" @click="role = 3">Tourist</button>
                </div>
                <div class="clarify-role">
                  <div class="archeologist" v-if="role === 1">
                    <p>Do you specialize in</p>
                    <router-link class="btn btn-outline-dark btn-lg" to="/archeologist">Ancient Egypt</router-link>
                    <router-link class="btn btn-outline-dark btn-lg" to="/archeologist">Ancient Rome</router-link>
                  </div>
                  <div class="archeologist" v-else-if="role === 2">
                    <p>Do you specialize in</p>
                    <router-link class="btn btn-outline-dark btn-lg" to="/adventurer">Tomb Raiding</router-link>
                    <router-link class="btn btn-outline-dark btn-lg" to="/adventurer">Treasure Hunting</router-link>
                  </div>
                  <div class="archeologist" v-else-if="role === 3">
                    <p>Do you specialize in</p>
                    <router-link class="btn btn-outline-dark btn-lg" to="/tourist">All-inclusive Resorts</router-link>
                    <router-link class="btn btn-outline-dark btn-lg" to="/tourist">Exploration and Discovery</router-link>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="background-layer">
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 900'>
            <rect fill='#ff7700' width='1600' id="A1" height='900' :class="{ night: colorChange }"/>
          
          <g v-if="step === 0">
            <ellipse fill="#e03004" id="C1" cx="1300" cy="500" rx="100" ry="100" :class="{ moon: colorChange }"/>
            <ellipse fill="#e03004" id="C2" cx="1318" cy="495" rx="83" ry="83" :class="{ night: colorChange }"/>
          </g>
          <g v-else>
            <ellipse fill="#e03004" id="C1" cx="1300" cy="250" rx="100" ry="100" :class="{ moon: colorChange }"/>
            <ellipse fill="#e03004" id="C2" cx="1318" cy="245" rx="83" ry="83" :class="{ night: colorChange }"/>
          </g>
            <polygon fill='#cc0000' id="E1"  points='957 450 539 900 1396 900'/>
            <polygon fill='#aa0000' id="E2"  points='957 450 872.9 900 1396 900'/>
            <polygon fill='#d6002b' id="E3"  points='-60 900 398 662 816 900'/>
            <polygon fill='#b10022' id="E4"  points='337 900 398 662 816 900'/>
            <polygon fill='#d9004b' id="E5"  points='1203 546 1552 900 876 900'/>
            <polygon fill='#b2003d' id="E6"  points='1203 546 1552 900 1162 900'/>
            <polygon fill='#d3006c' id="E7"  points='641 695 886 900 367 900'/>
            <polygon fill='#ac0057' id="E8"  points='587 900 641 695 886 900'/>
            <polygon fill='#c4008c' id="E9"  points='1710 900 1401 632 1096 900'/>
            <polygon fill='#9e0071' id="E10"  points='1710 900 1401 632 1365 900'/>
            <polygon fill='#aa00aa' id="E11"  points='1210 900 971 687 725 900'/>
            <polygon fill='#880088' id="E12"  points='943 900 1210 900 971 687'/>
          </svg>
        </div>
      </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
.wrap-layer{
      position: relative;
   }
   .text-layer{
      position: absolute;
      width: 100%;
      height: auto;
      top: 0;
      left: 0;
      padding: 30px;
      text-align: center;
      font-size: 32px;
      line-height: 1.2;
      font-family: 'Roboto Mono', monospace;
   }
   .background-layer svg * {
      transition: fill 1s ease;
   }

   .night {
    fill: midnightblue;
    color: whitesmoke;
   }

   .darkButton {
    color: whitesmoke;
    border-color: whitesmoke;
   }

   .moon {
    fill: #fffef0;
   }

   .invisible {
    visibility: hidden;
   }
   /*.background-layer:hover #A1 {fill: midnightblue;}
   .background-layer:hover #C1{fill: #fffef0;}
   .background-layer:hover #E1{fill: #404;}
   .background-layer:hover #E2{fill: #505;}
   .background-layer:hover #E3{fill: #606;}
   .background-layer:hover #E4{fill: #707;}
   .background-layer:hover #E5{fill: #808;}
   .background-layer:hover #E6{fill: #909;}
   .background-layer:hover #E7{fill: #919;}
   .background-layer:hover #E8{fill: #929;}
   .background-layer:hover #E9{fill: #939;}
   .background-layer:hover #E10{fill: #949;}*/

</style>
<script>
export default {
    name: 'Path',
    data: function() {
        return {
            step: 0,
            role: 0,
            message: 'Are you an',
            colorChange: false,
            complete: false
        }
    },
    methods: {
        nextStep: function() {
            this.step++
        },
        clarifyRole: () => {

        }
    }
}
</script>