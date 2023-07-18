import { equationChange } from "../templates";

export const OUTPUTS = {
  TEXT: "Text",
  OBJECT: "Object in a Grid",
  CONVERSATION: "Conversation",
};
export const animations = {
  entrance: [
    "bounce",
    "blink",
    "jello",
    "wobble",
    "spin",
    "dance",
    "grow",
    "roll",
    "scale",
    "swing",
  ],
  exit: [
    "bounce-off",
    "blink-off",
    "jello-off",
    "wobble-off",
    "shrink",
    "roll-off",
    "scale-off",
    "swing-off",
  ],
};
export const outputs = ["Text", "Conversation"];
export const scenes = ["man_and_women", "monkey_and_lion"];
export const bubbles = ["bubble_1", "bubble_2"];

// INPUT for grid -> text: We can think of 97% x %6% as 97% groups of %5%  ⚽️.; animation: bounce; animation_duration: 700; animation_pause: 200; text_color: #FFFFFF; height: 308; width: 350; background_color: #1F2937
export const ANIMATION = {
  INPUT: equationChange(),

  DURATION: 700,
  PAUSE: 200,
  PREVIEW_BOX: {
    BG_COLOR: "#FFFFFF",
  },
  TEXT_COLOR: "#292626",
  STYLE: {
    BOUNCE: "bounce",
    BLINK: "blink",
    JELLO: "jello",
    WOBBLE: "wobble",
    BOUNCEOFF: "bounce-off",
    BLINKOFF: "blink-off",
    JELLOOFF: "jello-off",
    WOBBLEOFF: "wobble-off",
    SPIN: "spin",
    DANCE: "dance",
    GROW: "grow",
    SHRINK: "shrink",
    ROLL: "roll",
    ROLLOFF: "roll-off",
    SCALE: "scale",
    SCALEOFF: "scale-off",
    SWING: "swing",
    SWINGOFF: "swing-off",
  },
};
