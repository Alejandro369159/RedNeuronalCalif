<script setup lang="ts">
import { NeuralNetwork } from "brain.js";
import { onMounted, ref } from "vue";
import { hexToRGB } from "@/utils/hexToRGB";

const net = new NeuralNetwork();

const colorInHEX = ref<string>("#ffffff");
const textColor = ref<string>("#00000");

function activateRunner() {
  const RGB = hexToRGB(colorInHEX.value ?? "");
  if (RGB === null) return;
  const result = net.run({
    red: RGB[0] / 255,
    green: RGB[1] / 255,
    blue: RGB[2] / 255,
  }) as {
    isBlack: number;
  };
  if (result.isBlack > 0.5) {
    textColor.value = "#000000";
  } else {
    textColor.value = "#ffffff";
  }
}

onMounted(() => {
  net.train([
    // Entrenamiento base
    { input: { red: 0, green: 0, blue: 0 }, output: { isBlack: 0 } },
    { input: { red: 1, green: 1, blue: 1 }, output: { isBlack: 1 } },

    // Entrenamiento de excepciones y detalles
    { input: { red: 0.66, green: 0.011, blue: 0.011 }, output: { isBlack: 0 } },
    { input: { red: 0.83, green: 0.8588, blue: 0.96 }, output: { isBlack: 1 } },
    {
      input: { red: 0.105, green: 0.1764, blue: 0.2941 },
      output: { isBlack: 0 },
    },
    {
      input: { red: 0.1529, green: 0.1294, blue: 0.3725 },
      output: { isBlack: 0 },
    },
    {
      input: { red: 0.8705, green: 0.8705, blue: 0.8901 },
      output: { isBlack: 1 },
    },
    { input: { red: 0.98, green: 0.98, blue: 0.98 }, output: { isBlack: 1 } },
    { input: { red: 0.49, green: 0.29, blue: 0.29 }, output: { isBlack: 0 } },
    { input: { red: 0.1568, green: 1, blue: 0.0784 }, output: { isBlack: 1 } },
  ]);
});
</script>

<template>
  <div class="main-container">
    <div></div>
    <div>
      <label>Color del fondo: </label>
      <input @change="activateRunner" type="color" v-model="colorInHEX" />
    </div>
  </div>
  <div class="background" :style="{ backgroundColor: colorInHEX }">
    <h1 :style="{ color: textColor }">Texto</h1>
  </div>
</template>

<style scoped>
.main-container {
  width: fit-content;
  margin: auto;
  display: flex;

  & div {
    margin-inline: 10px;
  }
}

label {
  font-size: larger;
}
input {
  border-radius: 10px;
  border: 1px solid rgb(196, 196, 196);
  padding: 6px 0;
}
button {
  display: block;
  margin: auto;
}

.background {
  margin: 10px auto;
  width: 600px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;

  & h1 {
    font-size: 3rem;
  }
}
</style>
