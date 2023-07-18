<template>
  <div class="container max-w-7xl px-3 md:px-12 py-24">
    <div class="grid md:grid-cols-2 gap-6">
      <div class="text-lg font-semibold mb-3">Options</div>
      <div class="text-lg font-semibold mb-3">Preview</div>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-container p-6 rounded-md md:h-full">
        <!-- <div class="flex flex-wrap gap-3">
          <label class="flex items-center mt-3 border px-3 py-2 cursor-pointer rounded-md font-semibold" :class="{ 'btn-selected': formData.isImportFromCsv === false }">
            <input type="radio" name="animation" class="hidden form-radio border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" @click="() => formData.isImportFromCsv = false">
            <span>Text Input</span>
          </label>
          <label class="flex items-center mt-3 border px-3 py-2 cursor-pointer rounded-md font-semibold" :class="{ 'btn-selected': formData.isImportFromCsv === true }">
            <input type="radio" name="animation" class="hidden form-radio border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" @click="() => formData.isImportFromCsv = true">
            <span>Import from CSV</span>
          </label>
        </div> -->
        <div v-if="!formData.isImportFromCsv">
          <label class="block mt-3">
            <span>Template Search:</span>
            <SearchAutocomplete
              :items="allTemplates.map((template) => template.title)"
              @selected="handleTemplate($event)"
              @keyup.enter="handle($event.target.value)"
              v-model="formData.search"
            />
          </label>

          <label class="block mt-3">
            <span>Input Text:</span>
            <textarea
              rows="4"
              @change="handleInputChange"
              type="text"
              class="mt-1 block w-full bg-input rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="formData.input"
            >
            </textarea>
          </label>

          <label class="block mt-5">Animation Type: </label>
          <div class="flex flex-wrap gap-3">
            <label
              v-for="(item, index) in outputs"
              :key="index"
              class="flex items-center mt-1 border px-3 py-2 cursor-pointer rounded-md font-semibold"
              :class="{ 'btn-selected': formData.animation_type === item }"
            >
              <input
                @change="handleFormUpdate"
                type="radio"
                name="animation_type"
                class="hidden form-radio border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="formData.animation_type"
                :value="item"
              />
              <span>{{ item }}</span>
            </label>
          </div>

          <div>
            <label class="flex items-center mt-3 color-label">
              <span>Text Color:</span>
              <div class="cp_wrapper">
                <input
                  type="color"
                  @blur="handleFormUpdate"
                  name="text_color"
                  class="ml-3 rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="formData.text_color"
                />
              </div>
            </label>
          </div>
          <hr />
          <h3 class="group-title">Box</h3>
          <div>
            <div class="container flex mt-3">
              <label class="block mt-3" style="max-width: 45%">
                <span class="block">Width (px):</span>
                <input
                  @change="handleFormUpdate"
                  type="number"
                  name="width"
                  class="rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  style="max-width: 100%"
                  v-model="formData.preview_box.width"
                  placeholder="Auto"
                />
              </label>
              <span class="block mt-11 ml-2 mr-2">X</span>
              <label class="block mt-3" style="max-width: 45%">
                <span class="block">Height (px):</span>
                <input
                  @change="handleFormUpdate"
                  type="number"
                  name="height"
                  class="rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  style="max-width: 100%"
                  v-model="formData.preview_box.height"
                  placeholder="Auto"
                />
              </label>
            </div>
          </div>
          <div>
            <label class="flex items-center mt-3 color-label">
              <span>Background Color:</span>
              <div class="cp_wrapper">
                <input
                  @blur="handleFormUpdate"
                  type="color"
                  name="bg_color"
                  class="ml-3 rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="formData.preview_box.bg_color"
                />
              </div>
            </label>
          </div>
          <hr />
          <div v-if="formData.animation_type === 'Text'">
            <label class="block mt-4">Animation Style: </label>
            <u class="block mt-4">Entrance Animations</u>
            <div class="flex flex-wrap gap-3">
              <label
                v-for="(item, index) in animations.entrance"
                :key="index"
                class="flex items-center mt-1 border px-3 py-2 cursor-pointer rounded-md font-semibold"
                :class="{ 'btn-selected': formData.animation === item }"
              >
                <input
                  @click="handleFormUpdate"
                  type="radio"
                  name="animation"
                  class="hidden form-radio border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="formData.animation"
                  :value="item"
                />
                <span>{{ item }}</span>
              </label>
            </div>
            <u class="block mt-4">Exit Animations</u>
            <div class="flex flex-wrap gap-3">
              <label
                v-for="(item, index) in animations.exit"
                :key="index"
                class="flex items-center mt-1 border px-3 py-2 cursor-pointer rounded-md font-semibold"
                :class="{ 'btn-selected': formData.animation === item }"
              >
                <input
                  @click="handleFormUpdate"
                  type="radio"
                  name="animation"
                  class="hidden form-radio border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="formData.animation"
                  :value="item"
                />
                <span>{{ item }}</span>
              </label>
            </div>
            <div>
              <label class="block mt-4">
                <span class="block">Animation Duration (ms):</span>
                <input
                  @blur="handleFormUpdate"
                  type="number"
                  name="animation_duration"
                  step="50"
                  class="mt-1 rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="formData.animation_duration"
                />
              </label>
            </div>
            <div>
              <label class="block mt-4">
                <span class="block">Animation Pause (ms):</span>
                <input
                  @blur="handleFormUpdate"
                  type="number"
                  name="animation_pause"
                  step="50"
                  class="mt-1 rounded-md bg-input border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="formData.animation_pause"
                />
              </label>
            </div>
          </div>
        </div>
        <div v-else>
          <label class="block mt-5">
            <span>Import CSV:</span>
            <input
              type="file"
              class="form-file mt-3 block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              @change="onFileUpload"
            />
          </label>
          <div v-if="csvFileName" class="mt-3">
            File name: {{ csvFileName }}
          </div>
        </div>
      </div>
      <div>
        <div
          class="bg-container rounded-md p-1 md:h-full text-center flex items-center justify-center"
          id="previewElement"
          :style="{
            backgroundColor: formData.preview_box.bg_color,
            color: formData.text_color,
            height: formData?.preview_box?.height
              ? formData?.preview_box?.height + 'px'
              : 'fit-content',
            width: formData?.preview_box?.width
              ? formData?.preview_box?.width + 'px'
              : 'fit-content',
          }"
        >
          <div
            ref="previewElement"
            style="white-space: pre-wrap"
            v-html="formData.result"
          ></div>
        </div>
        <div class="flex">
          <input
            type="button"
            class="mt-3 px-3 py-2 font-semibold rounded-md text-black bg-teal-600 hover:bg-teal-500 cursor-pointer transition"
            value="Generate"
            @click="GenerateAnimation()"
          />

          <button
            id="generate-btn"
            class="mt-3 ml-3 px-3 py-2 font-semibold rounded-md text-black bg-teal-600 hover:bg-teal-500 cursor-pointer transition"
            @click="generateGif"
            v-if="formData.animation_type === 'Text'"
          >
            Generate GIF
          </button>
        </div>
        <div>
          <h3 class="group-title">Tips</h3>
          <ul style="list-style: circle" class="ml-6">
            <li>
              Between the two quotes to the right is a thin space character: “ ”
            </li>
            <li>
              Here are some hard to find symbols that might be helpful: ▔
              ✖️🟰➗➖ ≈ π •
            </li>
            <li>
              To add an emoji (🐈🐶🔵) on a Windows computer, press Win + ;
            </li>
            <li>
              To add an emoji (🐈🐶🔵) on a Mac computer, press Command +
              Control + Space
            </li>
            <li>
              You can add multiple lines of text in a single ‘row’ of text
              input. This is helpful when explaining arithmetic.
            </li>
            <li>
              You can style any part of the text by wrapping words with brackets
              (&#60;&#62; and &#60;/&#62;) and typing a style attribute in the
              first bracket. <br />(i.e. &#60;font-size: 24pt;&#62; big text
              &#60;/&#62;)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-6 px-3 md:px-12">
    <div v-if="formData.isImportFromCsv" class="mt-6">
      <table class="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th
              v-for="tableHead in csvRowDataKeys"
              :key="tableHead"
              class="border border-slate-300 p-2"
            >
              {{ tableHead }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in csvRowData" :key="index">
            <td
              v-for="tableHead in csvRowDataKeys"
              :key="tableHead"
              class="border border-slate-300 p-2"
            >
              {{ row[tableHead] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import Papa from "papaparse";
import { Configuration, OpenAIApi } from "openai";
import {
  ANIMATION,
  OUTPUTS,
  animations,
  outputs,
  scenes,
  bubbles,
} from "./config/default.config";
import { generateDownloadable } from "./downloader";
import { allTemplates } from "./templates";
import { resizeText } from "./helper";
import background_1 from "./assets/scenes/two_conversation_1.gif";
import background_2 from "./assets/scenes/two_conversation_2.gif";
import bubble_1 from "./assets/bubbles/bubble_1.png";
import bubble_2 from "./assets/bubbles/bubble_2.png";
import SearchAutocomplete from "./SearchAutocomplete.vue";

const formData = ref({
  isImportFromCsv: false,
  input: ANIMATION.INPUT,
  text: "",
  animation: animations.entrance[0],
  animation_type: outputs[0],
  animation_duration: ANIMATION.DURATION,
  animation_pause: ANIMATION.PAUSE,
  preview_box: {
    bg_color: ANIMATION.PREVIEW_BOX.BG_COLOR,
    height: ANIMATION.PREVIEW_BOX.HEIGHT,
    width: ANIMATION.PREVIEW_BOX.WIDTH,
  },
  text_color: ANIMATION.TEXT_COLOR,
  result: "",
  template: "",
  search: ANIMATION.INPUT,
});

const previewElement = ref(null);
const csvRowData = ref([]);
const csvRowDataKeys = ref([]);
const csvFileName = ref("");
const downloadReady = ref(false);

watchEffect(() => {
  updateText();
});

onMounted(() => {
  initiateApp();
});

function initiateApp() {
  GenerateAnimation();
}

function handleFormUpdate(e) {
  GenerateAnimation(null, e.target);
}

function handleTemplate(template) {
  console.log("template", template);
  const filteredTemplate = allTemplates.find((t) => t.title === template);
  formData._rawValue.input = filteredTemplate.text;

  GenerateAnimation();
}

function handleInputChange() {
  setTimeout(() => {
    const multilines = getMultilines();
    GenerateAnimation(multilines.map((line) => parseOptions(line)));
    updateText(multilines);
  });
}

function updateText() {
  formData.value.text = parseText();
}

function parseText(option) {
  const formDataValues = { ...formData._rawValue };
  let options = Object.entries(formDataValues).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  return option
    ? option.split(";")[0].split(": ")[1]
    : options.input.split(";")[0].split(": ")[1];
}

/**
 *
 * @param {Array} csvData
 */
async function makeAnimation(csvData, eventTarget) {
  downloadReady.value = false;
  formData.value.result = "";
  const eventName = eventTarget?.name;
  const eventValue = eventTarget?.value;

  if (formData._rawValue.animation_type === "Text") {
    await makePromise(async () => {
      const OUTPUTS_OBJECT = OUTPUTS.OBJECT.split(" ")[0]?.toLowerCase();
      const items = [];
      let itemsHtml = "";
      for (let rowIndex = 0; rowIndex < csvData.length; rowIndex++) {
        const row = csvData[rowIndex];
        if (row?.length) {
          itemsHtml += `<div class="stringRow-${rowIndex}"><div>${row.join(
            "\n"
          )}</div></div>`;
        } else {
          let rowOutput = row?.animation_type
            ?.toLowerCase()
            ?.includes(OUTPUTS_OBJECT)
            ? OUTPUTS.OBJECT
            : OUTPUTS.TEXT;
          const item = {
            input: row.text + " ",
            animation: row?.animation ?? ANIMATION.STYLE.BOUNCE,
            animation_type: rowOutput,
            animation_duration: row?.animation_duration
              ? +row.animation_duration
              : ANIMATION.DURATION,
            animation_pause: row?.animation_pause
              ? +row.animation_pause
              : ANIMATION.PAUSE,
            result: "",
            text_color: row?.text_color ?? "#FFFFFF",
            colors: [row.param_1, row.param_2],
            [eventName]: isNaN(+eventValue) ? eventValue : +eventValue,
          };
          item.result = getResults(item, rowIndex);
          item.index = rowIndex;
          itemsHtml += item.result;
          items.push(item);
        }
        formData.value.result = itemsHtml;
      }
      await stringAnimateDelay(csvData, items);
    }, 50);
  }
  if (formData._rawValue.animation_type === "Conversation") {
    if (!csvData.length) {
      return;
    }
    const getScene = (index) => {
      switch (index) {
        case 1:
          return background_1;

        case 2:
          return background_2;

        default:
          return background_1;
      }
    };
    const getBubble = (index) => {
      switch (index) {
        case 1:
          return bubble_1;

        case 2:
          return bubble_2;

        default:
          return bubble_1;
      }
    };
    // get random scene
    const randomNumber = Math.floor(Math.random() * 2) + 1; // randomly give 1 or 2
    const background = document.createElement("img");
    background.src = getScene(randomNumber);
    background.alt = "scene";
    // determine if we have 1 line or 2 lines for either 1 or 2 text bubbles
    const hasTwoLines = csvData.length > 1;
    // if we have more than 2 we will delete the rest
    const chatBubble = document.createElement("img");
    chatBubble.src = getBubble(hasTwoLines ? 2 : 1);
    chatBubble.alt = "bubble";
    chatBubble.style =
      "position: relative; top: -490px; transform: scale(0.75);";

    const firstText = document.createElement("span");
    firstText.innerHTML = csvData[0];
    firstText.style =
      "position: relative; top: -835px; left: 155px; display: block; width: 125px; height: 100px; text-overflow: ellipsis; overflow: hidden; padding: 5px; display: flex; justify-content: center; align-items: center; font-weight: 600; font-family: comic-sans;";
    const firstTextContainer = document.createElement("div");
    firstTextContainer.appendChild(firstText);

    const secondText = document.createElement("span");
    if (hasTwoLines) {
      secondText.innerHTML = csvData[1];
    }
    secondText.style =
      "position: relative; top: -775px; left: 155px; display: block; width: 125px; height: 100px; text-overflow: ellipsis; overflow: hidden; padding: 5px; display: flex; justify-content: center; align-items: center; font-weight: 600; font-family: comic-sans;";
    const secondTextContainer = document.createElement("div");
    secondTextContainer.appendChild(secondText);

    resizeText({
      elements: [firstText, secondText],
      maxSize: 15,
    });
    const scene = document.createElement("div");
    scene.appendChild(background);
    scene.appendChild(chatBubble);
    scene.appendChild(firstTextContainer);
    scene.appendChild(secondTextContainer);
    scene.style = "height: 450px;";

    previewElement.value.hasChildNodes()
      ? previewElement.value.replaceChild(
          scene,
          previewElement.value.childNodes[0]
        )
      : previewElement.value.append(scene);

    // text -> bubble -> scene
    // make sure input text is up to date
  }
  updateInput(csvData, { name: eventName, value: eventValue }); // sending object like this because state gets messed up for some reason if we just pass in the eventTarget
}

function parseOptions(input = formData.value.input) {
  if (formData._rawValue.animation_type === "Conversation") {
    return input;
  }
  const options = input.split("; ").map((option) => {
    const formattedOption = option.split(/:\s?(.*)/s);
    if (
      formattedOption[0] === "text" ||
      formattedOption[0] === "animation_type" ||
      formattedOption[0] === "animation" ||
      formattedOption[0] === "animation_duration" ||
      formattedOption[0] === "animation_pause" ||
      formattedOption[0] === "text_color"
    ) {
      return formattedOption;
    }
    return input;
  });

  if (options.length === 5 || options.length === 6) {
    return options.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  }

  return options;
}

function updateInput(data, eventTarget) {
  setTimeout(() => {
    if (formData._rawValue.animation_type === "Conversation") {
      let text = "";
      data.forEach((d, i) => {
        if (i < 2) text += d + "\n\n";
      });
      formData.value.input = text;
    } else {
      const formDataValues = { ...formData._rawValue };
      let options =
        data ??
        Object.entries(formDataValues).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      let text = "";
      const eventName = eventTarget?.name;
      const eventValue = eventTarget?.value;
      const allowedOptions = [
        "text",
        "animation_type",
        "text_color",
        "animation",
        "animation_duration",
        "animation_pause",
      ];

      options.forEach((option) => {
        if (Object.keys(option).length >= 5) {
          option["text"] =
            option?.text ?? option.input.split(";")[0].split(": ")[1];
          option["animation"] =
            eventName === "animation"
              ? eventValue
              : option?.animation ?? ANIMATION.STYLE.BOUNCE;
          option["animation_duration"] =
            eventName === "animation_duration"
              ? +eventValue
              : option?.animation_duration ?? ANIMATION.DURATION;
          option["animation_pause"] =
            eventName === "animation_pause"
              ? +eventValue
              : option?.animation_pause ?? ANIMATION.PAUSE;
          option["text_color"] =
            eventName === "text_color"
              ? eventValue
              : option?.text_color ?? option.preview_box?.text_color ?? "black";
          text += Object.entries(option)
            .filter((o) => allowedOptions.includes(o[0]))
            .map((o) => o.join(": "))
            .join("; ");
          text += "\n\n";
        } else {
          text += option.join("\n") + "\n\n";
        }
      });

      formData.value.input = text;
    }
  }, 10);
}

async function stringAnimateDelay(data, items, totalTime = 0) {
  if (data.filter((d) => d?.length).length) {
    const stringIndex = data.findIndex((d) => d?.length);
    const subData = data.slice(0, stringIndex);
    const subItems = items.slice(0, stringIndex);

    totalTime += calcAnimationTime(subData);

    animateToQueue(subItems);
    setTimeout(() => {
      stringAnimateDelay(data.slice(stringIndex + 1), items.slice(stringIndex));
    }, totalTime);
  } else {
    await animateToQueue(items);
  }
}

function calcAnimationTime(data) {
  let totalTime = 0;
  if (data?.length && typeof data !== "string") {
    // we are dealing with an array of animations
    data.forEach((animation) => {
      if (animation?.length) {
        return 0;
      }
      console.log(animation);
      const numberOfAnimations =
        (animation?.text
          ? animation.text.split("%").length
          : animation?.input.split("%").length - 1) / 2;
      const tempTime =
        (+animation?.animation_duration + +animation?.animation_pause) *
        numberOfAnimations;

      totalTime = tempTime > totalTime ? tempTime : totalTime;
    });
  } else if (data?.length === 0 || typeof data === "string") {
    return totalTime;
  } else {
    // we just have one animation
    const animationObject = data;
    const numberOfAnimations =
      (animationObject?.text
        ? animationObject.text.split("%").length
        : animationObject?.input.split("%").length - 1) / 2;
    totalTime +=
      (+animationObject?.animation_duration +
        +animationObject?.animation_pause) *
      numberOfAnimations;
  }

  return totalTime;
}

async function animateToQueue(items) {
  makePromise(async () => {
    if (previewElement.value) {
      // using forEach allows us to play each row at the same time
      // if we want to play them one after another, it would need to be a for loop
      items.forEach(async (item) => {
        const animation_pause = item.animation_pause;
        const elements = Array.from(
          previewElement.value.querySelectorAll(
            `.textRow-${item?.index} .invisible`
          )
        );
        if (
          item.animation.includes("off") ||
          item.animation.toLowerCase() === "shrink"
        ) {
          elements.forEach((element) => {
            element.className = "";
          });
        }
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          if (index === 0) {
            element.className = "";
          } else {
            await makePromise(() => {
              toAnimate(element, item);
            }, animation_pause);
          }
        }
      });
    }
  }, 50);
}

async function makePromise(callback, timeout) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, timeout);
  });
}

