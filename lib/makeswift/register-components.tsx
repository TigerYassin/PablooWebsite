import {
  Style,
  Shape,
  TextInput,
  Color,
  Image,

} from "@makeswift/runtime/controls";
import { ReactRuntime } from "@makeswift/runtime/react";
import FormSheet from "../components/FormSheet/formSheet";

// Register your components here!

ReactRuntime.registerComponent(FormSheet, {
  type: "formsheet",
  label: "FormSheet",
  props: {
    // className: Style({ properties: Style.All }),
    // pictureUrl: Image({ label: "Profile Picture" }),
    // boxShadow: Shape({
    //   label: "Box Shadow",
    //   type: {
    //     color: Color({
    //       label: "Color",
    //       defaultValue: "rgba(102, 94, 255, 0.9)",
    //     }),
    //     offsetX: TextInput({ label: "Offset X", defaultValue: "0px" }),
    //     offsetY: TextInput({ label: "Offset Y", defaultValue: "0px" }),
    //     blurRadius: TextInput({ label: "Blur Radius", defaultValue: "118px" }),
    //     spreadRadius: TextInput({
    //       label: "Spread Radius",
    //       defaultValue: "45px",
    //     }),
    //   },
    // }),
  },
});