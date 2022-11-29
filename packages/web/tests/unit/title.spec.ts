import { expect } from "chai";

// Types
import type { Position } from "geojson";

// Utils
import {
  serializeFeatures,
  deserializeFeatures
} from "../../src/libs/TitleLocation";

// Fixtures
import {
  FeatureCollectionA,
  FeatureCollectionB,
  PointA,
  PointAString,
  FeatureCollectionBString,
  FeatureCollectionAString
} from "../fixtures/geojson";

describe("Title", () => {
  describe("Location", () => {
    describe("Serialization", () => {
      it("single point", () => {
        const out = serializeFeatures([
          {
            type: "Feature",
            //@ts-ignore
            geometry: PointA,
            properties: {}
          }
        ]);
        expect(out).to.equal(PointAString);
      });

      it("polygons", () => {
        //@ts-ignore
        const out = serializeFeatures(FeatureCollectionB.features);
        expect(out).to.equal(FeatureCollectionBString);
      });

      it("polygons & points", () => {
        //@ts-ignore
        const out = serializeFeatures(FeatureCollectionA.features);
        expect(out).to.equal(FeatureCollectionAString);
      });
    });

    describe("Deserialization", () => {
      it("Has expected schema", () => {
        const out = deserializeFeatures(FeatureCollectionBString);
        expect(out[0].type).to.equal("Feature");
        expect(out[0].properties).to.be.empty;
      });

      it("single point", () => {
        const out = deserializeFeatures(PointAString);
        expect(out.length).to.equal(1);
        expect(out[0].geometry.type).to.equal(PointA.type);
        //@ts-ignore
        expect(out[0].geometry.coordinates[0]).to.equal(PointA.coordinates[0]);
        //@ts-ignore
        expect(out[0].geometry.coordinates[1]).to.equal(PointA.coordinates[1]);
        //@ts-ignore
        expect(out[0].geometry.coordinates[2]).to.equal(0);
      });

      it("polygons", () => {
        const out = deserializeFeatures(FeatureCollectionBString);
        expect(out.length).to.equal(FeatureCollectionB.features.length);
        expect(out[0].geometry.type).to.equal(
          FeatureCollectionB.features[0].geometry.type
        );

        //@ts-ignore
        out[0].geometry.coordinates[0].forEach(
          (position: Position, index: number) => {
            const fixturePosition =
              FeatureCollectionB.features[0].geometry.coordinates[0][index];
            expect(position[0]).to.equal(fixturePosition[0]);
            expect(position[1]).to.equal(fixturePosition[1]);
            expect(position[2]).to.equal(0);
          }
        );
      });

      it("polygons & points", () => {
        const out = deserializeFeatures(FeatureCollectionAString);

        for (
          let index = 0;
          index < FeatureCollectionA.features.length;
          index++
        ) {
          const outFeature = out[index];
          const fixtureFeature = FeatureCollectionA.features[index];

          // Type is correct
          expect(outFeature.geometry.type).to.equal(
            fixtureFeature.geometry.type
          );

          // Expect points are correct
          if (outFeature.geometry.type === "Point") {
            // x
            expect(outFeature.geometry.coordinates[0]).to.equal(
              fixtureFeature.geometry.coordinates[0]
            );
            // y
            expect(outFeature.geometry.coordinates[1]).to.equal(
              fixtureFeature.geometry.coordinates[1]
            );
            // z
            expect(outFeature.geometry.coordinates[2]).to.equal(
              fixtureFeature.geometry.coordinates[2]
            );
          } else {
            // Coordinates are correct
            // @ts-ignore
            outFeature.geometry.coordinates[0].forEach(
              (position: Position, index: number) => {
                const fixturePosition =
                  fixtureFeature.geometry.coordinates[0][index];
                expect(position[0]).to.equal(fixturePosition[0]);
                expect(position[1]).to.equal(fixturePosition[1]);
                expect(position[2]).to.equal(fixturePosition[2]);
              }
            );
          }
        }
      });
    });
  });
});