function getResults(item, rowIndex) {
  const { colors } = item;
  let number_1 = null;
  let number_2 = null;
  let type = "";
  let number_1_style = `color: ${
    colors[0] ? colors[0] : "inherit"
  }; animation-duration: ${item.animation_duration}ms;`;
  let number_2_style = `color: ${
    colors[1] ? colors[1] : "inherit"
  }; animation-duration: ${item.animation_duration}ms;`;

  const regex_number = /(%\d+%)[\sx*]+(%\d+%)/gm;
  const regex_type = /\d+\s*%\s+([\w]+)[\.\s]+$|\d+\s*%\s+([\W]+)[\.\s]+$/gm;
  let str = item.input; //.replace(/\.[^.]*$/gm, '');
  let m;
  while ((m = regex_type.exec(str)) !== null) {
    if (m.index === regex_number.lastIndex) regex_number.lastIndex++;
    if (m[2]) type = m[2];
  }

  while ((m = regex_number.exec(str)) !== null) {
    if (m.index === regex_number.lastIndex) regex_number.lastIndex++;
    if (m[1]) {
      number_1 = parseInt(m[1].replaceAll("%", ""));
      str = str.replaceAll(
        m[1],
        `<span class="invisible" style="${number_1_style}">${number_1}</span>`
      );
    }
    if (m[2]) {
      number_2 = parseInt(m[2].replaceAll("%", ""));
      str = str.replaceAll(
        m[2],
        `<span class="invisible" style="${number_2_style}">${number_2}</span>`
      );
    }
  }
  // number_1 = number_1 ? number_1 : DEFAULT_GRID[0]
  // number_2 = number_2 ? number_2 : DEFAULT_GRID[1]
  if (!number_1 || !number_2) {
    const regex_within_percentage = /\%(.*?)\%/gm;
    while ((m = regex_within_percentage.exec(str)) !== null) {
      if (m.index === regex_within_percentage.lastIndex)
        regex_within_percentage.lastIndex++;
      str = str.replaceAll(
        m[0],
        `<span class="invisible" style="${number_2_style}">${m[1]}</span>`
      );
    }
  }

  const regex_within_tags = /\<(.*?)\>(.*?)\<\/\>/gm;
  while ((m = regex_within_tags.exec(str)) !== null) {
    if (m.index === regex_within_tags.lastIndex) regex_within_tags.lastIndex++;
    let style = m[1].replaceAll("=", ":");
    str = str.replaceAll(m[0], `<span style="${style}">${m[2]}</span>`);
  }

  if (item.animation_type == OUTPUTS.OBJECT) {
    str = "";
    [...Array(number_1)].forEach(() => {
      [...Array(number_2)].forEach(() => {
        str += `<span class="invisible" style="animation-duration: ${item.animation_duration}ms;">${type}</span>`;
      });
      str += "</br>";
    });
  }

  return `<div class="textRow-${rowIndex}" style="color: ${item?.text_color ??
    "#000000"}"><div class="invisible">${str}</div></div>`;
}

