<template>
  <div>
    <textarea
      v-model="inputTextDto.inputText"
      @input="postInputText(inputTextDto)"
      style="width: 500px; height: 200px"
    ></textarea>
    <pre id="highlightArea">{{ inputTextDto.inputText }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import $ from "jquery";

export default defineComponent({
  name: "SymptomScanner",
  data() {
    return {
      inputTextDto: {
        inputText: "",
      },
      symptoms: [],
    };
  },
  updated() {
    this.highlightSymptoms();
  },
  methods: {
    spanWrap(s: string) {
      return '<span style="background-color: #B2FFB2">' + s + "</span>";
    },
    highlightSymptoms() {
      let text = $("#highlightArea").text();
      this.symptoms.forEach((s) => {
        let pattern = new RegExp(s, "gi");
        let result = text.match(pattern);
        console.log("regex", result);
        if (result) {
          result.forEach((match) => {
            console.log("match", match);
            text = text.replace(match, this.spanWrap(match));
          });
        }
      });
      console.log(this.symptoms);
      $("#highlightArea").html(text);
    },
    async postInputText(inputTextDto: object) {
      const res = fetch("http://localhost:3000/symptoms", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputTextDto),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          this.symptoms = data;
          return data;
        });
    },
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hl {
  background-color: rgba(0, 255, 0, 0.3);
}
</style>
