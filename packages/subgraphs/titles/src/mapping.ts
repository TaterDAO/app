import { BigInt, Address, store, json } from "@graphprotocol/graph-ts";
import {
  TitleV1_0,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer as TransferEvent,
} from "../generated/TitleV1_0/TitleV1_0";
import { Title, Transfer, Account } from "../generated/schema";

// Utils
//import { decode } from "./utils/decode";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: TransferEvent): void {
  const title = new Title(event.params.tokenId.toString());

  // Mint
  if (event.params.from === Address.zero()) {
    title.creator = event.params.to;
    title.createdAt = event.block.timestamp;
    title.transfers = [];

    // Query contract for metadata
    const contract = TitleV1_0.bind(event.address);
    const rawMetadata = contract.tokenURI(event.params.tokenId);
    // const buffer = decode(
    //   rawMetadata.replace("data:application/json;base64,", ""),
    // );
    //const metadata = json.fromString(buffer.toString()).toObject();
    //console.log(buffer.toString());
    //title.name = metadata.mustGet("name").toString();
    title.name = "foo";
  }

  // Burn
  // if (event.params.to === Address.zero()) {
  //   store.remove("Title", title.id);
  //   // TODO: Also remove the transfers?
  // }

  // const from = new Account(event.params.from);
  // const fromTitles = [] as string[];
  // // Filter
  // for (let i = 0; i < fromTitles.length; i++) {
  //   const id = fromTitles[i] as string;
  //   if (id !== title.id) fromTitles.push(id);
  // }
  // from.titles = fromTitles;
  // from.save();

  // const to = new Account(event.params.to);
  // const toTitles = to.titles || [];
  // toTitles.push(title.id);
  // to.titles = toTitles;
  // to.save();

  // const transfer = new Transfer(event.transaction.hash.toHexString());
  // transfer.to = to.id;
  // transfer.from = from.id;
  // transfer.timestamp = event.block.timestamp;
  // transfer.save();

  // const titleTransfers = title.transfers;
  // titleTransfers.push(transfer.id);
  // title.transfers = titleTransfers;
  title.save();
}