function toAnimate(element, item) {
  let elementClasses = ["animate", "animate-" + item?.animation?.toLowerCase()];
  element.className = elementClasses.join(" ");
}

function onFileUpload(e) {
  if (e.target.files[0]) {
    const file = e.target.files[0];
    csvFileName.value = file.name;
    e.target.value = null;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e) {
      const jsonObject = Papa.parse(e.target.result, {
        delimiter: ",",
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      });
      setCsvRowData(jsonObject.data);
    };
  } else {
    setCsvRowData([]);
    csvFileName.value = "";
  }
}

function setCsvRowData(csvData) {
  csvRowData.value = csvData;
  csvRowDataKeys.value = csvData ? Object.keys(csvData[0]) : [];
}

async function GenerateAnimation(options, eventTarget) {
  if (formData.value.isImportFromCsv) {
    return await makeAnimation(csvRowData.value);
  }
  if (!options) {
    // split up formData.value.input to make the objects below
    return await makeAnimation(
      getMultilines().map((line) => parseOptions(line)),
      eventTarget
    );
  }
  return await makeAnimation(options);
}

async function generateGif() {
  const options = getMultilines().map((line) => parseOptions(line));
  let gifLength = 0;
  const type =
    formData._rawValue.animation_type === "Conversation"
      ? "canvas"
      : formData._rawValue.animation_type === "Text"
      ? "gif"
      : null;
  if (type === "mp4") {
    gifLength = 500;
  }
  if (type === "gif") {
    options.forEach((option) => {
      gifLength += calcAnimationTime(option);
    });
  }

  await GenerateAnimation();
  const downloadLink = document.getElementById("generate-btn");
  downloadLink.classList.add("disabled");
  downloadLink.innerText = "Generating GIF...";
  console.log(gifLength);
  await generateDownloadable(gifLength, type);
  downloadReady.value = true;
  downloadLink.classList.remove("disabled");
  downloadLink.innerText = "Generate GIF";
}

