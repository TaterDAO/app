import type { Image } from "@T/Image";
import type { FeatureCollection, Point } from "geojson";

// TODO: Migrate to Location types file
export type Location = FeatureCollection | Point | undefined;

export interface State {
  // name_: string;
  // description_: string;
  // externalUrl_: string;
  // attrLandClassification_: string;
  // attrBuildingClassification_: string;
  attrLocation_: Location;
  // attrDeed_: string;
  // attrParcels_: string;
  // attrOwner_: string;
  attrKml_: File | undefined;
  // attrTag_: string;
  // images: { [fieldId: string]: Image | null };
}

export enum ActionType {
  SetName = "SET_NAME",
  SetDescription = "SET_DESCRIPTION",
  SetExternalUrl = "SET_EXTERNAL_URL",
  SetLandClassification = "SET_LAND_CLASSIFICATION",
  SetBuildingClassification = "SET_BUILDING_CLASSIFICATION",
  SetLocation = "SET_LOCATION",
  SetDeed = "SET_DEED",
  SetParcels = "SET_PARCELS",
  SetOwner = "SET_OWNER",
  SetKML = "SET_KML",
  UnsetKML = "UNSET_KML",
  SetTag = "SET_TAG"
  // TODO: Images
}

interface BaseAction {
  type: ActionType;
}

interface SetNameAction extends BaseAction {
  type: ActionType.SetName;
  value: string;
}

interface SetDescriptionAction extends BaseAction {
  type: ActionType.SetDescription;
  value: string;
}

interface SetExternalUrlAction extends BaseAction {
  type: ActionType.SetExternalUrl;
  value: string;
}

interface SetLandClassificationAction extends BaseAction {
  type: ActionType.SetLandClassification;
  value: string;
}

interface SetBuildingClassificationAction extends BaseAction {
  type: ActionType.SetBuildingClassification;
  value: string;
}

interface SetLocationAction extends BaseAction {
  type: ActionType.SetLocation;
  value: Location;
}

interface SetDeedAction extends BaseAction {
  type: ActionType.SetDeed;
  value: string;
}

interface SetParcelsAction extends BaseAction {
  type: ActionType.SetParcels;
  value: string;
}

interface SetOwnerAction extends BaseAction {
  type: ActionType.SetOwner;
  value: string;
}

interface SetKMLAction extends BaseAction {
  type: ActionType.SetKML;
  file: File;
}

interface UnsetKMLAction extends BaseAction {
  type: ActionType.UnsetKML;
}

interface SetTagAction extends BaseAction {
  type: ActionType.SetTag;
  value: string;
}

export type Action =
  | SetNameAction
  | SetDescriptionAction
  | SetExternalUrlAction
  | SetLandClassificationAction
  | SetBuildingClassificationAction
  | SetLocationAction
  | SetDeedAction
  | SetParcelsAction
  | SetOwnerAction
  | SetKMLAction
  | UnsetKMLAction
  | SetTagAction;

export interface ContextState extends State {
  dispatch: React.Dispatch<Action>;
}
