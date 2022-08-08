import landClassificationsData from "@data/classifications/land";
import buildingClassificationsData from "@data/classifications/building";

import type { LandClassifications, BuildingClassifications } from "@T/Title";
import type { Option, ParentLinkedOption } from "@T/Form";

type Classification = Option | ParentLinkedOption;

// Flatten
function flatten(
  classifications: LandClassifications | BuildingClassifications,
  parent?: Classification
): Array<Option> {
  let flatArray: Array<Classification> = [];

  for (const classification of classifications) {
    flatArray = [
      ...flatArray,
      {
        ...classification,
        parent: parent ? parent : null
      }
    ];
    if (classification.subOptions)
      flatArray = [
        ...flatArray,
        ...flatten(classification.subOptions, classification)
      ];
  }

  return flatArray;
}

const flatLandClassifications = flatten(landClassificationsData);
const flatBuildingClassifications = flatten(buildingClassificationsData);

function getLandClassificationFromValue(value: string): Classification | null {
  return (
    flatLandClassifications.find(
      (classification) => classification.value === value
    ) || null
  );
}

function getBuildingClassificationFromValue(
  value: string
): Classification | null {
  return (
    flatBuildingClassifications.find(
      (classification) => classification.value === value
    ) || null
  );
}

function classificationLabel(classification: Classification): string {
  //@ts-ignore
  const parentLabel = !!classification?.parent
    ? //@ts-ignore
      classificationLabel(classification?.parent as ParentLinkedOption)
    : null;

  return [...[parentLabel], classification.label]
    .filter((str) => !!str)
    .join(", ");
}

export {
  getLandClassificationFromValue,
  getBuildingClassificationFromValue,
  classificationLabel
};