function getMultilines() {
  return formData.value.input
    .split("\n\n")
    .filter((line) => /\w/.test(line)) // removes any empty lines
    .map((line) => line.replace(/\b\n+|\n+\b/g, ""));
}

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function handle(template) {
  const text = template;
  const array1 = template.split(" ");
  const list1 = array1.filter((item) => item === "subtraction");
  const array2 = template.split("");
  const list2 = array2.filter((item) => item === "-");
  const length = list1.length + list2.length;
  
  if (length > 0) {
    const regex_number = /\d+/g;

    let number = text.match(regex_number);
  
    if (number !== null) {
      const number_1 = number[0].split("");
      const number_2 = number[1].split("");
      if (parseInt(number_1[1]) < parseInt(number_2[1])) {
        number[2] = parseInt(number_1[0]) - 1;
        number[3] = parseInt(number_1[1]) + 10;
        number[4] = number[0] - number[1];
      } else {
        number[2] = parseInt(number_1[0]);
        number[3] = parseInt(number_1[1]);
        number[4] = number[0] - number[1];
      }
    formData._rawValue.input = `text: %${number[2]}%; animation_type: text; animation: grow; animation_duration: 700; animation_pause: 2000; text_color: #0875cf

text:     %${number[3]}%; animation_type: text; animation: grow; animation_duration: 700; animation_pause: 500; text_color: #0dbd0d

text: ${number[0]}; animation_type: text; animation: grow; animation_duration: 700; animation_pause: 1000; text_color: #292626

text: ${number[1]}; animation_type: text; animation: grow; animation_duration: 700; animation_pause: 1000; text_color: #292626

text: ➖; animation_type: text; animation: grow; animation_duration: 700; animation_pause: 1000; text_color: #292626

text: %${number[4]}%; animation_type: text; animation: dance; animation_duration: 700; animation_pause: 3000; text_color: #292626
`;
  }
  
  GenerateAnimation();
  }
  
}
</script>
