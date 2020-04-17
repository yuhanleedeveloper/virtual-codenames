<template>
  <div class="container">
    <div v-if="cardData!==null" class="card-container">
      <div class="centered-card" :style="findCenterXY">
        <h1>{{cardData.value}}</h1>
        <img class="suites" v-bind:src="require(`../assets/suit/${cardData.suit}.png`)" alt />
      </div>
    </div>
    <div v-for="(card,index) in cards" :key="index" v-on:click="onClick(card)">
      <div v-if="!card.isFlipped" class="card" :style="card.style">
        <div v-if="card.isFlipped">
          <h3>{{card.value}}</h3>
          <img class="suites" v-bind:src="require(`../assets/suit/${card.suit}.png`)" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import playCards from "../assets/deck_of_cards.json";
export default {
  name: "Kings",
  data: function() {
    return {
      cardData: null,
      cards: this.shuffleArray(playCards)
    };
  },
  methods: {
    rotate(i, length) {
      let r =
        window.innerHeight > window.innerWidth
          ? window.innerWidth * 0.35
          : window.innerHeight * 0.35;
      let windowWidth = window.innerWidth / 2 - r / 3;
      let deg = ((length - i - 1) * 360) / length;
      let x = r * Math.cos((deg * Math.PI) / 180);
      let y = r * Math.sin((deg * Math.PI) / 180) + r;

      let shadow = (deg - 270) * -1 <= 90 ? 2 : -2;
      let hover = deg - 270 >= -180 && deg - 270 <= 0 ? -2 : 2;

      return {
        transform: "rotate(" + (deg - 270) + "deg)",
        left: x + windowWidth + r * 0.1 + "px",
        top: y + r * 0.2 + "px",
        "box-shadow": "0px " + shadow + "px 4px #0000004b",
        "--left-hover": x + windowWidth + r * 0.1 + 10 * hover + "px",
        "--top-hover": y + r * 0.2 - 10 * shadow + "px"
      };
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return this.addIndex(array);
    },
    onClick(c) {
      this.cardData = c;
      c.isFlipped = !c.isFlipped;
    },
    addIndex(array) {
      return array.map((a, i) => ({
        ...a,
        style: this.rotate(i, array.length),
        isFlipped: false
      }));
    }
  },
  computed: {
    findCenterXY() {
      return {
        left: this.cards.find(c => c.style.transform === "rotate(0deg)").style
          .left,
        top: this.cards.find(c => c.style.transform === "rotate(-270deg)").style
          .top
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin: 10px;
  width: 90px;
  height: 150px;
  background-color: aqua;
  border-radius: 10%;
  border: 6px solid white;
  position: absolute;
}

.centered-card {
  position: fixed;
  width: 200px;
  height: 260px;
  background-color: yellow;
  border-radius: 10%;
  border: 6px solid white;
  transform: translate(-40px, -40px);
  box-shadow: 0px 2px 4px #0000004b;
}

.card:hover {
  background-color: yellow;
  outline: #333 solid 4px;
  cursor: pointer;
  top: var(--top-hover) !important;
  left: var(--left-hover) !important;
}

.suites {
  width: 70%;
}

h1 {
  margin: 0;
  font-size: 60px;
}

h3 {
  margin: 0;
}

img {
  pointer-events: none;
}
</style>