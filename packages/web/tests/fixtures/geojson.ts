/**
 * Location GeoJSON Fixtures.
 */

export const PointA = {
  type: "Point",
  coordinates: [41.767278, -71.142685]
};

export const PointAString = "41.767278,-71.142685,0";

export const FeatureCollectionB = {
  type: "FeatureCollection",
  features: [
    {
      id: "10b17d6b9d09a52d6ed80d4f87d58375",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [
            [-71.14411982665034, 41.76744913898224],
            [-71.14214121739322, 41.76718871115088],
            [-71.14240138054778, 41.76647891228214],
            [-71.1429490924533, 41.76643806030941],
            [-71.14420198343619, 41.76662700046421],
            [-71.14411982665034, 41.76744913898224]
          ]
        ],
        type: "Polygon"
      }
    }
  ]
};

export const FeatureCollectionBString =
  "-71.14411982665034,41.76744913898224,0,-71.14214121739322,41.76718871115088,0,-71.14240138054778,41.76647891228214,0,-71.1429490924533,41.76643806030941,0,-71.14420198343619,41.76662700046421,0,-71.14411982665034,41.76744913898224,0";

// Feature Collection containing Polygons and Points
export const FeatureCollectionA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-102.588676, 40.687585, 0],
            [-102.588697, 40.693146, 0],
            [-102.593431, 40.693121, 0],
            [-102.598281, 40.693095, 0],
            [-102.598271, 40.691045, 0],
            [-102.598246, 40.685811, 0],
            [-102.592633, 40.685835, 0],
            [-102.59245, 40.685835, 0],
            [-102.588668, 40.685851, 0],
            [-102.588668, 40.685852, 0],
            [-102.588676, 40.687585, 0]
          ]
        ]
      },
      properties: {
        name: "Tax parcel 051503400014",
        styleUrl: "#stylesel_0",
        "fill-opacity": 0.17647058823529413,
        fill: "#db4cd6",
        "stroke-opacity": 1,
        stroke: "#db4cd6",
        "stroke-width": 2,
        icon: "http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
      },
      id: "feat_1"
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-102.59338477136565, 40.687711263906294, 0]
      },
      properties: {
        name: "Meeeeeeow",
        styleUrl: "#stylesel_1",
        "icon-scale": 1.5,
        icon: "https://farmapper.com/static/img/stickers/Animals/ico_animals_hunting_48px.png"
      },
      id: "feat_2"
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-102.59597474767175, 40.69147473755419, 0]
      },
      properties: {
        name: "Purchase Price",
        styleUrl: "#stylesel_2",
        "icon-scale": 1.5,
        icon: "https://farmapper.com/static/img/stickers/Actions/ico_action_salesign_48px.png",
        "": "172500"
      },
      id: "feat_3"
    }
  ]
};

export const FeatureCollectionAString =
  "-102.588676,40.687585,0,-102.588697,40.693146,0,-102.593431,40.693121,0,-102.598281,40.693095,0,-102.598271,40.691045,0,-102.598246,40.685811,0,-102.592633,40.685835,0,-102.59245,40.685835,0,-102.588668,40.685851,0,-102.588668,40.685852,0,-102.588676,40.687585,0;-102.59338477136565,40.687711263906294,0;-102.59597474767175,40.69147473755419,0";
