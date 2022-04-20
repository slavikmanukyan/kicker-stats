import mongoose from "mongoose";

export default function normalizeMongooseCollection(
  collection: mongoose.Document[],
  idKey: string = "_id"
) {
  return collection.map((doc) => {
    const normalizedDoc = {
      ...doc.toObject(),
      [idKey]: doc.get(idKey).toString(),
    }
    return normalizedDoc;
  });
}
