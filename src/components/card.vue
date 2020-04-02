<template>
  <div class="container">
    <div class="card-title">
      <div class="card-start-btn-container">
        <button class="card-start-btn" v-on:click="getRandomCards()">
          <p>New Game</p>
        </button>
      </div>
      <h1>CODENAMES</h1>
      <div>
        <select class="dropdown" v-model="selectedGameVer" @change="getRandomCards()">
          <option class="dropdown-option">Original</option>
          <option class="dropdown-option">Undercover</option>
          <option class="dropdown-option">Duet</option>
        </select>
        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" @change="toggleSpyMasterView()" v-model="selected" />
            <span class="slider round"></span>
          </label>
          <p class="swith-label">Spy Master</p>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="card-container" v-for="(card, index) in cards" v-bind:key="index">
        <button
          class="card-content"
          v-bind:class="[
            card.isFlipped ? card.color : '',
            card.color === 'card-black' && card.isFlipped ? 'exploded' : ''
          ]"
          v-on:click="cardOnClick(card)"
        >
          <h2>{{ card.text }}</h2>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import original from "../assets/original.json";
import undercover from "../assets/undercover.json";
import duet from "../assets/duet.json";
export default {
  name: "Card",
  data: function() {
    return {
      number: 0,
      cards: {},
      gameVersion: {
        originalVer: original,
        undercoverVer: undercover,
        duetVer: duet
      },
      selectedGameVer: "Original"
    };
  },
  created: function() {
    this.getRandomCards();
  },
  methods: {
    cardOnClick: function(card) {
      card.isFlipped = !card.isFlipped;
    },
    getRandomCards() {
      let gameVer = this.getGameVersion();
      this.selected = false;

      let cardSet = [];
      let counter = 1;
      const colors = this.getCardConfiguration();
      let colorsCount = 4;
      while (counter <= 25) {
        let ranNum = this.getRandomNumber(gameVer.length);
        let ranColor = this.getRandomNumber(colorsCount);
        while (cardSet.find(card => card.text === gameVer[ranNum])) {
          ranNum = this.getRandomNumber(gameVer.length);
        }
        cardSet.push({
          text: gameVer[ranNum],
          color: colors[ranColor].className,
          isFlipped: false
        });

        colors[ranColor].cardNum--;
        if (colors[ranColor].cardNum === 0) {
          colors.splice(ranColor, 1);
          colorsCount--;
        }
        counter++;
      }
      this.cards = cardSet;
    },
    toggleSpyMasterView() {
      this.cards = this.cards.map(card => ({
        text: card.text,
        color: card.color,
        isFlipped: this.selected
      }));
    },
    getCardConfiguration() {
      let redNum = this.getRandomNumber(2) === 1 ? 9 : 8;
      return [
        { className: "card-red", cardNum: redNum },
        { className: "card-blue", cardNum: 17 - redNum },
        { className: "card-black", cardNum: 1 },
        { className: "card-yellow", cardNum: 7 }
      ];
    },
    getGameVersion() {
      switch (this.selectedGameVer) {
        case "Original":
          return this.gameVersion.originalVer;
        case "Undercover":
          return this.gameVersion.undercoverVer;
        case "Duet":
          return this.gameVersion.duetVer;
      }
    },
    getRandomNumber(lastIndex) {
      return Math.floor(Math.random() * lastIndex);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.card-title {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
h1 {
  display: inline-block;
  font-size: 40px;
}
h2 {
  font-size: 25px;
}
p {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
}
.card-container {
  flex-basis: 20%;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 125px;
  background-color: #a0a0a04b;
  margin: 0 auto 20px;
  box-shadow: 0 2px 4px 0 #0000004b;
}

.card-red {
  background-color: #de29294b;
}

.card-blue {
  background-color: #29abde4b;
}

.card-yellow {
  background-color: #dec9294b;
}

.card-black {
  background-color: #0000008f;
}

.card-start-btn-container {
  display: inline-block;
  width: 175px;
}

.card-start-btn {
  width: 100%;
  padding: 15px 0;
  background-color: #6bc077;
  color: white;
}

.exploded {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  color: white;
}

button {
  border: 0;
  border-radius: 3px;
}

button:focus {
  outline: none;
}

button:hover {
  background-color: #a7a7a7;
}

.switch-container {
  width: 175px;
  display: inline-block;
  vertical-align: top;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #6bc077;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.dropdown {
  border: 0;
  width: 150px;
  background: #c9eccd;
  font-size: 20px;
  position: relative;
  top: 15px;
}
</style>

