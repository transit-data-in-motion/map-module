import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import LeafletMap from "./LeafletMap";
import { MapModel } from "../../../models/MapModel";
import { MarkerModel } from "../../../models/MarkerModel";

const meta = {
  component: LeafletMap,
} satisfies Meta<typeof LeafletMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    model: new MapModel(51.505, -0.09, 13, [
      new MarkerModel(1, 51.505, -0.09),
      new MarkerModel(2, 51.507, -0.095),
      new MarkerModel(3, 51.51, -0.1),
    ]),
  },
};

export const Default2: Story = {
  args: {
    model: new MapModel(51.605, -0.09, 13, [
      new MarkerModel(1, 51.605, -0.09),
      new MarkerModel(2, 51.606, -0.09),
    ]),
  },
};

export const MultipleMap: Story = {
  tags: ["multiple"],
  args: {
    model: new MapModel(51.605, -0.09, 13, [
      new MarkerModel(1, 51.605, -0.09),
      new MarkerModel(2, 51.606, -0.09),
    ]),
    height: "250px",
  },

  parameters: {
    // layout: "fullscreen",
  },

  decorators: [
    (Story) => (
      <div>
        <Story />
        <Story />
      </div>
    ),
  ],
};
