// Types
import type { State, Action } from "./types";
import { ActionType, Chain } from "./types";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    // case ActionType.SetName: {
    //   return { ...state, name_: action.value };
    // }
    // case ActionType.SetDescription: {
    //   return { ...state, description_: action.value };
    // }
    // case ActionType.SetExternalUrl: {
    //   return { ...state, externalUrl_: action.value };
    // }
    // case ActionType.SetLandClassification: {
    //   return { ...state, attrLandClassification_: action.value };
    // }
    // case ActionType.SetBuildingClassification: {
    //   return { ...state, attrBuildingClassification_: action.value };
    // }
    case ActionType.SetLocation: {
      return { ...state, attrLocation_: action.value };
    }
    // case ActionType.SetDeed: {
    //   return { ...state, attrDeed_: action.value };
    // }
    // case ActionType.SetParcels: {
    //   return { ...state, attrParcels_: action.value };
    // }
    // case ActionType.SetOwner: {
    //   return { ...state, attrOwner_: action.value };
    // }
    case ActionType.SetKML: {
      return { ...state, attrKml_: action.file };
    }
    case ActionType.UnsetKML: {
      return { ...state, attrKml_: undefined };
    }
    // case ActionType.SetTag: {
    //   return { ...state, attrTag_: action.value };
    // }
    case ActionType.AddChain: {
      const updatedChains = state.chains;
      updatedChains.add(action.value as Chain);
      return { ...state, chains: updatedChains };
    }
    case ActionType.RemoveChain: {
      const updatedChains = state.chains;
      updatedChains.delete(action.value as Chain);
      return {
        ...state,
        chains: updatedChains
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
